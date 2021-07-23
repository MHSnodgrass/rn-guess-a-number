import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App () {
  const [userNumber, setUserNumber] = useState()
  const [guessArray, setGuessArray] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }

  const configureNewGameHandler = () => {
    setGuessArray([])
    setUserNumber(null)
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = guessArray => {
    setGuessArray(guessArray)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber && guessArray.length <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    )
  } else if (guessArray.length > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessArray.length}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    )
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess A Number' />
      {content}
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
