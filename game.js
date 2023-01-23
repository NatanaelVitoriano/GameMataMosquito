var altura = 0;
var largura = 0;
var vidas = 1;
var placar = 0;
var scoreFinal = 0;
var urlParameters =  window.location.search.split('?')[1].split('&');
// var nivel = window.location.search && window.location.search != '' ? window.location.search.replace('?', '') : 'normal';
var nivel = urlParameters[0];
var nickname = urlParameters[1];
let niveis = { 'normal': 1500, 'dificil': 1000, 'chucknorris': 750 }
var criaMosquitoTempo = niveis[nivel];

function ajustaTamanhoTelaGame() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanhoTelaGame();

function pontuacao() {
    placar += 10;
    document.getElementById('pontuacao').innerHTML = placar;
    scoreFinal = document.getElementById('pontuacao').innerHTML;
}

function posicaoRandomica() {
   
    //remover o mosquito anterior (caso exista)
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove();

        if(vidas > 2){
            window.location.href = 'fim_de_jogo.html?' + urlParameters[1] + '&' + scoreFinal;
        } else {
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"
            vidas++;
        }
        
    }
    let posicaoX = Math.floor(Math.random() * largura) - 90;
    let posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;


    var mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosquito.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();


    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';

    mosquito.style.position = 'absolute';


    mosquito.id = 'mosquito';

    mosquito.onclick = function() {
        pontuacao();
        this.remove();
        mosquitoDie(this);
        setTimeout(() => {
            document.getElementById('mosquitoDie').remove();
        }, 1000);
    }

    document.body.appendChild(mosquito);

}

function mosquitoDie(mosquito) {
        var mosquitoDie = document.createElement('img');
        mosquitoDie.src = 'imagens/mosquito_die.png';
        mosquitoDie.className = mosquito.className;
        mosquitoDie.style.left = mosquito.style.left;
        mosquitoDie.style.top = mosquito.style.top;
        mosquitoDie.id = 'mosquitoDie';
        mosquitoDie.style.position = mosquito.style.position;
        document.body.appendChild(mosquitoDie);
}

function borboletaCreate() {

    var borboleta = document.createElement('img');
    borboleta.src = 'imagens/borboleta.gif';
    borboleta.className = tamanhoAleatorio() + ' ' + ladoAleatorio();

    let posicaoX = Math.floor(Math.random() * largura) - 90;
    let posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    borboleta.style.left = posicaoX + 'px';
    borboleta.style.top = posicaoY + 'px';

    borboleta.style.position = 'absolute';

    borboleta.id = 'borboleta';

    borboleta.onclick = function() {
        window.location.href = 'fim_de_jogo.html';
    }

    document.body.appendChild(borboleta);
}

function tamanhoAleatorio() {
    var classeMosquitoTamanho = Math.floor(Math.random() * 3) ;

    switch(classeMosquitoTamanho) {
        case 0:
            return 'tamanho1';
        case 1:
            return 'tamanho2';
        case 2:
            return 'tamanho3';
    }
}

function ladoAleatorio() {
    var classeMosquitoLadoTela = Math.floor(Math.random() * 2) ;

    switch(classeMosquitoLadoTela) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}