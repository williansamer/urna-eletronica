let seuVotoPara = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let numeros = document.querySelector(".d-1-3");
let descricao = document.querySelector(".d-1-4");
let aviso = document.querySelector(".d-2");
let lateral = document.querySelector(".d-1-right");

let etapaAtual = 0;
let numero = "";
let votoBranco = false;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHtml = "";
    numero = "";
    votoBranco = false;

    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = "none";
    lateral.innerHTML = "";

    for(let i = 0; i < etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        } else{
            numeroHtml += '<div class="numero"></div>';
        }
    }

    numeros.innerHTML = numeroHtml;
}

function atualizarEtapa(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((politico) => {
        if(politico.numero === numero){
            return true;
        }else{
            return false;
        }
    })

    if(candidato.length > 0){
        candidato = candidato[0];
        let fotosHtml = "";
        
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;

        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small">
                <img src="./assets/${candidato.fotos[i].url}" alt="">
                ${candidato.fotos[i].legenda}</div>`
            }else{
                fotosHtml += `<div class="d-1-image">
                <img src="./assets/${candidato.fotos[i].url}" alt="">
                ${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHtml;
    } else{
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

function clicou(n){
    let elNumero = document.querySelector(".numero.pisca");

    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove("pisca");
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add("pisca");
        } else{
            atualizarEtapa();
        }
    }
}

function branco(){
    votoBranco = true;
    if(votoBranco){
        seuVotoPara.style.display = "none";
        aviso.style.display = "none";
        numeros.innerHTML = "";
        lateral.innerHTML = "";
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    }

}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let votoConfirmado = false;
    let etapa = etapas[etapaAtual];

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapa.titulo,
            voto: "Branco"});
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapa.titulo,
            voto: numero});
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else{
            console.log(votos);
            document.querySelector(".tela").innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
        }
    }
}

comecarEtapa();