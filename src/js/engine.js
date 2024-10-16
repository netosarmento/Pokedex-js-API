const offset = 0;
const limit = 10;

/*  Utilizando Fetch API - Ja Integrado aos browser        */
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
/* Chamando a biblioteca */
fetch(url)
    .then(function (response) {    /* metodo then chama uma função, se nao seria .then((response) => {} */
    return response.json()
    .then(function (response) { /* pegando json e imprimir ele */
        console.log(response)
    })
    })
    .catch((error) => {console.error(error)})/* Filtrando error usando catch, e usando sintaxe reduzida */
    .finally(function () {
        console.log("Requisição Concluida")
    })