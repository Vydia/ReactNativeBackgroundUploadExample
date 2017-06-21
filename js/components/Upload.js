/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   Button,
   StyleSheet,
   Text,
   View
 } from 'react-native';
import Upload from 'react-native-background-upload'

const options = {
  url: 'https://myservice.com/path/to/post',
  path: 'file://path/to/file/on/device',
  method: 'POST',
  headers: {
    'my-custom-header': 's3headervalueorwhateveryouneed'
  },
  // Below are options only supported on Android
  notification: {
    enabled: true
  }
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
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Tap To Upload"
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
