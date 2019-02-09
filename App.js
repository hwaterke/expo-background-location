import React from 'react'
import {App} from './src/App'
import {TaskManager} from 'expo'
import {AsyncStorage} from 'react-native'
import {
  ASYNC_STORAGE_GEOFENCE_KEY,
  ASYNC_STORAGE_KEY,
  BACKGROUND_LOCATION_TASK_NAME,
  GEOFENCE_TASK_NAME,
} from './src/contants/constants'

TaskManager.defineTask(BACKGROUND_LOCATION_TASK_NAME, async ({data, error}) => {
  const store = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
  const events = store ? JSON.parse(store) : []
  events.push(error || data)
  await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(events))
})

TaskManager.defineTask(GEOFENCE_TASK_NAME, async ({data, error}) => {
  const store = await AsyncStorage.getItem(ASYNC_STORAGE_GEOFENCE_KEY)
  const events = store ? JSON.parse(store) : []
  events.push(error || data)
  await AsyncStorage.setItem(ASYNC_STORAGE_GEOFENCE_KEY, JSON.stringify(events))
})

export default App
