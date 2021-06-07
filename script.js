let seuVotoPara = document.querySelector(".d-1-1 span");
//Variáveis de controle de interface
let cargo = document.querySelector(".d-1-2 span");
let numeros = document.querySelector(".d-1-3");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector(".d-1-right");

//Variáveis de controle de ambiente
let etapaAtual = 0;
let numero = "";//na medida em que vai digitando os números, irá aparecer aqui

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHtml = "";

    for(let i=0; i<etapa.numeros; i++){
        numeroHtml +=  '<div class="numero"></div>' ;
    }

    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = "none";
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){

}

function clicou(n){
    let elNumero = document.querySelector(".numero.pista");
    if (elNumero !== null){
        elNumero.innerHTML = n;
        numero = '${numero}${n}';
    }
}
function branco(){
    alert("Clicou em BRANCO!");
}
function corrige(){
    alert("Clicou em CORRIGE!");
}
function confirma(){
    alert("Clicou em CONFIRMA!");
}

comecarEtapa();