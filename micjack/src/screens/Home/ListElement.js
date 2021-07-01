import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default function ListElement(props) {
  console.log('cjeckprop', props.data);
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 0.5,
        borderColor: 'rgba(190,190,190,0.3)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
      }}>
      <Image
        source={{uri: props.data.artworkUrl60}}
        style={{width: 80, height: 80, borderRadius: 5}}
      />
      <View style={{marginLeft: 10}}>
        <Text style={{width: 280, fontWeight: '800'}} numberOfLines={2}>
          {props.data.trackName || 'No title'}
        </Text>
        <Text
          style={{width: 280, fontWeight: '500', color: '#495052'}}
          numberOfLines={2}>
          {props.data.collectionName}
        </Text>
        <View>
          <Text
            style={{
              width: 280,
              fontSize: 12,
              color: '#0964e3',
              lineHeight: 24,
            }}
            numberOfLines={2}>
            {props.data.artistName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: 100,
              justifyContent: 'space-between',
            }}>
            <Text style={{lineHeight: 20}} numberOfLines={2}>
              {props.data.primaryGenreName}
            </Text>
            <Text style={{width: 280, fontWeight: 'bold', lineHeight: 20}}>
              ({props.data.trackExplicitness === 'notExplicit' ? 'NE' : 'E'})
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
