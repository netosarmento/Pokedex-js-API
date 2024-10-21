/* const maxRecords = 151   -> para criar o limite   */
let offset = 0;
const limit = 5;
const pokemonList = document.getElementById('pokemonList')
const LoadMoreButton = document.getElementById('LoadMore')
let loadedPokemons = [];
 
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
    console.log('Pokemon Info:', pokemon); // Verificando o objeto Pokémon
    if (!pokemon) {
        console.error("Nenhum Pokémon fornecido para criar a info.");
        return '';
    }
    return `
        <div class="card-container">
            <div class="card">
                <div class="main">
                    <img class='tokenImage' src="${pokemon.img}" alt="${pokemon.name}" />
                    <h2>#0${pokemon.number}</h2>
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


/* Ajustando a função para nao haver repetições, preciso criar uma lista dos pokemons carregados     */
// listando os pokemons carregados let = loadedPokemons


function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        // antigo   código-  const newHtml = pokemons.map(convertPokemonHTML).join('');
       // os pokemons eram só adicionados automaticamente -   pokemonList.innerHTML += newHtml;
        
        const newPokemons = pokemons.filter(pokemon =>     // método filtrar os Pokémon que já foram carregados, evitando duplicações
            !loadedPokemons.some(loadedPokemon => loadedPokemon.number === pokemon.number) // associando pelo número
        );

        if (newPokemons.length > 0) { // verificando se há novos Pokémon que não foram carregados
            // Gera o HTML apenas para os Pokémon novos e adiciona na lista
            const newHtml = newPokemons.map(convertPokemonHTML).join('');
            pokemonList.innerHTML += newHtml; // adicionando eles agora ja filtrados
          
            
            loadedPokemons = [...loadedPokemons, ...newPokemons]; // mostrando a lista agora sem repetições  
          
            // Adiciona o evento de clique para os botões "+Info" criados dinamicamente
            document.querySelectorAll('.info-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const pokemonName = this.closest('.pokemon').querySelector('.name').textContent;
                    
                    // Agora buscamos o Pokémon dentro da lista de novos Pokémon (newPokemons)
                    const pokemon = loadedPokemons.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());

                    if (pokemon) {
                        console.log("Pokémon clicado:", pokemon); // Verificando se está funcionando
                        handleClick(pokemon);
                    } else {
                        console.error("Pokémon não encontrado:", pokemonName); // verificando os erros
                    }
                });
            });
        }
    });
}





/* ----------------------------------------------------------------------------------------------------*/

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