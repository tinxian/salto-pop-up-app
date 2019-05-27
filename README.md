

## Getting started

### Prerequisites:

- [Node (10.x.x)](https://nodejs.org/en/)
- [React-Native CLI](https://www.npmjs.com/package/react-native-cli)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
- [VScode](https://code.visualstudio.com/)
- [itermocil](https://github.com/TomAnthony/itermocil)
- iOS
    - [ios-deploy](https://github.com/ios-control/ios-deploy)
    - [XCode](https://developer.apple.com/xcode/)
- Android
    - [Android Studio](https://developer.android.com/studio/?gclid=Cj0KCQiA_s7fBRDrARIsAGEvF8QitKdq7MnBroi8b2BnM65b1Ma0MUBMYdkoWDIK4pNdEgl5Ys24XXgaAm69EALw_wcB)

### Initial install:

1. Clone this repo into your project root
2. Run `yarn`
3. Name your project with `yarn rename YourAppName`, this will configure the app to display your app name
4. For adding app icon and splash screen, please refer to [this guide](https://github.com/bamlab/generator-rn-toolbox/tree/master/generators/assets) and follow it closely

### Startup
We use itermocil to start all scripts for the project with one command. You need the Iterm terminal for this to work. refer to https://github.com/TomAnthony/itermocil

1. `yarn start`
2. Follow instructions in the terminal

### Startup without itermocil

1. run `yarn start-metro`
2. run `yarn watch`
3. run `node help.js` for other instructions

### known issues

- At the moment `react-native run-PLATFORM` is not working properly on some systems with this version of React-native. Start your app using xcode and android studio

