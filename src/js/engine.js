/* const maxRecords = 151   -> para criar o limite   */
let offset = 0;
const limit = 5;
const pokemonList = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('LoadMore')

// function handleClick(pokemon) {
//    const existingCard = document.querySelector('.card'); /* verficicar se nao tem um aberto para poder abrir */
//    if (existingCard) {
        // Remove o card existentente se existir
//        existingCard.remove();
//    } else   {
//        const infoButton = document.createElement('div') /* criando a div pra botar o html */ 
//        infoButton.className = "card" /* criando classe pra botar html*/
//        infoButton.innerHTML =  botaoPokemonInfo(pokemon); /* criar funçao que criar o html de classe card */
//        document.body.appendChild(infoButton) /* mostrando o html criando botao no body */
    
function handleClick(pokemon) {
    const existingCard = document.querySelector('.card');
    if (existingCard) {
        existingCard.remove();
    } else {
        const infoButton = document.createElement('div');
        infoButton.className = "card";
        infoButton.innerHTML = botaoPokemonInfo(pokemon); // Atualizado
        document.body.appendChild(infoButton);
        console.log("Card criado:", infoButton);
    }
}

function botaoPokemonInfo(pokemon) {
    return `
        <div class="card-container">
            <div class="card">
                <div class="main">
                    <img class='tokenImage' src="${pokemon.img}" alt="${pokemon.name}" />
                    <h2>#${pokemon.number}</h2>
                    <p class='description'>Base experience: ${pokemon.base_experience}</p>
                    <div class='tokenInfo'>
                        <div class="price">
                            <p>Height: ${pokemon.height} m</p>
                        </div>
                        <div class="duration">
                            <p>Weight: ${pokemon.weight} kg</p>
                        </div>
                    </div>
                    <hr />
                    <div class='creator'>
                        <p>Moves: </p>
                    </div>
                </div>
                <div class="back">
                    <h2>Conteúdo Extra</h2>
                    <p>Mais informações sobre ${pokemon.name}.</p>
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
                const pokemon = pokemons.find(p => p.name === this.closest('.pokemon').querySelector('.name').textContent);
                console.log("Pokémon clicado:", pokemon); // verificando se esta funcionando
                handleClick(pokemon);
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


//         const listItens = []    

//         for (let i = 0; i < pokemons.length; i++) {
//             const pokemon = pokemons[i];
           
//             listItens.push(convertPokemonToLi(pokemon))
           
//         }
//         console.log(listItens)





//debugger //usado para testagem de debugação no browser sem ter que ficar procurando


//  try{
//  }catch(error){
//  }finally{
//  }

//Código explicado da aula:

// fetch(url)//promise, mecanismo para controlar a interpretação da resposta e dar um destino adequado

// .then(function (response){
//         console.log(response) //quando der certo chame essa função para manipular a resposta
//  })//processamento assincrono

//  .catch(function (error){
//     console.log(error)//para manipular o fracasso
//  })

// //Toda vez que essa requisição terminasse independente do sucesso ou do fracasso eu poderia ter:

//  .finally(function (){
//     console.log('requisição concluída!')
//  })

//  const x = 10+2
//  console.log(x)