/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import MessageCompose from 'react-native-message-compose';
import SmsAndroid  from 'react-native-get-sms-android';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  async requestStatePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          'title': 'READ_STATE',
          'message': 'READ_STATE '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the SEND_SMS")
      } else {
        console.log("SEND_SMS permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  async componentDidMount() {
    await this.requestStatePermission();
    SmsAndroid.autoSend(phoneNumber, "This is subject", (fail) => {
      console.log("Failed with this error: " + fail)
  }, (success) => {
      console.log("SMS sent successfully" + success);
  });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
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
