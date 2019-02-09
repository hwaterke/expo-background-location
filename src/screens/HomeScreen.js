import React, {Component} from 'react'
import {Location, Permissions, TaskManager} from 'expo'
import {Screen} from '../components/Screen'
import {Button} from '../components/Button'
import {Text} from '../components/Text'
import {BACKGROUND_LOCATION_TASK_NAME} from '../contants/constants'

export class HomeScreen extends Component {
  state = {enabled: false}

  async componentDidMount() {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      alert('Location permission required')
    }

    if (
      await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK_NAME)
    ) {
      this.setState({enabled: true})
    }
  }

  onPress = async () => {
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 20,
      showsBackgroundLocationIndicator: true,
    })
    this.setState({enabled: true})
  }

  disable = async () => {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK_NAME)
    this.setState({enabled: false})
  }

  render() {
    return (
      <Screen>
        <Text>HomeScreen</Text>

        <Button onPress={this.onPress}>
          <Text>Enable background location</Text>
        </Button>

        <Button onPress={this.disable}>
          <Text>Disable background location</Text>
        </Button>

        {this.state.enabled && <Text>Tracking enabled</Text>}

        <Button onPress={() => this.props.navigation.navigate('Location')}>
          <Text>See location</Text>
        </Button>

        <Button
          onPress={() => this.props.navigation.navigate('AsyncStorageDebug')}
        >
          <Text>Async Storage</Text>
        </Button>

        <Button onPress={() => this.props.navigation.navigate('MapScreen')}>
          <Text>View Map</Text>
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate('BackgroundTasksDebug')}
        >
          <Text>Tasks</Text>
        </Button>

        <Button onPress={() => this.props.navigation.navigate('Geofence')}>
          <Text>Geofence</Text>
        </Button>
      </Screen>
    )
  }
}
