import React from 'react'
// just typed rfc and hit tab 
export default function PokemonList({pokemon}) {

    return (
        <div>
            <div className="cardContainer">
                <div className="cardName"><h2>{pokemon.name}</h2></div>
                <div className="cardContainerImage">
                <img src={pokemon.image} alt="of pokemon"></img>
                </div>
                <div className="cardAbilities">
                    {pokemon.abilities[0]} <br />
                    {pokemon.abilities[1]} <br />
                    {pokemon.abilities[2]} <br />
                        
                </div>
                ID: {pokemon.id} <br />
                Height: {pokemon.height} <br/>
                Type: {pokemon.type} <br />
                Weight: {pokemon.weight}
            </div>
        </div>
    )
}
