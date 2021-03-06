/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './navigation/Navigator';
import RNBootSplash from 'react-native-bootsplash';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          onReady={() =>
            setTimeout(() => {
              RNBootSplash.hide({fade: true});
            }, 2000)
          }>
          <StatusBar barStyle={'light-content'} />
          <Navigator />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
