/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react'
 import {
   AppRegistry,
   Button,
   StyleSheet,
   Text,
   View
 } from 'react-native'
import Upload from 'react-native-background-upload'

const options = {
  url: 'http://localhost:3000/upload',
  path: 'file://path/to/file/on/device',
  method: 'POST',
  headers: {
    'my-custom-header': 's3headervalueorwhateveryouneed'
  }
  // Below are options only supported on Android
  // notification: {
  //   enabled: true
  // }
}

export default class ReactNativeBackgroundUploadExample extends Component {

  handlePress = () => {
    Upload.startUpload(options).then((uploadId) => {
      console.log('Upload started')
      Upload.addListener('progress',uploadId, (data) => {
        console.log(`Progress: ${data.progress}%`)
      })
      Upload.addListener('error',uploadId, (data) => {
        console.log(`Error: ${data.error}%`)
      })
      Upload.addListener('completed',uploadId, (data) => {
        console.log(`Completed!`)
      })
    }).catch(function(err) {
      console.log('Upload error!',err)
    })
  }

  render() {
    return (
      <Button
        title="Tap To Upload"
        onPress={this.handlePress}
      />
    )
  }
}

const styles = StyleSheet.create({
})
