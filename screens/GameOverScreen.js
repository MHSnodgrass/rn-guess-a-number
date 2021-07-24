import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>The Game Is Over!</Text>
      {/* Wrapping the image in a view to control the style (creating a rounded image for example) This is mostly needed for android*/}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          // Using styles in image controls the actual image itself
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ ...DefaultStyles.bodyText, ...styles.resultText }}>
          {/* Using {' '} to force a space between the nested text components */}
          Your phone needed{' '}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{' '}
          <Text style={styles.highlight}>{props.userNumber}.</Text>
        </Text>
      </View>
      <View style={styles.margin}>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  margin: {
    marginTop: 20
  },
  imageContainer: {
    marginVertical: 20,
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    //overflow is used to contain the image inside the readius
    overflow: 'hidden'
  },
  highlight: {
    color: Colors.secondary,
    fontFamily: 'open-sans-bold'
  },
  textContainer: {
    marginHorizontal: 50
  },
  resultText: {
    textAlign: 'center',
    fontSize: 18
  }
})

export default GameOverScreen
