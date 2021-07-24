import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'

import Colors from '../constants/colors'

//React Native will automatically check which platform the device is running and adjust buttons based on .platform.js notation
const MainButton = props => {
  let ButtonComponent = TouchableOpacity

  // The ripple affect for android is only support from version 21 and up
  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={{ ...styles.button, ...props.style }}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default MainButton
