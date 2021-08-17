import React, {useState, useEffect} from 'react';
import PokemonList from './components/PokemonList.js';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';


function App() {
  const [pokemon, setPokemon] =  useState({
    name: '',
    id: 0,
    species: ''

  })
  let count = 4;
  const [currentPageUrl, setcurrentPageUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${count}/`)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true) // enable loading
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel=c)
    }).then(res=>{
      setLoading(false) //we have data so no longer loading 
      let next = res.data.id += 1;
      let prev = res.data.id -= 1;
      setNextPageUrl(`https://pokeapi.co/api/v2/pokemon/${next}/`)
      setPrevPageUrl(`https://pokeapi.co/api/v2/pokemon/${prev}/`)
      console.log(res.data)
      setPokemon({
        name: res.data.name, 
        id: res.data.id, 
        height: res.data.height, 
        weight: res.data.weight,
        image: res.data.sprites.front_shiny, 
        type: res.data.types[0].type.name,
        abilities: res.data.abilities.map(ability => ability.ability.name)
      })
    })

    return () => cancel()
      //cleanup and cancel any previous request 
  },[currentPageUrl])

  function gotoNextPage() {
    setcurrentPageUrl(nextPageUrl)
  }

function gotoPrevPage(){
  setcurrentPageUrl(prevPageUrl)
}

  if (loading) return "Loading..."
  return (
    <>
   <PokemonList pokemon={pokemon}/>
   <Pagination gotoNextPage={nextPageUrl ? gotoNextPage : null}  gotoPrevPage={prevPageUrl ? gotoPrevPage : null}/>
   </>
  );
}

export default App;
