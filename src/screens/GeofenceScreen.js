import React from 'react'
import {ScrollScreen} from '../components/Screen'
import {Text} from '../components/Text'
import {AsyncStorage} from 'react-native'
import {
  ASYNC_STORAGE_GEOFENCE_KEY,
  GEOFENCE_TASK_NAME,
} from '../contants/constants'
import {Button} from '../components/Button'
import {Location} from 'expo'
import {regions} from '../contants/regions'

export class GeofenceScreen extends React.Component {
  state = {
    content: null,
  }

  componentDidMount() {
    this.refreshAsyncStorage()
  }

  refreshAsyncStorage = async () => {
    const store = await AsyncStorage.getItem(ASYNC_STORAGE_GEOFENCE_KEY)
    this.setState({content: store ? JSON.parse(store) : null})
  }

  clear = () => {
    return AsyncStorage.removeItem(ASYNC_STORAGE_GEOFENCE_KEY)
  }

  startGeofence = async () => {
    await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, regions)
  }

  stopGeofence = async () => {
    await Location.stopGeofencingAsync(GEOFENCE_TASK_NAME)
  }

  render() {
    return (
      <ScrollScreen>
        <Button onPress={() => this.refreshAsyncStorage()}>
          <Text>Refresh</Text>
        </Button>

        <Button onPress={() => this.clear()}>
          <Text>Clear</Text>
        </Button>

        <Button onPress={this.startGeofence}>
          <Text>Start geofencing</Text>
        </Button>

        <Button onPress={this.stopGeofence}>
          <Text>Stop geofencing</Text>
        </Button>

        <Text>{JSON.stringify(this.state.content, null, 2)}</Text>
      </ScrollScreen>
    )
  }
}
