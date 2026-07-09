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

// Exibe o texto gerado no balão estilo WhatsApp + timestamp
function mostrarPreview(texto) {
    document.getElementById('saida').textContent = texto;
    document.getElementById('wa-empty').style.display = 'none';
    document.getElementById('wa-bubble').style.display = 'block';

    const now = new Date();
    document.getElementById('wa-time').textContent =
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('status').textContent = `Atualizado às ${now.toLocaleTimeString()}`;
}

function limparPreview() {
    document.getElementById('saida').textContent = '';
    document.getElementById('wa-bubble').style.display = 'none';
    document.getElementById('wa-empty').style.display = 'block';
    document.getElementById('status').textContent = '';
}

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

    mostrarPreview(texto);
}

async function copiar() {
    const texto = document.getElementById('saida').textContent;
    if (!texto) return;
    await navigator.clipboard.writeText(texto);

    const status = document.getElementById('status');
    status.textContent = "✅ Texto copiado!";
    setTimeout(() => { status.textContent = ""; }, 2000);
}

// Limpa todos os campos da aba informada e reseta o preview
function limparFormulario(secaoId) {
    const secao = document.getElementById(secaoId);

    secao.querySelectorAll('input[type="text"], input[type="number"], input[type="datetime-local"], textarea').forEach(el => {
        el.value = '';
    });
    secao.querySelectorAll('input[type="radio"]').forEach(el => {
        el.checked = false;
    });

    if (secaoId === 'aba-dtq') {
        document.getElementById('titulo').value = '*Alarme de Trilho Quebrado*';
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        document.getElementById('dataHora').value = now.toISOString().slice(0, 16);
    }

    if (secaoId === 'aba-info') {
        document.querySelector('input[name="info-estagio"][value="informativo"]').checked = true;
        trocarEstagioInfo('informativo');
        document.getElementById('info-num-atualizacao').value = 1;
    }

    limparPreview();
}

// troca de abas
// troca de abas atualizada
function trocarAba(aba) {
    document.getElementById('aba-dtq').style.display = 'none';
    document.getElementById('aba-ccm').style.display = 'none';
    document.getElementById('aba-info').style.display = 'none';

    document.getElementById('tab-dtq').classList.remove('active');
    document.getElementById('tab-ccm').classList.remove('active');
    document.getElementById('tab-info').classList.remove('active');

    if (aba === 'dtq') {
        document.getElementById('aba-dtq').style.display = 'block';
        document.getElementById('tab-dtq').classList.add('active');
    } else if (aba === 'ccm') {
        document.getElementById('aba-ccm').style.display = 'block';
        document.getElementById('tab-ccm').classList.add('active');
    } else if (aba === 'info') {
        document.getElementById('aba-info').style.display = 'block';
        document.getElementById('tab-info').classList.add('active');
    }

    limparPreview();
}
function trocarEstagioInfo(estagio) {
    document.getElementById('info-bloco-informativo').style.display = 'none';
    document.getElementById('info-bloco-atualizacao').style.display = 'none';
    document.getElementById('info-bloco-encerramento').style.display = 'none';

    if (estagio === 'informativo') {
        document.getElementById('info-bloco-informativo').style.display = 'block';
    } else if (estagio === 'atualizacao') {
        document.getElementById('info-bloco-atualizacao').style.display = 'block';
    } else if (estagio === 'encerramento') {
        document.getElementById('info-bloco-encerramento').style.display = 'block';
    }
}

function reiniciarNumeracaoInfo() {
    document.getElementById('info-num-atualizacao').value = 1;
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

    mostrarPreview(texto);
}


// Gerador Informativo (Informativo / Atualização / Encerramento)
function ordinalFeminino(n) {
    return `${n}ª`;
}

function gerarInformativo() {
    const local = document.getElementById('info-local').value || '-';
    const estagio = document.querySelector('input[name="info-estagio"]:checked').value;

    let texto = '';

    if (estagio === 'informativo') {
        const ativo = document.getElementById('info-ativo').value || '-';
        const descricao = document.getElementById('info-descricao').value || '-';
        const horario = document.getElementById('info-horario').value || '-';
        const impacto = document.getElementById('info-impacto').value || '-';
        const acionamentos = document.getElementById('info-acionamentos').value || '-';
        const previsao = document.getElementById('info-previsao').value || '-';

        texto = [
            `⚠️ INFORMATIVO (${local}) ⚠️`,
            ``,
            `Ativo: ${ativo}`,
            `Descrição da falha: ${descricao}`,
            `Horário: ${horario}`,
            `Impacto: ${impacto}`,
            `Acionamentos realizados: ${acionamentos}`,
            `Previsão de atendimento: ${previsao}`
        ].join('\n');

    } else if (estagio === 'atualizacao') {
        const numInput = document.getElementById('info-num-atualizacao');
        const numero = parseInt(numInput.value, 10) || 1;
        const tecHorario = document.getElementById('info-tec-horario').value || '-';
        const tecnico = document.getElementById('info-tecnico').value || '-';
        const acao = document.getElementById('info-acao').value || '-';
        const previsaoNorm = document.getElementById('info-previsao-normalizacao').value || '-';

        texto = [
            `⚠️ ${ordinalFeminino(numero)} ATUALIZAÇÃO (${local}) ⚠️`,
            ``,
            `Horário que o técnico chegou no local: ${tecHorario}`,
            `Técnico realizando atendimento: ${tecnico}`,
            `Ação realizada até o momento: ${acao}`,
            `Previsão de normalização: ${previsaoNorm}`
        ].join('\n');

        // Auto-incrementa para a próxima atualização
        numInput.value = numero + 1;

    } else if (estagio === 'encerramento') {
        const diagnostico = document.getElementById('info-diagnostico').value || '-';
        const atividade = document.getElementById('info-atividade').value || '-';
        const impacto = document.getElementById('info-impacto-enc').value || '-';
        const finalizacao = document.getElementById('info-finalizacao').value || '-';

        texto = [
            `✅ ENCERRAMENTO DO EVENTO (${local}) ✅`,
            ``,
            `Diagnóstico: ${diagnostico}`,
            `Atividade executada: ${atividade}`,
            `Impacto: ${impacto}`,
            `Finalização do evento: ${finalizacao}`
        ].join('\n');
    }

    mostrarPreview(texto);
}
