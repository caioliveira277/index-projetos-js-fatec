const campo_ano_nascimento = document.querySelector('#input-ano-nascimento');
const campo_sexo = document.querySelector('#select-sexo');
const formulario = document.querySelector('form');
const horario_identificacao = document.querySelector('#horario-identificacao');
const retorno = document.querySelector('#retorno');
const botao_fechar = document.querySelector('#botao_fechar');
const alerta = document.querySelector('#alerta');

const exibicao_sexo = document.querySelector('.sexo');
const exibicao_idade = document.querySelector('.idade');

const parametros = {
    masculino: {
        artigo: 'um',
        tipo: ['menino', 'homem', 'idoso']
    },
    feminino: {
        artigo: 'uma',
        tipo: ['menina', 'mulher', 'idosa']
    }
}

function resetar() {
    campo_ano_nascimento.value = '';
    campo_sexo.value = '';

    retorno.classList.remove('masculino', 'feminino', 'idoso', 'jovem', 'adulto');
}

function gerarHorario() {
    let data_atual = new Intl.DateTimeFormat('pt-br', {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
    }).format(new Date());

    horario_identificacao.textContent = data_atual
}

function validacao(idade, sexo) {
    let valido = false;
    let erro = '';
    alerta.classList.remove('show', 'erro_idade', 'erro_sexo');

    if(idade < 1 || idade > 120) {
        erro = 'erro_idade';
    } else if(sexo != 'masculino' && sexo != 'feminino') {
        erro = 'erro_sexo';
    } else {
        return true
    }

    alerta.classList.add('show', erro);
    return valido;
}

function gerarIdentificacao(idade, sexo) {
    //menino/menina 12 - 24 | homem/mulher 24 - 60 | idoso/idosa 60+
    let texto = parametros[sexo].artigo;
    let faixa_etaria = '';

    if(idade < 18) {
        texto += ` ${parametros[sexo].tipo[0]}`;
        faixa_etaria = 'jovem';
    } else if(idade >= 18 && idade <= 60) {
        texto += ` ${parametros[sexo].tipo[1]}`;
        faixa_etaria = 'adulto';
    } else if (idade >= 60) {
        texto += ` ${parametros[sexo].tipo[2]}`;
        faixa_etaria = 'idoso';
    }

    exibicao_sexo.textContent = texto;
    exibicao_idade.textContent = idade;

    retorno.classList.add(sexo);
    retorno.classList.add(faixa_etaria);
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    let idade = new Date().getFullYear() - Number(campo_ano_nascimento.value);
    let sexo = campo_sexo.value;

    if(!validacao(idade, sexo)) {
        return;
    }

    resetar();
    gerarHorario();
    gerarIdentificacao(idade, sexo);
});

botao_fechar.addEventListener('click', function() {
    resetar();
})