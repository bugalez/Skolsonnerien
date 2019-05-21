// SkolApi.js

const API = 'https://bridge.buddyweb.fr/api/prestations/bagad/'

export function getPrestationFromApi (text=false){
  let url
  if(text){
    url = API + '?lieu=' + text
  }else {
    url = API
  }
   return fetch(url)
     .then((response) => response.json())
     .catch((error) => console.error(error))
}

export function getPrestationDetailFromAPI(id){
  return fetch(API + id)
    .then((response) => response.json())
    .catch((error) => console.error(error))

}
