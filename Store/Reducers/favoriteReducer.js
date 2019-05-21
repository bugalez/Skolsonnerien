// Store/Reducers/favoriteReducer.js

const initialState = { favoritesPrestation: [] }

function toggleFavorite(state=initialState, action){
  let nextState
  switch (action.type) {
    case 'TOOGLE_FAVORITE':
      const favoritePrestationIndex = state.favoritesPrestation.findIndex(item => item.id === action.value.id)
      if(favoritePrestationIndex !== -1){
        //la prestation est déjà dans les favoris, on la supprime
        nextState = {
          ...state,
          favoritesPrestation: state.favoritesPrestation.filter((item, index) => index !== favoritePrestationIndex)
        }
      }
      else{
        //La prestation n'est pas dans les favoris, on l'ajoute
        nextState = {
          ...state,
          favoritesPrestation: [...state.favoritesPrestation, action.value]
        }
      }
      return nextState || state
    default:
      return state
  }
}

export default toggleFavorite
