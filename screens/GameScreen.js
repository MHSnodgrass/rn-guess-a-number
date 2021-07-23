import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  )
  const [rounds, setRounds] = useState(0)
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(rounds)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )
    setCurrentGuess(nextNumber)
    setRounds(currentRounds => currentRounds + 1)
  }

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      </View>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View>
          <MainButton
            style={{ ...styles.secondaryButton, ...styles.button }}
            onPress={nextGuessHandler.bind(this, 'lower')}
          >
            <Ionicons name='arrow-down' size={24} color='white' />
          </MainButton>
        </View>
        <View>
          <MainButton
            style={styles.button}
            onPress={nextGuessHandler.bind(this, 'greater')}
          >
            <Ionicons name='arrow-up' size={24} color='white' />
          </MainButton>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 400,
    maxWidth: '90%'
  },
  secondaryButton: {
    backgroundColor: Colors.secondary
  },
  button: {
    width: 160,
    maxWidth: '90%'
  },
  textContainer: {
    marginBottom: 10
  }
})

export default GameScreen
