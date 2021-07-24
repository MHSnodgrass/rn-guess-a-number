import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'

import Card from '../components/Card'
import Input from '../components/Input'
import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {
  // Used to keep track of number being entered
  const [enteredValue, setEnteredValue] = useState('')
  // Used to track if the number was validated and locked in
  const [confirmed, setConfirmed] = useState(false)
  // Keeps track of the number that was locked in / chosen
  const [selectedNumber, setSelectedNumber] = useState()

  // Makes it so the user cannot enter a non-numeric value (characters, ',', etc)
  const numberInputHandler = inputText => {
    if (inputText.match(/[^0-9]/g)) {
      return
    }
    setEnteredValue(inputText)
  }

  // Used to reset the input text field and close selection/start game component
  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  /*
   * Checks to make sure the number is in fact a number
   * Makes sure the number falls in within business rules (between 1 and 99)
   * Alerts user if any of these checks fail
   * Sets confirmed to true to show selection/start game component and tracks the selectedNumber to pass back to App.js
   * Resets input field and dismisses the keyboard
   */
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return
    }
    setConfirmed(true)
    setSelectedNumber(chosenNumber)
    setEnteredValue('')
    Keyboard.dismiss()
  }

  // Using confirmedOutput to either show or not show the selection/start game component
  let confirmedOutput

  // Selection/Game start component, shows only if the user has succesfully selected a number
  if (confirmed) {
    confirmedOutput = (
      /*
       * Card is a presentational component with predetermined styles, styles can be overloaded, accepts all children via props
       * NumberContainer is a presentation component with predetermined styles, accepts all children via props
       * MainButton is a custom component to replace a button using TouchableOpacity. Takes in onPress via props, text as props.children, and has a predetermined style. Styles can be overloaded.
       */
      <Card style={styles.summaryContainer}>
        <Text style={DefaultStyles.bodyText}>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    )
  }

  return (
    // Allows the user to click any blank space on the screen and dismiss their keyboard (useful for IOS especially)
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={styles.screen}>
        {/* Overloading with DefaultStyles */}
        <Text style={{ ...styles.title, ...DefaultStyles.title }}>
          Start A New Game!
        </Text>
        <Card style={styles.inputContainer}>
          <Text style={DefaultStyles.bodyText}>Select A Number</Text>
          {/* Input is a presentation component with basic styles, can be passed more styles */}
          {/* Takes in all props via ...props, uses TextInput */}
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title='Reset'
                onPress={() => {}}
                color={Colors.secondary}
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                title='Confirm'
                onPress={() => {}}
                color={Colors.primary}
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {/* If a number has been selected, this will show */}
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  // Flexbox is used by default, uses column instead of row
  screen: {
    // Flex: 1 will take all available space in it's main axis (top to bottom) since no other flex has been declared
    flex: 1,
    padding: 10,
    // alignItems will center items along the cross-axis (left to right)
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  },
  buttonContainer: {
    // Changing default flex to row (left to right)
    flexDirection: 'row',
    width: '100%',
    // Providing space between items along main axis (row in this case)
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100,
    maxWidth: '60%'
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
})

export default StartGameScreen
