/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react'
 import {
   AppRegistry,
   Button,
   Platform,
   StyleSheet,
   Text,
   View
 } from 'react-native'
import Upload from 'react-native-background-upload'
import ImagePicker from 'react-native-image-picker'

export default class ReactNativeBackgroundUploadExample extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isImagePickerShowing: false
    }
  }

  startUpload = (opts) => {
    const options = Object.assign({
      method: 'POST'
      // headers: {
      //   'my-custom-header': 's3headervalueorwhateveryouneed'
      // },
      // Below are options only supported on Android
      // notification: {
      //   enabled: true
      // }
    }, opts)

    Upload.startUpload(options).then((uploadId) => {
      console.log(`Upload started with options: ${JSON.stringify(options)}`)
      Upload.addListener('progress', uploadId, (data) => {
        console.log(`Progress: ${data.progress}%`)
      })
      Upload.addListener('error', uploadId, (data) => {
        console.log(`Error: ${data.error}%`)
      })
      Upload.addListener('completed', uploadId, (data) => {
        console.log('Completed!')
      })
    }).catch(function(err) {
      console.log('Upload error!', err)
    })
  }

  onPressUpload = (options) => {
    if (this.state.isImagePickerShowing) {
      return
    }

    this.setState({ isImagePickerShowing: true })

    const imagePickerOptions = {
      takePhotoButtonTitle: null,
      title: 'Upload Media',
      chooseFromLibraryButtonTitle: 'Choose From Library'
    }

    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      let didChooseVideo = true

      console.log('ImagePicker response: ', response)
      const { customButton, didCancel, error, path, uri } = response

      if (didCancel) {
        didChooseVideo = false
      }

      if (error) {
        console.warn('ImagePicker error:', response)
        didChooseVideo = false
      }

      // TODO: Should this happen higher?
      this.setState({ isImagePickerShowing: false })

      if (!didChooseVideo) {
        return
      }

      if (Platform.OS === 'android') {
        if (path) { // Video is stored locally on the device
          // TODO: What here?
          this.startUpload(Object.assign({ path }, options))
        } else { // Video is stored in google cloud
          // TODO: What here?
          this.props.onVideoNotFound()
        }
      } else {
        this.startUpload(Object.assign({ path: uri }, options))
      }
    })
  }

  render() {
    return (
      <View>
        <View>
          <Button
            title="Tap To Upload Data Raw"
            onPress={() => this.onPressUpload({
              url: 'http://192.168.1.10:3000/upload_raw',
              type: 'raw'
            })}
          />
        <View>
        </View>
          <Button
            title="Tap To Upload Multipart"
            onPress={() => this.onPressUpload({
              url: 'http://192.168.1.10:3000/upload_multipart',
              field: 'uploaded_media',
              type: 'multipart'
            })}
          />
        </View>
      </View>
    )
  }
}
