//Components/PrestationItem.js
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

class PrestationItem extends React.Component{
  _displayFavoriteImage() {
    if(this.props.isPrestationFavorite) {
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/skolsonnerien128x128-trans.png')}
        />
      )
    }
  }

  render(){
    const { prestation, displayDetailForPrestation } = this.props
    return(
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForPrestation(prestation.id)}>

        <View style={styles.times_container}>
          <Text style={styles.text_date}>{prestation.date}</Text>
          <Text style={styles.text_heure}>{prestation.heure}</Text>
        </View>
        {this._displayFavoriteImage()}
        <View style={styles.position_container}>
          <Text style={styles.text_sortie}>{prestation.sortie}</Text>
        </View>
        <View style={styles.lieu_container}>
          <Text style={styles.text_lieu}>{prestation.lieu}</Text>
        </View>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
main_container: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderColor: '#05458f',
  height: 50
},
times_container: {
  marginHorizontal: 5,
  width: 70
},
position_container: {
  width: 180,
  justifyContent: 'center',
  alignItems: 'center',
},
lieu_container: {
  marginHorizontal: 5,
},
text_date: {
  color: '#05458f'
},
text_heure: {
  color: '#05458f'
},
text_sortie: {
  color: '#05458f',
  fontWeight: 'bold',
  flexWrap: 'wrap',
},
text_lieu: {
  color: '#05458f',
  fontWeight: 'bold',
  width: 70
},
favorite_image: {
  height: 30,
  width: 30
}
})

export default PrestationItem
