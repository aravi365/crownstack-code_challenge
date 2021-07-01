import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Linking,
} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {millisToMinutes} from '../../helpers/millisToMinutes';
import SoundPlayer from 'react-native-sound-player';
import {formatDate} from '../../helpers/formatDate';
import {images} from '../../../assets';
export default function Details({navigation, route}) {
  const [isPlaying, setPlaying] = React.useState(false);
  const [isPaused, setPaused] = React.useState(false);
  const [isFinished, setFinished] = React.useState(false);

  const {data} = route.params;
  function loadPreview() {
    try {
      SoundPlayer.loadUrl(data.previewUrl);
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  }
  function playPreview() {
    try {
      SoundPlayer.play();
    } catch (e) {
      Alert.alert(
        'Unable to load preview',
        'Unable to load music for preview',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
      );
      console.log('cannot play the sound file', e);
    }
    setPlaying(true);
  }
  function pausePreview() {
    setPlaying(false);
    SoundPlayer.pause();
  }

  React.useEffect(() => {
    const _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        console.log('finished playing', success);
        setPlaying(false);
        // setFinished(true);
        // setPaused(false);
        // if (isPlaying) {
        //   SoundPlayer.seek(0);
        //   setPlaying(false);
        //   setFinished(true);
        //   setPaused(false);
        // }
        // SoundPlayer.stop();

        SoundPlayer.seek(0);
      },
    );
    const _onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      'FinishedLoading',
      ({success}) => {
        console.log('finished loading', success);
        // setPlaying(true);
      },
    );
    const _onFinishedLoadingFileSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingFile',
      ({success, name, type}) => {
        console.log('finished loading file', success, name, type);
      },
    );
    const _onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      ({success, url}) => {
        console.log('finished loading url', success, url);
      },
    );
    loadPreview();
    return () => {
      SoundPlayer.stop();
      _onFinishedPlayingSubscription.remove();
      _onFinishedLoadingSubscription.remove();
      _onFinishedLoadingURLSubscription.remove();
      _onFinishedLoadingFileSubscription.remove();
    };
  }, []);
  function handleLinkOpen(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Image style={styles.imageStyle} source={{uri: data.artworkUrl100}} />
        {data?.trackName?.length > 40 ? (
          <TextTicker
            style={styles.tickerText}
            duration={5000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}>
            {data.trackName || 'No title'}
          </TextTicker>
        ) : (
          <Text style={styles.tickerText}>{data.trackName || 'No title'}</Text>
        )}
        <Text style={styles.collectionName} numberOfLines={3}>
          {data.collectionName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.artistName} numberOfLines={2}>
            {data.artistName}
          </Text>
          {data.trackExplicitness === 'explicit' ? (
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: '#495052',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
                marginTop: 5,
              }}>
              <Text style={{color: '#fff'}}>E</Text>
            </View>
          ) : null}
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => (!isPlaying ? playPreview() : pausePreview())}>
            <Image
              style={{width: 80, height: 80}}
              source={!isPlaying ? images.play : images.pause}
            />
          </TouchableOpacity>
          <Text style={styles.previewText}>
            {isPlaying ? 'Playing Preview...' : 'Play Preview'}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
            borderColor: '#495052',
            width: 300,
            backgroundColor: '#fff',
          }}>
          <Text style={styles.boxTextTitle}>
            Genre:
            <Text style={styles.boxTextBody}>
              {' '}
              {data.primaryGenreName}
            </Text>{' '}
          </Text>
          <Text style={styles.boxTextTitle}>
            Release Date:{' '}
            <Text style={styles.boxTextBody}>
              {formatDate(data.releaseDate)}
            </Text>
          </Text>
          <Text style={styles.boxTextTitle}>
            Collection Price:{' '}
            <Text style={styles.boxTextBody}>
              {data.collectionPrice} {data.currency}
            </Text>{' '}
            {'\n'}Track Price:{' '}
            <Text style={styles.boxTextBody}>
              {data.trackPrice} {data.currency}
            </Text>
          </Text>
          <Text style={styles.boxTextTitle}>
            Duration:{' '}
            <Text style={styles.boxTextBody}>
              {data.trackTimeMillis
                ? millisToMinutes(data.trackTimeMillis)
                : 'N/A'}
            </Text>
          </Text>
          <Text style={styles.boxTextTitle}>
            Origin:<Text style={styles.boxTextBody}> {data.country}</Text>{' '}
          </Text>
        </View>
        {data.trackViewUrl ? (
          <TouchableOpacity
            onPress={() => handleLinkOpen(data.trackViewUrl)}
            style={{
              borderRadius: 5,
              borderWidth: 1,
              marginTop: 10,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text>View Album on</Text>
            <Image
              style={{width: 20, height: 20, marginHorizontal: 5}}
              source={images.apple}
            />
            <Text>Music</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 30,
    // backgroundColor: '#00bfff',
  },
  tickerText: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingRight: 10,
    marginTop: 10,
  },
  imageStyle: {width: 200, height: 200, marginTop: 20, borderRadius: 10},
  collectionName: {
    fontWeight: 'bold',
    color: '#495052',
    fontSize: 20,
    marginTop: 5,
  },
  artistName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 24,
    marginTop: 5,
  },
  duration: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
    color: '#495052',
  },
  previewText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  boxTextTitle: {
    fontSize: 16,
    color: '#495052',
    lineHeight: 28,
  },
  boxTextBody: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#495052',
    lineHeight: 28,
  },
});
