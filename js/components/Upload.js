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
      isImagePickerShowing: false,
      uploadId: null,
    }
  }

  startUpload = (opts) => {
    Upload.getFileInfo(opts.path).then((metadata) => {
      const options = Object.assign({
        method: 'POST',
        headers: {
          'content-type': metadata.mimeType // server requires a content-type header
        }
      }, opts)

      Upload.startUpload(options).then((uploadId) => {
        console.log(`Upload started with options: ${JSON.stringify(options)}`)
        this.setState({ uploadId });
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

  cancelUpload = () => {
    this.state.uploadId &&
      Upload.cancelUpload(this.state.uploadId).then((props) => {
        console.log('upload canceled');
      });
  }

  render() {
    return (
      <View>
        <View>
          <Button
            title="Tap To Upload Raw"
            onPress={() => this.onPressUpload({
              url: 'http://localhost:3000/upload_raw',
              type: 'raw'
            })}
          />
          <View/>
          <Button
            title="Tap To Upload Multipart"
            onPress={() => this.onPressUpload({
              url: 'http://localhost:3000/upload_multipart',
              field: 'uploaded_media',
              type: 'multipart'
            })}
          />
          <View/>
          <Button
            title="Tap cancel uploading"
            onPress={this.cancelUpload}
          />
        </View>
      </View>
    )
  }
}
