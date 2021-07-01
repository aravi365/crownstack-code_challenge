import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {useQuery} from 'react-query';
import {getSongs} from '../../helpers/getSongs';
import ListElement from './ListElement';

export default function Home() {
  const {isLoading, error, data, isFetching} = useQuery('songs', async () => {
    try {
      const response = await getSongs();
      if (response && response.results) {
        return response.results;
      }
    } catch (err) {
      console.log(err);
    }
  });

  console.log('data check', data);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.artistId}
        renderItem={({item, index}) => <ListElement data={item} />}
        data={data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
