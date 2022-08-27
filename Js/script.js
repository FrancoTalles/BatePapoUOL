let nome = prompt("Qual é o seu nome?");
let CancelaTempo;
EntrarNaSala();
function EntrarNaSala(){
    let objnome = {name: nome};
    const envioNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objnome);
    envioNome.then(tratarSucessoNome);
    envioNome.catch(tratarErroNome);
    CancelaTempo = setInterval(StayOnline, 5000);
}

function tratarSucessoNome(resposta){
    console.log(resposta);
}

function tratarErroNome(resposta){
    nome = prompt("Nome já em uso! Digite outro nome:");
    EntrarNaSala();
}

function StayOnline(){
    let objnomeonline = {name: nome};
    const envioOnline = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objnomeonline);
    envioOnline.then(tratarSucessoOnline);
    envioOnline.catch(tratarErroOnline);
}

function tratarSucessoOnline(resposta){
    console.log(resposta);
}

function tratarErroOnline(resposta){
    console.log(resposta);
    clearInterval(CancelaTempo);
}