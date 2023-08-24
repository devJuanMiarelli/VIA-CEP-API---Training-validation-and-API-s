// by: Juan Miarelli

// var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/') // método fetch() é assíncrono, e tem como parâmetro obrigatório a URL da API.
// .then(resposta => resposta.json()) // then() é um "conversor", que irá transformar a resposta em JSON para facilitar a leitura e entendimento.
// .then(r => {
//     if(r.erro) {
//         throw Error('Esse CEP não existe!');
//     } else
//     console.log(r)})
// .catch(erro => console.log(erro)) // caso o retorno da fetch() tenha ocorrido algo de errado, ou seja, um erro. O método catch() "pega" este erro e faz o que vôce comandar ele a fazer.
// .finally(mensagem => console.log('Processamento concluído!')); // independente do resultado da requisição, o finally() sempre executará, trazendo quaisquer comando que você tenha feito a ele.

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaConvertida = await consultaCEP.json();
        
        if(consultaConvertida.erro) {
            throw Error('Esse CEP não existe!');
        } else 
            var cidade = document.getElementById('cidade');
            var logradouro = document.getElementById('endereco');
            var estado = document.getElementById('estado');
            var bairro = document.getElementById('bairro');

            cidade.value = consultaConvertida.localidade;
            logradouro.value = consultaConvertida.logradouro;
            estado.value = consultaConvertida.uf;
            bairro.value = consultaConvertida.bairro;

            console.log(consultaConvertida);

            return consultaConvertida;
    } catch(erro) {
        mensagemErro.innerHTML = `<p>O CEP digitado é inválido! Digite um CEP válido!</p>`;
        console.log(erro);
    }
}

// let ceps = ['01001000', '02866020'];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));

// Promise.all(conjuntoCeps).then(respostas => console.log(respostas)); *PROMISE.ALL()* -> serve para atender diversas requisições ao mesmo tempo. Trazendo diversas promises resolvidas.

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));