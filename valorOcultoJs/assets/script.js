const inputName = document.getElementById('userName');
const inputFichas = document.getElementById('fichas');
const userName = document.getElementById('name');
const chans = document.getElementById('chans');
const form = document.getElementById('form');
const select = document.getElementById('selectNivel');
const nivelI = document.getElementById('nivel')
const popUp = document.getElementById('popUpContainer')
const input = document.getElementById('input');
const restart = document.getElementById('exit')
const moreOne = document.getElementById('moreOne')
let valorOculto;
let chances;

function infoUser() {
    const inputName = document.getElementById('userName');
    const inputFichas = document.getElementById('fichas');
    const userName = document.getElementById('name');
    const chans = document.getElementById('chans');

    const avisoName = document.getElementById('avisoName');
    const avisoFicha = document.getElementById('avisoFicha');

    if (inputName.value === '') {
        avisoName.innerHTML = 'Digite um username válido*';
        return;
    } else if (inputFichas.value <= 0) {
        avisoFicha.innerHTML = 'Insira uma quantidade acima de 0 *';
        return;
    }

    chances = parseInt(inputFichas.value);

    chans.innerHTML = chances;
    userName.innerHTML = inputName.value;
    nivelI.innerHTML = select.value

    const infoUser = document.getElementById('infoUser').style.display = 'none';
    const game = document.getElementById('game').style.display = 'flex';

    const nivelSelecionado = select.value;

    
    input.value = '';
    input.focus();
    
    valorOculto = niveisUser(nivelSelecionado);
}

select.addEventListener('change', function () {
    const nivel = select.value;
    valorOculto = niveisUser(nivel);

});

function niveisUser(nivel) {
    if (nivel === 'Fácil') {
        return Math.floor(Math.random() * 51);
    } else if (nivel === 'Médio') {
        return Math.floor(Math.random() * 111);
    } else {
        return Math.floor(Math.random() * 301);
    }

}

// Adiciona a função de validação
function validateInput(input) {
    input.value = Math.abs(Math.floor(Number(input.value))) || 0;
    input.value = Math.min(input.value, 99);
}

function maisBtn() {
    const inputFichas = document.getElementById('fichas');
    const novoValor = Math.max(0, parseInt(inputFichas.value) + 1);
    inputFichas.value = novoValor;
    // Chama a função de validação após a alteração do valor
    validateInput(inputFichas);
}

function menosBtn() {
    const inputFichas = document.getElementById('fichas');
    const novoValor = Math.max(0, parseInt(inputFichas.value) - 1);
    inputFichas.value = novoValor;
    // Chama a função de validação após a alteração do valor
    validateInput(inputFichas);
}




form.addEventListener('submit', function (event) {
    event.preventDefault();

    const info = document.getElementById('info');
    const titleResult = document.getElementById('titleResult')
    const infoResult = document.getElementById('infoResult')
    let diferenca = Math.abs(valorOculto - input.value)
    let margem = 5


    if (input.value === '') {
        info.innerHTML = 'É necessário um valor';
        return;
    }

    if (chances > 0) {
        chances--;

        if (input.value == valorOculto && chances > 0) {
            popUp.style.display = 'flex'
            titleResult.innerHTML = 'Vitória'
            infoResult.innerHTML = `Parabéns! ${inputName.value} você acertou o valor oculto que era ${valorOculto}, e ainda te restam ${chances} chances para jogar novamente.`
            input.value = '';
            input.blur();
        } else if (input.value == valorOculto && chances == 0) {
            popUp.style.display = 'flex'
            titleResult.innerHTML = 'Vitória'
            infoResult.innerHTML = `Parabéns! ${inputName.value} você acertou o valor oculto que era ${valorOculto}, porém suas chances acabaram.`
            moreOne.style.display = 'none'
        } else if (chances == 0 && input.value != valorOculto) {
            popUp.style.display = 'flex'
            titleResult.innerHTML = 'Derrota'
            infoResult.innerHTML = `Infelizmente ${inputName.value} você perdeu, o valor oculto era ${valorOculto}.`
            moreOne.style.display = 'none'
        } else if (diferenca <= margem) {
            info.innerHTML = `${input.value} está muito PERTO do valor oculto!`;
            input.value = '';
            input.focus();
        } else if (input.value > valorOculto) {
            info.innerHTML = `O valor oculto é MENOR que ${input.value}`;
            input.value = '';
            input.focus();
        } else if (input.value < valorOculto) {
            info.innerHTML = `O valor oculto é MAIOR que ${input.value}`;
            input.value = '';
            input.focus();
        }

        chans.innerHTML = chances;

    }
});

function moreOneGame() {
    if (chances > 0) {
        const nivelSelecionado = select.value;
        valorOculto = niveisUser(nivelSelecionado);
        popUp.style.display = 'none';
        info.innerHTML = '';
        input.value = '';
        input.focus();
    }
}

function restartGame() {
    location.reload()
}


// Adiciona a função de validação ao evento oninput do inputFichas
inputFichas.addEventListener('input', function () {
    validateInput(this);
});
