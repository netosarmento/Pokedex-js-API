const pokeapi = {}

/* Função pegando os cabeçalhos no requests, pra fomar meu objeto com detail do API */
function convertPokeapiDetailtoPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    pokemon.types = types
    pokemon.type = type
    
    pokemon.img = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
} 

    pokeapi.getPokemonsDetail = (pokemon) => {
      return fetch(pokemon.url)
      .then((response) => response.json())
      .then(convertPokeapiDetailtoPokemon)
      
    
 }


pokeapi.getPokemons = (offset = 0, limit = 35) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
       .then((response) => response.json())
       .then((jsonresponse) =>jsonresponse.results)
       .then((pokemons) => pokemons.map(pokeapi.getPokemonsDetail))
       .then((detailRequests) => Promise.all(detailRequests))
       .then((pokemonsDetails) => pokemonsDetails)
}