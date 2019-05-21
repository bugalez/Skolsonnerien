/*Components/Search.js
jaune: #f7c600
blue: #05458f
*/

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './PrestationItem'
import { getPrestationFromApi } from '../API/SkolApi'
import PrestationList from './PrestationList'
import PrestationItem from './PrestationItem'
import accents from 'remove-accents'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.searchText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      prestations: [],
      isLoading: false
    }
  }


  componentDidMount (){
       this.setState({prestations : this._loadPrestations()})

 }

  _loadPrestations(){
    if (this.searchText.length > 0) {
      this.setState({ isLoading: true })
      getPrestationFromApi(this.searchText).then(data => {
          this.setState({
            prestations: [ ...this.state.prestations, ...data ],
            isLoading: false
          })
      })
    }else{
      this.setState({isLoading: true})
      getPrestationFromApi().then(data => {
        this.setState({
          prestations: data,
          isLoading: false
        })
      })
    }

  }


  _searchTextInputChanged(text) {
    let texte
    text= accents.remove(text)
    texte=text.charAt(0).toUpperCase() + text.slice(1)
    this.searchText = texte
  }

  _searchPrestations() {
    this.setState({
      prestations: [],
    }, () => {
        this._loadPrestations()
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Rechercher une sortie'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchPrestations()}
        />
        <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._searchPrestations()}/>
        <PrestationList
          prestations={this.state.prestations} // C'est bien le component Search qui récupère les prestations depuis l'API et on les transmet ici pour que le component PrestationList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component PrestationList de naviguer vers le détail d'un film
          loadprestations={this._loadPrestations} // _loadFilm charge les prestations suivants, ça concerne l'API, le component PrestationList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les prestations et c'est le component Search qui lui fournira les prestations suivants
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles=StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#f7c600'
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 5,
    backgroundColor: '#FFDD57',
    color: '#05458f'
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
