import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Alert, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
  //Ciel rounds number up, floor rounds them down
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  // Ex 0.4 * (99 - 1) + 1 = 40.2 = 40.0 (floor)
  // Making it so the program doesn't guess on the first try
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

// Used to render out past guesses
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
    <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
  </View>
)

const GameScreen = props => {
  // Generate the initalGuess from the computer, using the user's number (from props) as the exclusion
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)

  // Store currentGuess from the initialGuess, keeps track of each new guess
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  // Stores an array of all past guesses, starts with the initial
  const [pastGuesses, setPastGuesses] = useState([initialGuess])
  /*
   * useRef stores a value as passes it as a refernce
   * Value stays consistent through rerenders, but can be updated
   * min and max are hardcoded at the moment, could be changed in the future to be more flexable
   */
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  // Grabbing the value of userChoice and onGameOver via destructuring the props
  const { userChoice, onGameOver } = props

  /*
   * useEffect fires on every rerender
   * Can be pointed at certain variables to watch for to rerender
   * useEffect here is watching for currentGuess, userChoice, or onGameOver to change to fire
   */
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    /*
     * Checks if the direction sent (from buttons) is lower or greater (higher)
     * Also checks to see if the user is 'cheating' by giving the computer wrong information
     * Alerts the user if they chose wrong
     */
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ])
      return
    }
    // Changes the ref value's so the computer can try again
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      // Using + 1 to avoid using the same min again
      currentLow.current = currentGuess + 1
    }
    // gets the computers next guess
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )
    // sets to the new guess and adds it to the pastGuess array using array destructuring
    setCurrentGuess(nextNumber)
    // sets the new number to the front of the array so it is easily accessible
    setPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses])
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
            // binds the values to be passed to the function that is passed to the MainButton component
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
      {/*
       * FlatList is used instead of ScrollableView for performance
       * keyExtractor is needed as data (objects) are not set up in the way that FlatList likes
       * keyExtractor also looks for a string, so we are doing the conversion here
       * Passes in all guesses in data, which in turn passes each item and it's index as the second argument to renderListItem (this is done automatically)
       * The length of the array is sent as the first argument (via bind)
       * contentContainerStyle helps style the inner container of content inside the FlatList view
       */}
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={item => item.toString()}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
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
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  // The list container is set to flex: 1 to take all available space
  listContainer: {
    width: '60%',
    flex: 1
  },
  // The list itself uses flexGrow instead of flex to dictate how space within the contain should be distributed among it's children
  list: {
    flexGrow: 1,
    // flex end reverts the main axis (top to bottom becomes bottom to top)
    justifyContent: 'flex-end'
  }
})

export default GameScreen
