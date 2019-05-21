//Components/Favorites.js

import React from 'react'
import { StyleSheet, Text} from 'react-native'
import PrestationList from './PrestationList'
import { connect } from 'react-redux'
class Favorites extends React.Component{

  render () {
    return(
      <PrestationList
        style={styles.list}
        prestations={this.props.favoritesPrestation}
        navigation={this.props.navigation}

      />
    )
  }
}

styles = StyleSheet.create({
  list: {
    backgroundColor: '#f7c600'
  }
})

const mapStateToProps = state => {
  return{
    favoritesPrestation: state.favoritesPrestation
  }
}

export default connect(mapStateToProps)(Favorites)
