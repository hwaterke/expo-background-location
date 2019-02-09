import React, {Component} from 'react'
import {MapView} from 'expo'
import {Marker} from 'react-native-maps'
import {DateTime} from 'luxon'
import {AsyncStorage} from 'react-native'
import {regions} from '../contants/regions'
import {ASYNC_STORAGE_KEY} from '../contants/constants'

export class MapScreen extends Component {
  state = {
    locations: [],
  }

  _intervalId = null

  componentDidMount() {
    this._intervalId = setInterval(() => {
      this.refreshAsyncStorage()
    }, 1000)
  }

  componentWillUnmount() {
    if (this._intervalId) {
      clearInterval(this._intervalId)
    }
  }

  refreshAsyncStorage = async () => {
    const store = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
    this.setState({locations: store ? JSON.parse(store) : []})
  }

  render() {
    const {locations} = this.state
    return (
      <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          ...regions[0],
        }}
      >
        {locations.map(({locations}) => (
          <Marker
            key={DateTime.fromMillis(locations[0].timestamp)}
            coordinate={locations[0].coords}
            title={DateTime.fromMillis(locations[0].timestamp).toLocaleString(
              DateTime.DATETIME_SHORT_WITH_SECONDS
            )}
          />
        ))}
      </MapView>
    )
  }
}
