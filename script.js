import listarPokemons from "./scripts/listarPokemons.js";

function iniciarBusca() {
    var nome = document.getElementById('nome-pokemon').value;
    return listarPokemons(nome);
}

function filtroGeração(botao) {
    const botoes = [
        { name: 'botao-1g', value: '1' },
        { name: 'botao-2g', value: '2' },
        { name: 'botao-3g', value: '3' },
        { name: 'botao-4g', value: '4' },
        { name: 'botao-5g', value: '5' },
        { name: 'botao-6g', value: '6' },
        { name: 'botao-7g', value: '7' },
        { name: 'botao-8g', value: '8' }
    ];

    const geração = botoes.find(bt => bt.name == botao);
    return listarPokemons(geração)
}

listarPokemons({ name: 'botao-1g', value: '1' });

const realizarBusca = document.getElementById('buscar-pokemon')
realizarBusca.addEventListener('click', iniciarBusca);

var buttons = document.getElementsByTagName("button");
var buttonsCount = buttons.length;
for (var i = 0; i <= buttonsCount; i += 1) {
    buttons[i].onclick = function (e) {
        filtroGeração(this.id);
    };
}


