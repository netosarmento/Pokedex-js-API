const offset = 0;
const limit = 10;

/*   Criando uma Função Javascript encaixando o Json no HTML  */

function convertPokemonHTML(pokemon) {
    return `<li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        <li class="type">Grass</li>
                        <li class="type">Poison</li>
                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
                </div>
            </li>
            ` 
}
/*  Utilizando Fetch API - Ja Integrado aos browser        */
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
/* Chamando a biblioteca */
fetch(url)
    .then(function (response) {    /* metodo then chama uma função, se nao seria .then((response) => {} */
    return response.json()
    .then((jsonresponse) =>jsonresponse.results)
    .then((pokemonList) => {
        for (let i = 0; i < pokemonList.length; i++) {
            const pokemon = pokemonList[i];
            console.log(convertPokemonHTML(pokemon))
        }
    })
    .catch((error) => {console.error(error)})/* Filtrando error usando catch, e usando sintaxe reduzida */