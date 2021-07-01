import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {millisToMinutes} from '../../helpers/millisToMinutes';

export default function Details({navigation, route}) {
  const {data} = route.params;
  return (
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
      {data.trackTimeMillis ? (
        <Text style={styles.duration}>
          Duration: {millisToMinutes(data.trackTimeMillis)}
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#00bfff',
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
});
