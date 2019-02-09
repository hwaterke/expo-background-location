import React from 'react'
import {Location} from 'expo'
import {Button} from '../components/Button'
import {Screen} from '../components/Screen'
import {Text} from '../components/Text'

const GEOLOCATION_OPTIONS = {
  accuracy: Location.Accuracy.BestForNavigation,
  timeInterval: 0,
  distanceInterval: 0,
}

export class LocationScreen extends React.Component {
  state = {
    location: null,
    tracking: false,
    tick: 0,
  }

  async componentDidMount() {
    const sub = await Location.watchPositionAsync(
      GEOLOCATION_OPTIONS,
      this.locationChanged
    )
    this.setState({tracking: true, subscription: sub})
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.remove()
    }
  }

  locationChanged = location => {
    this.setState({location, tick: this.state.tick + 1})
  }

  render() {
    return (
      <Screen>
        <Text>Updates: {this.state.tick}</Text>

        <Text>{JSON.stringify(this.state.location, null, 2)}</Text>

        <Button onPress={() => console.log(this.state.location)}>
          <Text>Pin</Text>
        </Button>
      </Screen>
    )
  }
}
