const pokeapi = {}

 pokeapi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
 }

pokeapi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
       .then((response) => response.json())
       .then((jsonresponse) =>jsonresponse.results)
       .then((pokemons) => pokemons.map(pokeapi.getPokemonsDetail))
       .then((detailRequests) => Promise.all(detailRequests))
       .then((pokemonsDetails) => pokemonsDetails)
}