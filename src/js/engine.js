/* const maxRecords = 151   -> para criar o limite   */
let offset = 0;
const limit = 5;
const pokemonList = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('LoadMore')

let infoButton = document.createElement('div')
infoButton.className = "card" /* criando classe pra botar html*/
infoButton.innerHTML = /* criar funçao que criar o html de classe card */

/* criando função javascript pra manipular string em html li */

function convetPokemonTypestoli(pokemonTypes) {   /* to pegando do cabeçalho as informaçoes e jogando direto no html dinamicamente */
  return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

/*   Criando uma Função Javascript encaixando o Json no HTML  */
/* Transformei toda a string li html no meu objeto */
function convertPokemonHTML(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <button id="info" type="button"> +Info </button>
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



/* Chamando a biblioteca e api*/
pokeapi.getPokemons().then((pokemons = []) => {
       pokemonList.innerHTML += pokemons.map(convertPokemonHTML).join('')
    
})

loadPokemonItens(offset, limit)

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonHTML).join('')
        pokemonList.innerHTML += newHtml
    })
}

LoadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit) /* botaria isso nessa linha => const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
  */
})