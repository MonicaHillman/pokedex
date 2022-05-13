
import { getGeracao } from "./conexãoAPI.js";

function imprimePokemons(pokemons) {
    var elementoHTML = document.querySelector(".pokemon");
    var divNova = document.createElement("div");
    divNova.classList.add("card");
    divNova.innerHTML = `
    <img src=${pokemons.img}>
    <h2 class="card__titulo">${pokemons.nome}</h1>
    <ul class="card__lista-tipos">
        ${pokemons.tipo.map((tipos) =>
        `<li class="lista-tipos__item">${tipos.type.name}</li>`).join('')}
    </ul>
`;
    elementoHTML.appendChild(divNova);
}


async function listarPokemons(endpoint) {
    const pokemon = await getGeracao(endpoint.value);

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