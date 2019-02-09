import React from 'react'
import {HomeScreen} from './screens/HomeScreen'
import {createAppContainer, createStackNavigator} from 'react-navigation'
import {colors} from './contants/colors'
import {LocationScreen} from './screens/LocationScreen'
import {AsyncStorageDebugScreen} from './screens/AsyncStorageDebugScreen'
import {MapScreen} from './screens/MapScreen'
import {BackgroundTasksDebugScreen} from './screens/BackgroundTasksDebugScreen'
import {GeofenceScreen} from './screens/GeofenceScreen'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
      },
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        title: 'Location',
      },
    },
    AsyncStorageDebug: {
      screen: AsyncStorageDebugScreen,
      navigationOptions: {
        title: 'Async Storage',
      },
    },
    MapScreen: {
      screen: MapScreen,
      navigationOptions: {
        title: 'Map',
      },
    },
    BackgroundTasksDebug: {
      screen: BackgroundTasksDebugScreen,
      navigationOptions: {
        title: 'Tasks',
      },
    },
    Geofence: {
      screen: GeofenceScreen,
      navigationOptions: {
        title: 'Geofence',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)
export const App = createAppContainer(AppNavigator)
