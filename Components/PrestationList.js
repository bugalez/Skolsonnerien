// Components/PrestationList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import PrestationItem from './PrestationItem'
import { connect } from 'react-redux'

class PrestationList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      prestations: []
    }
  }

  _displayDetailForPrestation = (idPrestation) => {
    this.props.navigation.navigate('Sortie', {idPrestation: idPrestation})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.prestations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <PrestationItem
              prestation={item}
              isPrestationFavorite={(this.props.favoritesPrestation.findIndex(prestation => prestation.id === item.id) !== -1) ? true : false}
              displayDetailForPrestation={this._displayDetailForPrestation}
            />
          )}
          //onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.props.prestations.length > 0 && this.props.page < this.props.totalPages) {
              // On appelle la méthode loadprestation du component Search pour charger plus de prestation
              this.props.loadPrestations()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f7c600',
  }
})

const mapStateToProps = state => {
  return {
    favoritesPrestation: state.favoritesPrestation
  }
}

export default connect(mapStateToProps)(PrestationList)
