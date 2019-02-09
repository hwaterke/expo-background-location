import React from 'react'
import {TaskManager} from 'expo'
import {ScrollScreen} from '../components/Screen'
import {Text} from '../components/Text'
import {Button} from '../components/Button'

export class BackgroundTasksDebugScreen extends React.Component {
  state = {
    tasks: null,
  }

  componentDidMount() {
    this.refreshBackgroundtasks()
  }

  refreshBackgroundtasks = async () => {
    const tasks = await TaskManager.getRegisteredTasksAsync()
    this.setState({tasks})
  }

  render() {
    return (
      <ScrollScreen>
        <Button onPress={() => this.refreshBackgroundtasks()}>
          <Text>Refresh</Text>
        </Button>

        <Text>{JSON.stringify(this.state.tasks, null, 2)}</Text>
      </ScrollScreen>
    )
  }
}
