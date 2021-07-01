import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {millisToMinutes} from '../../helpers/millisToMinutes';
export default function ListElement(props) {
  console.log('cjeckprop', props.data);
  return (
    <View style={styles.container}>
      <Image
        source={{uri: props.data.artworkUrl60}}
        style={styles.avatarImage}
      />
      <View style={styles.innerView}>
        {props.data?.trackName?.length > 40 ? (
          <TextTicker
            style={styles.tickerText}
            duration={5000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}>
            {props.data.trackName || 'No title'}
          </TextTicker>
        ) : (
          <Text style={styles.tickerText}>
            {props.data.trackName || 'No title'}
          </Text>
        )}
        <Text style={styles.collectionName} numberOfLines={3}>
          {props.data.collectionName}
        </Text>
        <View>
          <Text style={styles.artistName} numberOfLines={2}>
            {props.data.artistName}
          </Text>
          <View style={styles.genreName}>
            <Text style={{lineHeight: 20}} numberOfLines={1}>
              {props.data.primaryGenreName}
            </Text>
            {props.data?.trackExplicitness === 'explicit' ? (
              <View style={styles.explicitWrapper}>
                <Text style={styles.explicText}>E</Text>
              </View>
            ) : null}
            {props.data.trackTimeMillis ? (
              <Text style={styles.duration}>
                {millisToMinutes(props.data.trackTimeMillis)}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'rgba(190,190,190,0.3)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  avatarImage: {width: 80, height: 80, borderRadius: 5},
  innerView: {marginLeft: 10},
  tickerText: {
    width: 280,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  collectionName: {
    width: 280,
    fontWeight: 'bold',
    paddingRight: 10,
    color: '#495052',
  },
  artistName: {
    width: 280,
    fontSize: 12,
    color: 'rgb(0,190,200)',
    fontWeight: 'bold',
    lineHeight: 24,
  },
  genreName: {
    flexDirection: 'row',
    width: 220,
    // justifyContent: 'space-between',
  },
  explicitness: {
    marginLeft: 5,
    fontWeight: 'bold',
    lineHeight: 20,
    color: 'green',
  },
  duration: {
    marginLeft: 5,
    fontWeight: 'bold',
    lineHeight: 20,
    color: 'rgb(0,190,200)',
  },
  explicitWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#495052',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  explicText: {fontSize: 11, color: '#fff'},
});
