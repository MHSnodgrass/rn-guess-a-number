import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

import Colors from '../constants/colors'

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Game Is Over!</Text>
      <Text>Number Of Rounds: {props.roundsNumber}</Text>
      <Text>Number Was: {props.userNumber}</Text>
      <Button
        title='NEW GAME'
        onPress={props.onRestart}
        color={Colors.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default GameOverScreen
