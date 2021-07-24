import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'

import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  )
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  )

  // Check for layout change on rerender
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width)
      setAvailableDeviceHeight(Dimensions.get('window').height)
    }

    Dimensions.addEventListener('change', updateLayout)
    //Clean up function, runs before useEffect fires
    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  })

  return (
    // Using ScrollView to handle devices smaller than what is supported
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>The Game Is Over!</Text>
        {/* Wrapping the image in a view to control the style (creating a rounded image for example) This is mostly needed for android*/}
        <View
          style={[
            { ...styles.imageContainer },
            {
              marginVertical: availableDeviceHeight / 30,
              width: availableDeviceWidth * 0.7,
              height: availableDeviceWidth * 0.7,
              borderRadius: (availableDeviceWidth * 0.7) / 2
            }
          ]}
        >
          <Image
            source={require('../assets/success.png')}
            // Using styles in image controls the actual image itself
            style={styles.image}
            resizeMode='cover'
          />
        </View>
        <View
          style={{
            marginHorizontal: 50,
            marginVertical: availableDeviceHeight / 60
          }}
        >
          <Text
            style={[
              { ...DefaultStyles.bodyText },
              {
                textAlign: 'center',
                fontSize: availableDeviceHeight < 600 ? 12 : 20
              }
            ]}
          >
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  image: {
    width: '100%',
    height: '100%'
  },
  margin: {
    marginTop: 20
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'black',
    //overflow is used to contain the image inside the readius
    overflow: 'hidden'
  },
  highlight: {
    color: Colors.secondary,
    fontFamily: 'open-sans-bold'
  }
})

export default GameOverScreen
