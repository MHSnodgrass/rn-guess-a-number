import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>The Game Is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          // source={{
          //   uri:
          //     'https://abrahamswallet.com/wp-content/uploads/2017/12/samuel-ferrara-117219-1180x770.jpg'
          // }}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ ...DefaultStyles.bodyText, ...styles.resultText }}>
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
