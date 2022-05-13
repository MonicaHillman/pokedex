const API_URL = 'https://pokeapi.co/api/v2'
const API_POKEMON_URL = `${API_URL}/pokemon/`;
const API_GENERATION_URL = `${API_URL}/generation/`;

export async function getGeracao(endpoint) {

    const buscaApiGeração = await fetch(API_GENERATION_URL + endpoint);
    const converteApiGeração = await buscaApiGeração.json();
    let consultaApiPokemon;

    consultaApiPokemon = converteApiGeração.pokemon_species.map(async (pokemon) => {
        try {
            const r = await fetch(API_POKEMON_URL + pokemon.name)
            if (r.status == 404) throw new Error("erro")
            const json = await r.json();
            const res = {
                nome: json.name,
                img: json.sprites.front_default,
                tipo: json.types
            }
            return res;
        }
        catch (e) {
            const res = {
                nome: "não encontrado",
                img: "https://thecatapi.com/api/images/get?format=src&type=gif",
                tipo: [],
            }
            return res;
        };
    });




    const resultado = await Promise.all(consultaApiPokemon);

    return resultado;


}
export async function getPokemon(endpoint) {
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
