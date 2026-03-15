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