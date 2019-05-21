// Components/PrestationDetail.js

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  Platform
 } from 'react-native'
import { getPrestationDetailFromAPI } from '../API/SkolApi'
import { connect } from 'react-redux'
import moment from 'moment'
import localization from 'moment/locale/fr'

class PrestationDetail extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      prestation: undefined,
      isLoading: true
    }
  }

  _displayFloatingActionButton() {
    const { prestation } = this.state
    if(prestation != undefined) {
      return(
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={()=> this._sharePrestation()} >
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.android.png')}
          />
        </TouchableOpacity>
      )
    }
  }

  _sharePrestation(){
    const { prestation } = this.state
    Share.share({ title: prestation.sortie, message:"Bonjour je suis dispo pour " + prestation.lieu})
      .then(
        Alert.alert(
          'Succès',
          'Sortie envoyé',
          [
            {text: 'OK', onPress: ()=>{}}
          ]
        )
      )
      .catch(err=>
        Alert.alert(
          'Echec',
          'Sortie non envoyé',
          [
            {text: 'OK', onPress: ()=>{}}
          ]
        )

      )
  }

  _displayFavoriteImage() {
    var sourceImage = require('../Images/icons8-ok-50-1.png')
    if (this.props.favoritesPrestation.findIndex(item => item.id === this.state.prestation.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../Images/icons8-cancel-50.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
}

  _toggleFavorite(){
    const action = {type: 'TOOGLE_FAVORITE', value: this.state.prestation}
    this.props.dispatch(action)
  }

  _displayLoading(){
    if(this.state.isLoading){
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color='#05458f' />
        </View>
      )
    }
  }

  componentDidMount(){
    const favoritePrestationIndex = this.props.favoritesPrestation.findIndex(item => item.id === this.props.navigation.state.params.idPrestation)
    if(favoritePrestationIndex !== -1) {
      this.setState({
        prestation: this.props.favoritesPrestation[favoritePrestationIndex]
      })
      return
    }
    this.setState({ isLoading: true })
    getPrestationDetailFromAPI(this.props.navigation.state.params.idPrestation).then(data => {
      this.setState({
        prestation: data,
        isLoading: false
      })
    })
  }

  _getImageDetail() {
    if(this.state.prestation.logos === 'vide'){
      return(
        <Image style={styles.image_container}
          source={require('../Images/skolsonnerien128x128-trans.png')}
        />
      )
    }else {
      return (
        <Image
          style={styles.image_container}
          source={{uri: this.state.prestation.logos}}
        />
      )
    }
  }

  _displayPrestation() {
    const { prestation } = this.state
     if (prestation != undefined) {
       return (
         <ScrollView style={styles.scrollview_container}>
           <View style={styles.main_container}>

             {this._getImageDetail()}
              <View style={styles.title_container}>
               <Text style={styles.text_sortie}>{prestation.sortie}</Text>
              </View>
              <View style={styles.lieu_container}>
                <Text style={styles.text_lieu}>{prestation.lieu}</Text>
              </View>
              <View style={styles.horaire_container}>
                <Text style={styles.text_date}>{moment(prestation.date, 'DD/MM/YY').locale("fr", localization).format('dddd Do MMMM YYYY')}</Text>
                <Text style={styles.text_time}>{prestation.heure}</Text>
              </View>
              <View style={styles.divers_container}>
                <Text style={styles.text_nbsonneur}>Nombres de sonneurs : {prestation.nbr_sonneurs}</Text>
                <Text style={styles.text_infos}>{prestation.infos}</Text>
              <TouchableOpacity
                style={styles.favorite_container}
                onPress={()=>this._toggleFavorite()}>
                {this._displayFavoriteImage()}
              </TouchableOpacity>
              </View>
          </View>
         </ScrollView>
       )
     }
   }

  render(){
    return(
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayPrestation()}
        {this._displayFloatingActionButton()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7c600',
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    scrollview_container: {
      backgroundColor: '#f7c600',
    },
    title_container: {
      marginVertical: 20
    },
    lieu_container: {
      marginBottom: 10
    },
    horaire_container: {
      flexDirection: 'row',
    },
    text_sortie: {
      fontSize: 20,
      color: '#05458f',
      flexWrap: 'wrap',
      textAlign: 'center'
    },
    text_lieu: {
      fontSize: 18,
      color: '#05458f',
    },
    text_date: {
      color: '#05458f',
      marginRight: 50,
      fontWeight: 'bold'
    },
    text_time: {
      color: '#05458f',
      fontWeight: 'bold'
    },
    image_container: {
      height: 128,
      width: 128,
      marginTop: 20
  },
    text_infos: {
      color: '#05458f',
      marginHorizontal: 50
    },
    text_nbsonneur: {
      color: '#05458f',
      textAlign: 'center',
      marginVertical: 20
    },
    favorite_container: {
      alignItems: 'center',
    },
    share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 50,
    height: 30
  }

  })

  const mapStateToProps = state => {
    return {
      favoritesPrestation : state.favoritesPrestation
    }
  }

export default connect(mapStateToProps)(PrestationDetail)
