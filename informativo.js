// Alternância de Tema
const themeBtn = document.getElementById('theme-toggle');
if (localStorage.getItem('vli-theme') === 'light') {
    document.body.classList.add('light-mode');
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('vli-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Inicialização da Data
window.onload = () => {
    const input = document.getElementById('dataHora');
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    input.value = now.toISOString().slice(0, 16);
};

function gerar() {
    const titulo = document.getElementById('titulo').value;
    const local = document.getElementById('local').value || '-';
    const dataHora = document.getElementById('dataHora').value;
    const resistencia = document.getElementById('resistencia').value;
    const situacao = document.getElementById('situacao').value || '-';
    const previsao = document.getElementById('previsao').value || '-';

    let dataFmt = '-';
    if (dataHora) {
        const d = new Date(dataHora);
        dataFmt = d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    const texto = [
        `🚧 ${titulo}`,
        `📍 *Local:* ${local}`,
        `⏱️ *Data/Hora:* ${dataFmt}`,
        `⚡ *Resistência:* ${resistencia ? `${resistencia} mΩ` : '-'}`,
        `🛠️ *Situação:* ${situacao}`,
        `✅ *Previsão de Atendimento:* ${previsao}`
    ].join('\n');

    document.getElementById('saida').textContent = texto;
    document.getElementById('status').textContent = `Atualizado às ${new Date().toLocaleTimeString()}`;
}

async function copiar() {
    const texto = document.getElementById('saida').textContent;
    if (!texto) return;
    await navigator.clipboard.writeText(texto);

    const status = document.getElementById('status');
    status.textContent = "✅ Texto copiado!";
    setTimeout(() => { status.textContent = ""; }, 2000);
}

function limpar() {
    ['local', 'resistencia', 'situacao', 'previsao'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('saida').textContent = '';
}

// troca de abas
// troca de abas atualizada
function trocarAba(aba) {
    document.getElementById('aba-dtq').style.display = 'none';
    document.getElementById('aba-ccm').style.display = 'none';
    document.getElementById('aba-pt').style.display = 'none';

    document.getElementById('tab-dtq').classList.remove('active');
    document.getElementById('tab-ccm').classList.remove('active');
    document.getElementById('tab-pt').classList.remove('active');

    if (aba === 'dtq') {
        document.getElementById('aba-dtq').style.display = 'block';
        document.getElementById('tab-dtq').classList.add('active');
    } else if (aba === 'ccm') {
        document.getElementById('aba-ccm').style.display = 'block';
        document.getElementById('tab-ccm').classList.add('active');
    } else if (aba === 'pt') {
        document.getElementById('aba-pt').style.display = 'block';
        document.getElementById('tab-pt').classList.add('active');
    }

    document.getElementById('saida').textContent = '';
}

function gerarCCM() {

    const tipo = document.getElementById('tipoEquipamento').value || '-';
    const tag = document.getElementById('tag').value || '-';
    const ativo = document.getElementById('descricaoAtivo').value || '-';
    const falha = document.getElementById('relatoFalha').value || '-';
    const trem = document.getElementById('trem').value || '-';
    const trecho = document.getElementById('trecho').value || '-';
    const status = document.getElementById('statusAtual').value || '-';

    const dataFmt = document.getElementById('dataHoraCCM').value || '-';

    const zona = document.querySelector('input[name="zonaQuente"]:checked');
    const zonaQuente = zona ? zona.value : '-';

    const corSel = document.querySelector('input[name="corredor"]:checked');
    const corredor = corSel ? corSel.value : '-';

    const texto = [
    '🚨 *ALERTA CCM*',
    `🔥 *ZONA QUENTE:* ${zonaQuente}`,
    '',
    `🔧 *TIPO DE EQUIPAMENTO:* ${tipo}`,
    `🏷️ *TAG:* ${tag}`,
    `📦 *DESCRIÇÃO DO EQUIPAMENTO:* ${ativo}`,
    `⚠️ *RELATO DA FALHA:* ${falha}`,
    `📍 *TRECHO:* ${trecho}`,
    `🚆 *TREM:* ${trem}`,
    `⏱️ *DATA/HORA:* ${dataFmt}`,
    '',
    `📊 *STATUS ATUAL:* ${status}`,
    `🗺️ *Corredor:* ${corredor}`
].join('\n');

    document.getElementById('saida').textContent = texto;
    document.getElementById('status').textContent =
        `Atualizado às ${new Date().toLocaleTimeString()}`;
}


// Gerador Passagem de Turno
function gerarPT() {
    // Helper para capturar radio buttons
    const getRadio = (name) => {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : 'Não informado';
    };

    const plantonista = document.getElementById('pt-plantonista').value || '-';
    const turno = getRadio('pt-turno');
    
    const safTratou = getRadio('pt-saf');
    const safPend = document.getElementById('pt-saf-pend').value || 'SEM PENDÊNCIAS';
    
    const mdwTratou = getRadio('pt-mdw');
    const mdwPend = document.getElementById('pt-mdw-pend').value || '-';
    
    const dtqTratou = getRadio('pt-dtq');
    const dtqPend = document.getElementById('pt-dtq-pend').value || 'NÃO TEVE';
    
    const telTratou = getRadio('pt-telecom');
    const telUltimo = document.getElementById('pt-telecom-ultimo').value || '-';
    const telPend = document.getElementById('pt-telecom-pend').value || 'SEM PENDÊNCIAS';

    const acionamentos = document.getElementById('pt-acionamentos').value || '-';
    const acionamentosAnd = document.getElementById('pt-acionamentos-andamento').value || '-';
    
    const atencao = document.getElementById('pt-atencao').value || '-';

    const notSaf = getRadio('pt-not-saf');
    const notWpp = getRadio('pt-not-wpp');
    const notEletro = getRadio('pt-not-eletro');
    const tagEletro = document.getElementById('pt-tag-eletro').value || '-';

    const texto = [
        `📋 *PASSAGEM DE TURNO CCM*`,
        ``,
        `👤 *Dados do Plantonista*`,
        `*Plantonista:* ${plantonista}`,
        `*Turno:* ${turno}`,
        ``,
        `📊 *Registros do SAF*`,
        `Tratou todos? ${safTratou}`,
        `Pendências: ${safPend}`,
        ``,
        `📡 *Alarmes de Disponibilidade MDW*`,
        `Tratou todos? ${mdwTratou}`,
        `Pendências / Último: ${mdwPend}`,
        ``,
        `🚧 *Alarmes DTQ e DDC*`,
        `Tratados? ${dtqTratou}`,
        `Pendências / Último: ${dtqPend}`,
        ``,
        `📞 *Alarmes Telecom*`,
        `Tratados? ${telTratou}`,
        `Último alarme (>1h): ${telUltimo}`,
        `Pendências: ${telPend}`,
        ``,
        `🔧 *Acionamentos e Atividades*`,
        `Realizados: ${acionamentos}`,
        `Em andamento: ${acionamentosAnd}`,
        ``,
        `⚠️ *Pontos de Atenção / Instruções*`,
        `${atencao}`,
        ``,
        `✅ *Notificações*`,
        `E-mail SAF enviadas? ${notSaf}`,
        `WhatsApp enviadas? ${notWpp}`,
        `App Eletro encerrados? ${notEletro}`,
        `Tag último encerramento: ${tagEletro}`
    ].join('\n');

    document.getElementById('saida').textContent = texto;
    document.getElementById('status').textContent = `Atualizado às ${new Date().toLocaleTimeString()}`;
}
