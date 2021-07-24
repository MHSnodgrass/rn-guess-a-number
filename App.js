import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as Font from 'expo-font'
// AppLoading must be brought in like this instead of { AppLoading } due to expo versioning
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
  // Handle user's number choice from StartGameScreen
  const [userNumber, setUserNumber] = useState()
  // Handle computer guesses coming from GameScreen
  const [guessArray, setGuessArray] = useState([])
  // Handle font loading
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    // Shows default screen while fonts load instead of loading in title screen and changing fonts (or returning errors)
    return (
      <AppLoading
        // Returns a promise once fonts are received
        startAsync={fetchFonts}
        // Once finished, set state to true so this component does not render on next rerender
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }

  /*
   * Handler gets sent to GameOverScreen to restart the game once over
   * Resets guessArray and userNumber to start back at the StartGameScreen
   */
  const configureNewGameHandler = () => {
    setGuessArray([])
    setUserNumber(null)
  }

  // Handler gets sent to the StartGameScreen to retrieve the user's number choice
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
  }

  /*
   * Handler gets sent to GameScreen to receive all of the past guesses from the generator
   * Used to pass the number of guesses (rounds) to the GameOverScreen
   */
  const gameOverHandler = guessArray => {
    setGuessArray(guessArray)
  }

  // Using a variable to set "page" instead of routing
  let content = <StartGameScreen onStartGame={startGameHandler} />

  // If there is a userNumber present and the amount of guesses is 0, show the game screen instead
  if (userNumber && guessArray.length <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    ) // If the guessArray has guesses on rerender, the game is over -> display GameOverScreen
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
    <SafeAreaView style={styles.screen}>
      <Header title='Guess A Number' />
      {content}
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})
