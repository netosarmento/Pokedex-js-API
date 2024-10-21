/* const maxRecords = 151   -> para criar o limite   */
let offset = 0;
const limit = 5;
const pokemonList = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('LoadMore')

 
function handleClick(pokemon) {
    const existingCard = document.querySelector('.card');
    if (existingCard) {
        existingCard.remove();
    }
    const infoButton = document.createElement('div'); //criando a div do card
    infoButton.className = "card"; // dando nome a classe
    infoButton.innerHTML = botaoPokemonInfo(pokemon); // Atualizado
    document.body.appendChild(infoButton); //adicionando com append ao html
    console.log("Card criado:", infoButton);
    
    const closeButton = infoButton.querySelector('.close'); //adicionando o botao e função pra fechar o html
    closeButton.addEventListener('click', function() {
        infoButton.remove(); // Remove o card do DOM
    });
}


function botaoPokemonInfo(pokemon) {
    console.log('Pokemon Info:', pokemon); // Verificando o objeto Pokémon
    if (!pokemon) {
        console.error("Nenhum Pokémon fornecido para criar a info.");
        return '';
    }

    // Gerar a lista de habilidades e movimentos corretamente
    const abilitiesList = pokemon.abilities.slice(0, 2).map(ability => `<li>${ability}</li>`).join('');
    const movesList = pokemon.moves.slice(0, 2).map(move => `<li>${move}</li>`).join('');

    return `
        <div class="card-container">
            <div class="card ${pokemon.type}">
                <button class="close" type="button"> X </button> 
                <div class="main">
                    <img class='pokeImage' src="${pokemon.img}" alt="${pokemon.name}" />
                    <h2>#0${pokemon.number}</h2>
                    <span class="typecard">${pokemon.type}</span> 
                    <p class='description'>Experiência de Base: ${pokemon.base_experience}</p>
                    <div class='pokeInfo'>
                        <div class="height">
                            <p>Altura: ${pokemon.height} m</p>
                        </div>
                        <div class="weight">
                            <p>Peso: ${pokemon.weight} kg</p>
                        </div>
                    </div>
                    <hr />
                    <div class='creator'>
                        <p>Ataques:</p>
                        <ul>
                            ${movesList}
                        </ul>
                    </div>
                </div>
                <div class="back">
                    <h2>Habilidades ${pokemon.name}:</h2>
                    <ul>
                        ${abilitiesList}
                    </ul>
                </div>
            </div>
        </div>
    `;
}






/* criando função javascript pra manipular string em html li */

function convetPokemonTypestoli(pokemonTypes) {   /* to pegando do cabeçalho as informaçoes e jogando direto no html dinamicamente */
  return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

/*   Criando uma Função Javascript encaixando o Json no HTML  */
/* Transformei toda a string li html no meu objeto */
function convertPokemonHTML(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <button class="info-btn" type="button"> +Info </button>
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
        const newHtml = pokemons.map(convertPokemonHTML).join('');
        pokemonList.innerHTML += newHtml;

        // Adiciona o evento de clique para os botões "+Info" criados dinamicamente
        document.querySelectorAll('.info-btn').forEach(button => {
            button.addEventListener('click', function () {
                const pokemonName = this.closest('.pokemon').querySelector('.name').textContent;
                const pokemon = pokemons.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());

                if (pokemon) {
                    console.log("Pokémon clicado:", pokemon); // Verificando se está funcionando
                    handleClick(pokemon);
                } else {
                    console.error("Pokémon não encontrado:", pokemonName);
                }
            });
        });
    });
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

