async function getPokemons(endpoint) {

    const API__URL = "https://pokeapi.co/api/v2/pokemon/";

    if (endpoint) {
        const conexao = API__URL + endpoint;
        const retornaPokemon = await fetch(conexao).then((res) => res.json()).catch((err) => console.log("deu erro!"));
        return retornaPokemon;
    } else {
        const retornaPokemon = await fetch(API__URL).then((res) => res.json()).catch((err) => console.log("deu erro!"));
        const promises = await retornaPokemon.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
        let resultadosConvertidos = await Promise.all(promises);
        return resultadosConvertidos;
    }
}

export default getPokemons;