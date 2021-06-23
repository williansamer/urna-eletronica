let seuVotoPara = document.querySelector(".d-1-1 span");
let cargo = document.querySelector(".d-1-2 span");
let numeros = document.querySelector(".d-1-3");
let descricao = document.querySelector(".d-1-4");
let lateral = document.querySelector(".d-1-right");
let aviso = document.querySelector(".d-2");

let numero = '';
let vBranco = false;
let etapaAtual = 0;
let votos = [];


function comecar(){
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';

    numero = '';
    vBranco = '';

    seuVotoPara.style.display ='none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    lateral.innerHTML = '';
    aviso.style.display ='none';

    for(let i=0; i < etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        } else{
            numeroHtml += '<div class="numero"></div>';
        }
    }
    numeros.innerHTML = numeroHtml;
}

function atualizaEtapa(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((politico)=>{
        if(politico.numero === numero){
            return true;
        }else{
            return false;
        }
        })
    
    if(candidato.length > 0){
        let fotosHtml = '';

        candidato = candidato[0];
        seuVotoPara.style.display ='block';
        aviso.style.display ='block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>
                                Partido: ${candidato.partido}`;

        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
            fotosHtml += `<div class="d-1-image small">
                        <img src="./assets/${candidato.fotos[i].url}" alt="">
                        ${candidato.fotos[i].legenda}
                        </div>`
            } else{
            fotosHtml += `<div class="d-1-image">
                        <img src="./assets/${candidato.fotos[i].url}" alt="">
                        ${candidato.fotos[i].legenda}
                        </div>`
            }
        }
        lateral.innerHTML = fotosHtml;
    } else{
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
}

function clicou(n){
    let elNumero = document.querySelector(".numero.pisca");
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
        elNumero.nextElementSibling.classList.add('pisca');
        } else{
            atualizaEtapa();
        }
    }
}

function branco(){
    vBranco = true;

    seuVotoPara.style.display ='block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
    aviso.style.display ='block';
}
function corrige(){
    comecar();
}
function confirma(){
    let votoConfirmado = false;
    let etapa = etapas[etapaAtual];

    if(numero.length === etapa.numeros){
        votoConfirmado = true;
        if(lateral.innerHTML !== ''){
            votos.push({'Etapa: ': etapa.titulo,
                        'Voto: ': numero});
        } else{
            votos.push({'Etapa: ': etapa.titulo,
                        'Voto: ': 'NULO'});
        }
    }else if(vBranco === true){
        votoConfirmado = true;
        votos.push({'Etapa: ': etapa.titulo,
                    'Voto: ': 'BRANCO'});
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecar();
        } else{
            console.log(votos);
            document.querySelector(".tela").innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
        }
    }
}

comecar();