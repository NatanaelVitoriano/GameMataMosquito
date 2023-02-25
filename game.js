var criaMosquito;
var altura = 0;
var largura = 0;
var vidas = 1;
var placar = 0;
var scoreFinal = 0;
var urlParameters =  window.location.search.split('?')[1].split('&');
var nickname = urlParameters[0];
var criarMosquitoTempo = 1500;

function ajustarTamanhoTelaGame() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustarTamanhoTelaGame();

function aumentarDificuldade(tempo) {
    criarMosquitoTempo = tempo;
    clearInterval(criaMosquito);
    criaMosquito = setInterval(function () {
        if(document.getElementById('borboleta')) {
            document.getElementById('borboleta').remove();
        }
        let numeroAleatorio = Math.random();

        if(numeroAleatorio < 0.3) {
            criarBorboleta();
        } else {
            criarMosquito();
        }
    }, criarMosquitoTempo);
}

function atualizarPontucao() {
    debugger
    placar += 10;
    if(placar >= 100 && placar < 200){
        aumentarDificuldade(1000);
    } else if(placar >= 200  && placar < 300){
        aumentarDificuldade(750);
    }  else if(placar >= 300){
        aumentarDificuldade(500);
    }
    document.getElementById('pontuacao').innerHTML = placar;
    scoreFinal = document.getElementById('pontuacao').innerHTML;
}

function criarMosquito() {
   
    //remover o mosquito anterior (caso exista)
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove();

        if(vidas > 2){
            window.location.href = 'fim_de_jogo.html?' + urlParameters[0] + '&' + scoreFinal;
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
        atualizarPontucao();
        this.remove();
        eliminarMosquito(this);
        setTimeout(() => {
            document.getElementById('eliminarMosquito').remove();
        }, 1000);
    }

    document.body.appendChild(mosquito);

}

function eliminarMosquito(mosquito) {
        var eliminarMosquito = document.createElement('img');
        eliminarMosquito.src = 'imagens/mosquito_die.png';
        eliminarMosquito.className = mosquito.className;
        eliminarMosquito.style.left = mosquito.style.left;
        eliminarMosquito.style.top = mosquito.style.top;
        eliminarMosquito.id = 'eliminarMosquito';
        eliminarMosquito.style.position = mosquito.style.position;
        document.body.appendChild(eliminarMosquito);
}

function criarBorboleta() {
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove();
        
        if(vidas > 2){
            window.location.href = 'fim_de_jogo.html?' + urlParameters[0] + '&' + scoreFinal;
        } else {
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"
            vidas++;
        }
    }
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
        window.location.href = 'fim_de_jogo.html?' + urlParameters[0] + '&' + scoreFinal;
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