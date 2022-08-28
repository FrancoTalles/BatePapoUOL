let nome = prompt("Qual é o seu nome?");
let CancelaTempo;
let MensagensCarrega;
let Mensagem;
EntrarNaSala();
function EntrarNaSala(){
    let objnome = {name: nome};
    const envioNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objnome);
    envioNome.then(tratarSucessoNome);
    envioNome.catch(tratarErroNome);
    CancelaTempo = setInterval(StayOnline, 5000);
    MensagensCarrega = setInterval(ListaMensagens, 3000);
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
    clearInterval(MensagensCarrega);
}

function ListaMensagens(){
    const mensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    mensagens.then(processaSucessoResposta);
    mensagens.catch(processaErroResposta);
    
}

function processaSucessoResposta(resposta){
    let ul = document.querySelector(".mensagens");
    for (let i =0; i < resposta.data.length; i++){
        if (resposta.data[i].type === "status"){
            ul.innerHTML += 
            `<li class="status">
                <span class="horario">(${resposta.data[i].time})</span>
                <span class="nome">${resposta.data[i].from}</span> ${resposta.data[i].text}
            </li>`;
            const elementoQueQueroQueApareca = document.querySelector('.status:last-child');
            elementoQueQueroQueApareca.scrollIntoView();
        }else if (resposta.data[i].type === "message"){
            ul.innerHTML += 
            `<li class="mensagem">
                <span class="horario">(${resposta.data[i].time})</span>
                <span class="nome">${resposta.data[i].from}</span> para <span class="nome">${resposta.data[i].to}:</span> ${resposta.data[i].text}
            </li>`;
            const elementoQueQueroQueApareca = document.querySelector('.mensagem:last-child');
            elementoQueQueroQueApareca.scrollIntoView();
        }else if (resposta.data[i].type === "private_message" && resposta.data[i].to === nome){
             ul.innerHTML += 
             `<li class="privada">
                 <span class="horario">(${resposta.data[i].time})</span>
                 <span class="nome">${resposta.data[i].from}</span> reservadamente para <span class="nome">${resposta.data[i].to}:</span> ${resposta.data[i].text}
             </li>`;
            const elementoQueQueroQueApareca = document.querySelector('.privada:last-child');
            elementoQueQueroQueApareca.scrollIntoView();
        }
    }

}

function processaErroResposta(resposta){
    console.log(resposta);
    console.log("Deu erro");
    window.location.reload();
}

function FazerMensagem(){
    let input = document.querySelector(".inputMensagem");
    Mensagem = input.value;
    console.log(Mensagem);
    EnviarMensagem();
    input.value = "";
    
}

function EnviarMensagem(){
    let ObjMensagem = {from: nome, to: "Todos", text: Mensagem, type: "message"}
    const requisicaoMensagem = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", ObjMensagem);
    requisicaoMensagem.then(ProcessaSucessoEnvioMensagem);
    requisicaoMensagem.catch(ProcessaErroEnvioMensagem);
}

function ProcessaSucessoEnvioMensagem(resposta){
    console.log(resposta);
    console.log("Deu certo");
}

function ProcessaErroEnvioMensagem(resposta){
    console.log(resposta);
    console.log("Deu erro");
    window.location.reload();
}