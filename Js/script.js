let nome = prompt("Qual é o seu nome?");
EntrarNaSala();
function EntrarNaSala(){
    let objnome = {name: nome};
    const envioNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objnome);
    envioNome.then(tratarSucessoNome);
    envioNome.catch(tratarErroNome);
}

function tratarSucessoNome(resposta){
    console.log(resposta);
}

function tratarErroNome(resposta){
    nome = prompt("Nome já em uso! Digite outro nome:");
    EntrarNaSala();
}

