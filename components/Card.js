import React from 'react'
import { View, StyleSheet } from 'react-native'

/*
 * Presentational component
 * props.children allows anything to be wrapped by this component
 * Puts children in a view with a specific style, allows style overloaded via object destructuring (...styles)
 */
const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  )
}

const styles = StyleSheet.create({
  card: {
    // shadow{Property} is used for drop shadows with IOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // shadow properties don't work in android, elevation must be used
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  }
})

export default Card
