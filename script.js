// Armazena os dados localmente
let indicadores = JSON.parse(localStorage.getItem("indicadores")) || {};

// Função para salvar os dados manualmente inseridos
function salvarIndicador() {
    const indicador = document.getElementById('indicador').value;
    const mes = document.getElementById('mes').value;
    const valor = document.getElementById('valor').value;

    if (!valor) {
        alert("Por favor, insira um valor.");
        return;
    }

    if (!indicadores[indicador]) {
        indicadores[indicador] = {};
    }

    indicadores[indicador][mes] = parseInt(valor);

    localStorage.setItem("indicadores", JSON.stringify(indicadores));
    alert("Indicador salvo!");
    atualizarGraficos();
}

// Função para gerar gráficos
function atualizarGraficos() {
    const ctxDPA = document.getElementById('chartDPA').getContext('2d');
    criarGrafico(ctxDPA, "DPA", indicadores["DPA"] || {});

    const ctxChat = document.getElementById('chartChat').getContext('2d');
    criarGrafico(ctxChat, "Chat", indicadores["Chat"] || {});

    const ctxCert = document.getElementById('chartAnalistaCertificado').getContext('2d');
    criarGrafico(ctxCert, "Analista Certificado", indicadores["Analista Certificado"] || {});

    const ctxEmpresarial = document.getElementById('chartEmpresarial').getContext('2d');
    criarGrafico(ctxEmpresarial, "Empresarial", indicadores["ETIT RAL"] || {});

    const ctxMovel = document.getElementById('chartMovel').getContext('2d');
    criarGrafico(ctxMovel, "Móvel", indicadores["ETIT Pessoal"] || {});

    const ctxResidencial = document.getElementById('chartResidencial').getContext('2d');
    criarGrafico(ctxResidencial, "Residencial", indicadores["ETIT GPON"] || {});
}

// Função para criar gráfico
function criarGrafico(ctx, titulo, dados) {
    const labels = Object.keys(dados);
    const valores = Object.values(dados);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: titulo,
                data: valores,
                backgroundColor: "rgba(54, 162, 235, 0.6)"
            }]
        }
    });
}

// Atualiza os gráficos ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarGraficos);
