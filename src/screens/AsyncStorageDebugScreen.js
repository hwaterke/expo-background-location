import React from 'react'
import {AsyncStorage} from 'react-native'
import {ScrollScreen} from '../components/Screen'
import {Button} from '../components/Button'
import {Text} from '../components/Text'
import {ASYNC_STORAGE_KEY} from '../contants/constants'

export class AsyncStorageDebugScreen extends React.Component {
  state = {
    content: null,
  }

  componentDidMount() {
    this.refreshAsyncStorage()
  }

  refreshAsyncStorage = async () => {
    const store = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
    this.setState({content: store ? JSON.parse(store) : null})
  }

  clear = () => {
    return AsyncStorage.removeItem(ASYNC_STORAGE_KEY)
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

        <Text>{JSON.stringify(this.state.content, null, 2)}</Text>
      </ScrollScreen>
    )
  }
}
