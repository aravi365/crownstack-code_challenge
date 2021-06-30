import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';

const HomeStack = createStackNavigator();

export default function Navigation() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={defaultOptions}
        name="Songs"
        component={Home}
      />
    </HomeStack.Navigator>
  );
}

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#00bfff',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
