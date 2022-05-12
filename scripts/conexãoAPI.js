async function getPokemons(nome, endpoint) {
    const API_URL = 'https://pokeapi.co/api/v2'
    const API_POKEMON_URL = `${API_URL}/pokemon/`;
    const API_GENERATION_URL = `${API_URL}/generation/`;

    if (nome == 'geração') {
        const buscaApiGeração = await fetch(API_GENERATION_URL + endpoint);
        const converteApiGeração = await buscaApiGeração.json();
        const consultaApiPokemon = await converteApiGeração.pokemon_species.map(async (pokemon) => {
            const teste = await fetch(API_POKEMON_URL + pokemon.name);
            return await teste.json();
        });
        let resultado = await Promise.all(consultaApiPokemon);
        return resultado;


    } else {
        const retornaPokemon = await fetch(API_POKEMON_URL + (endpoint || ""));
        const convertePokemon = await retornaPokemon.json();

        if (endpoint) {
            return convertePokemon;
        } else {
            const promises = await convertePokemon.results.map(async (pokemon) => {
                const verificaPokemon = await fetch(pokemon.url);
                return await verificaPokemon.json();
            });

            let resultadosConvertidos = await Promise.all(promises);
            return resultadosConvertidos;
        }
    }
}

export default getPokemons;