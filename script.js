import listarPokemons from "./scripts/listarPokemons.js";

function iniciarBusca() {
    var nome = document.getElementById('nome-pokemon').value;
    return listarPokemons(nome);
}

listarPokemons();

const realizarBusca = document.getElementById('buscar-pokemon')
realizarBusca.addEventListener('click', iniciarBusca);



