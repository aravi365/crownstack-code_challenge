import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useQuery} from 'react-query';
import {getSongs} from '../../helpers/getSongs';
import ListElement from './ListElement';

export default function Home({navigation, route}) {
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingView}>
            <ActivityIndicator color="grey" />
            <Text style={styles.loadingText}>Please wait</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={item => item.artistId + String(Math.random() * 26)}
            renderItem={({item, index}) => (
              <ListElement navigation={navigation} data={item} />
            )}
            data={data}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  loadingText: {fontWeight: 'bold', marginTop: 10},
  safeArea: {flex: 1, backgroundColor: '#fff'},
});
