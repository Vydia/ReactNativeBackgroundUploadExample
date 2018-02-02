# Example App for [react-native-background-upload](https://github.com/Vydia/react-native-background-upload)

This is a React Native app and Express server that servers ars a very basic
implementation of react-native-background-upload. Use this repo to experiment
with the package, or fork this repo and use it to create a minimal reproduction
of a bug or other issue when opening up a github issue on
[react-native-background-upload](https://github.com/Vydia/react-native-background-upload).

## Usage

 1. Clone the repo
 1. `yarn install`
 1. `npm run server`
 1. Run the example app `react-native run-ios` or `react-native run-android`
 1. Tap the button in the mobile app to perform an upload.

## Important files to look at

### [js/components/Upload.js](https://github.com/Vydia/ReactNativeBackgroundUploadExample/blob/master/js/components/Upload.js)

The React Native component that allows the user to choose an image from device
and upload it to the localhost server.

*Note: In the iOS simulator, you can add images and videos to the camera roll by
dragging and dropping files from finder onto the simulator window. In the Android
emulator you can usually use the emulator camera app to take test picture.*

### [js/server/index.js](https://github.com/Vydia/ReactNativeBackgroundUploadExample/blob/master/js/server/index.js)

The express server that receives the upload and writes it to file.

## Common issues

 1. If your server is not getting hit `adb reverse tcp:3000 tcp:3000`

## Working on the react-native-background-upload package

If you are using this app to make changes to the react-native-background-upload package, you'll probably need to use the react-native-background-upload package from your file system and not from npm.  To do this, edit the package.json to replace the existing version from npm like so:
```
"react-native-background-upload": "file:../react-native-background-upload",
```
Remember not to push this to github because it'll work for you but nobody else.
