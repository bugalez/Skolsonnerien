// Navigation/Navigation.js

import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Search from '../Components/Search'
import Sortie from '../Components/PrestationDetail'
import Favorites from '../Components/Favorites'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Bagad de Tréguier',
      headerStyle: {
        backgroundColor: '#05458f'
      },
      headerTitleStyle: {
        backgroundColor: '#05458f',
        color: '#fff',
      }
    }
  },
  Sortie: {
    screen: Sortie,
    navigationOptions: {
      title: 'Sortie',
      headerStyle: {
        backgroundColor: '#05458f'
      },
      headerTitleStyle: {
        backgroundColor: '#05458f',
        color: '#fff',
      },
      headerTintColor: 'white',
    }
  }

})

const FavoiteStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris',
      headerStyle: {
        backgroundColor: '#05458f'
      },
      headerTitleStyle: {
        backgroundColor: '#05458f',
        color: '#fff',
      }
    }
  },
  Sortie: {
    screen: Sortie,
    navigationOptions: {
      title: 'Sortie',
      headerStyle: {
        backgroundColor: '#05458f'
      },
      headerTitleStyle: {
        backgroundColor: '#05458f',
        color: '#fff',
      },
      headerTintColor: 'white',
    }
  }

})

const PrestationTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions:{
      tabBarIcon: () => {
        return <Image
          source={require('../Images/icons8-search-32.png')}
          style={styles.icon}
        />
      },
      tabBarOptions: {
        activeBackgroundColor : '#05458f',
        inactiveBackgroundColor : '#0978F6',
        showLabel : false
      }
    }
  },
  Favorites: {
    screen: FavoiteStackNavigator,
    navigationOptions:{
      tabBarIcon: () => {
        return <Image
          source={require('../Images/check.png')}
          style={styles.icon}
        />
      },
      tabBarOptions: {
        activeBackgroundColor : '#05458f',
        inactiveBackgroundColor : '#0978F6',
        showLabel : false
      }
    }
  }
})

const  styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

//export default PrestationTabNavigator
export default createAppContainer(SearchStackNavigator)
