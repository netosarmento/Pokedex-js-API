/* criando função javascript pra manipular string em html li */

function convetPokemonTypestoli(pokemonTypes) {   /* to pegando do cabeçalho as informaçoes e jogando direto no html dinamicamente */
  return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

/*   Criando uma Função Javascript encaixando o Json no HTML  */
/* Transformei toda a string li html no meu objeto */
function convertPokemonHTML(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <span class="number">#0${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.img}" alt="${pokemon.name}">
                </div>
            </li>
            ` 
}

const pokemonList = document.getElementById('pokemonList')


/* Chamando a biblioteca e api*/
pokeapi.getPokemons().then((pokemons = []) => {
       pokemonList.innerHTML += pokemons.map(convertPokemonHTML).join('')
    
    /*
    for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            pokemonList.innerHTML += convertPokemonHTML(pokemon)
        } */
})
    