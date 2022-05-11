import getPokemons from "./conexãoAPI.js";

function imprimePokemons(pokemons) {
    var elementoHTML = document.querySelector(".pokemon");
    var divNova = document.createElement("div");
    divNova.classList.add("card");
    divNova.innerHTML = `
    <img src=${pokemons.sprites.front_default}>
    <h2 class="card__titulo">${pokemons.name}</h1>
    <ul class="card__lista-tipos">
        ${pokemons.types.map((tipos) =>
        `<li class="lista-tipos__item">${tipos.type.name}</li>`).join('')}
    </ul>
`;
    elementoHTML.appendChild(divNova);
}


async function listarPokemons(nome, endpoint) {
    const pokemon = await getPokemons(nome, endpoint);

    if (pokemon.length) {
        document.querySelector(".pokemon").innerHTML = "";
        pokemon.map(itens => { imprimePokemons(itens); })
    }
    else {
        document.querySelector(".pokemon").innerHTML = "";
        imprimePokemons(pokemon);
    }
}

export default listarPokemons;