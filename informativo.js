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
    if (!texto) { gerar(); return; }
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
function trocarAba(aba) {
    document.getElementById('aba-dtq').style.display = 'none';
    document.getElementById('aba-ccm').style.display = 'none';

    if (aba === 'dtq') {
        document.getElementById('aba-dtq').style.display = 'block';
    } else {
        document.getElementById('aba-ccm').style.display = 'block';
    }

    document.getElementById('saida').textContent = '';
}
``

function gerarCCM() {

    const tipo = document.getElementById('tipoEquipamento').value || '-';
    const tag = document.getElementById('tag').value || '-';
    const ativo = document.getElementById('descricaoAtivo').value || '-';
    const falha = document.getElementById('falha').value || '-';
    const trem = document.getElementById('trem').value || '-';
    const trecho = document.getElementById('trecho').value || '-';
    const status = document.getElementById('statusAtual').value || '-';

    const dataHora = document.getElementById('dataHoraCCM').value;

   const dataFmt = document.getElementById('dataHoraCCM').value || '-';

    const zona = document.querySelector('input[name="zonaQuente"]:checked');
    const zonaQuente = zona ? zona.value : '-';

    const corSel = document.querySelector('input[name="corredor"]:checked');
    const corredor = corSel ? corSel.value : '-';

    const texto = [
    '🚨 *ALERTA CCM*',
    '',
    `🔧 *Tipo:* ${tipo}`,
    `🏷️ *TAG:* ${tag}`,
    `📦 *Ativo:* ${ativo}`,
    '',
    `⚠️ *Falha:* ${falha}`,
    '',
    `🚆 *Trem:* ${trem}`,
    `📍 *Trecho:* ${trecho}`,
    '',
    `🔥 *Zona quente:* ${zonaQuente}`,
    '',
    `⏱️ *Data/Hora:* ${dataFmt}`,
    '',
    `📊 *Status:* ${status}`,
    '',
    `🗺️ *Corredor:* ${corredor}`
].join('\n');
``

    document.getElementById('saida').textContent = texto;
    document.getElementById('status').textContent =
        `Atualizado às ${new Date().toLocaleTimeString()}`;
}

