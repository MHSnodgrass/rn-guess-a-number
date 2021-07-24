import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

import Colors from '../constants/colors'

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid
        })
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: Platform.OS === 'ios' ? 26 : 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : 'black',
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal'
  }
})

export default Header
