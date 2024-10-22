let offset = 0;
const limit = 5;
const pokemonList = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('LoadMore')
let allPokemons = []; // armazenar todos os pokemons, para conseguir exibir alem do limit

const loadedPokemons = new Set(); // Usar set para cada um ter valor unico e evitar duplicatas

function handleClick(pokemon) {
    const existingCard = document.querySelector('.card');
    if (existingCard) {
        existingCard.remove();
    }
    const infoButton = document.createElement('div'); // criando a div do card
    infoButton.className = "card"; // dando nome a classe
    infoButton.innerHTML = botaoPokemonInfo(pokemon); // Atualizado
    document.body.appendChild(infoButton); // adicionando com append ao html
    console.log("Card criado:", infoButton);
    
    const closeButton = infoButton.querySelector('.close'); // adicionando o botao e função pra fechar o html
    closeButton.addEventListener('click', function() {
        infoButton.remove(); 
    });
}

function botaoPokemonInfo(pokemon) {
    console.log('Pokemon Info:', pokemon); // Verificando o objeto Pokémon
    if (!pokemon) {
        console.error("Pokémon erro:", pokemon); // verificando erro
        return '';
    }

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
            </li>`;
}

function InfoButton(pokemons) {
    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', function () {
            const pokemonName = this.closest('.pokemon').querySelector('.name').textContent.toLowerCase();
            console.log("Nome do Pokémon clicado:", pokemonName); // Pokemon clicado
            console.log("Pokémons carregados:", allPokemons.map(p => p.name.toLowerCase())); // Pokémon carregado

            // Comparar para match
            const pokemon = allPokemons.find(p => p.name.toLowerCase() === pokemonName);

            if (pokemon) {
                console.log("Pokémon clicado:", pokemon); //Mostrar no console Pokémon clicado
                handleClick(pokemon);
            } else {
                console.error("Pokémon não encontrado:", pokemonName); // vendo erro no console
            }
        });
    });
}

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonHTML).join('');
        pokemonList.innerHTML += newHtml; // Adiciona novos Pokémon à lista

        allPokemons = allPokemons.concat(pokemons); // adicionando pokemons sem duplicata

        // Adiciona o evento de clique para os botões "+Info" criados dinamicamente
        InfoButton(allPokemons); // Usa todos os Pokémon para a pesquisa
    });
}


LoadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItens(offset, limit);
});


loadPokemonItens(offset, limit);
