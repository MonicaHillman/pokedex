async function getPokemons(nome, endpoint) {

    const API_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/";
    const API_GENERATION_URL = "https://pokeapi.co/api/v2/generation/";

    if (nome == 'geração') {
        document.querySelector(".pokemon").innerHTML = "";
        const buscaApiGeração = await fetch(API_GENERATION_URL + endpoint).then((res) => res.json()).catch((err) => console.log("deu ruim!" + err))
        const consultaApiPokemon = await buscaApiGeração.pokemon_species.map(pokemon => fetch(API_POKEMON_URL + pokemon.name).then(res => res.json()));
        let resultado = await Promise.all(consultaApiPokemon);
        return resultado;

    } else {
        const retornaPokemon = await fetch(API_POKEMON_URL + (endpoint || "")).then((res) => res.json()).catch((err) => "Não foi encontrado nenhum pokemon com esse nome!");
        if (endpoint) {
            return retornaPokemon;
        } else {
            const promises = await retornaPokemon.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            let resultadosConvertidos = await Promise.all(promises);
            return resultadosConvertidos;
        }
    }
}

export default getPokemons;