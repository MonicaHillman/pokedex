async function getPokemons(nome, endpoint) {
    const API_URL = 'https://pokeapi.co/api/v2'
    const API_POKEMON_URL = `${API_URL}/pokemon/`;
    const API_GENERATION_URL = `${API_URL}/generation/`;

    if (nome == 'geração') {

        const buscaApiGeração = await fetch(API_GENERATION_URL + endpoint);
        const converteApiGeração = await buscaApiGeração.json();
        const consultaApiPokemon = await converteApiGeração.pokemon_species.map(async (pokemon) => {
            try {
                const teste = await fetch(API_POKEMON_URL + pokemon.name);

                if (teste.status == 404) {
                    throw new Error(`${pokemon.name} não encontrado`);
                }
                return await teste.json();
            } catch (err) {
                console.log(err);
            }

        });
        let resultado = await Promise.all(consultaApiPokemon);
        return resultado;


    } else {
        try {
            const retornaPokemon = await fetch(API_POKEMON_URL + (endpoint || ""));
            var convertePokemon = await retornaPokemon.json();
        } catch {
            console.log("Não existe pokemons com esse nome!");
        }

        if (endpoint) {
            return convertePokemon;
        } else {
            const promises = await convertePokemon.results.map(async (pokemon) => {
                const verificaPokemon = await fetch(pokemon.url);
                try {
                    return await verificaPokemon.json();
                }
                catch (err) {
                    console.log("erro no carregamento dos pokemons!");
                }
            });

            let resultadosConvertidos = await Promise.all(promises);
            return resultadosConvertidos;
        }
    }
}

export default getPokemons;