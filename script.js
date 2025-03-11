document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = e.target.result;
        processarPlanilha(data);
    };
    reader.readAsBinaryString(file);
});

function processarPlanilha(data) {
    // Aqui, adicionar a lógica para converter a planilha e armazenar os dados
    console.log("Planilha carregada:", data);
    alert("Planilha carregada com sucesso!");
}

// Inicialização dos gráficos (exemplo)
document.addEventListener('DOMContentLoaded', function() {
    criarGrafico("chartDPA", "DPA Mensal", [80, 85, 90, 92]);
    criarGrafico("chartChat", "Chat Mensal", [75, 78, 80, 85]);
    criarGrafico("chartAnalistaCertificado", "Analistas Certificados", [50, 55, 60, 65]);
});

function criarGrafico(id, titulo, dados) {
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr"],
            datasets: [{
                label: titulo,
                data: dados,
                backgroundColor: "rgba(54, 162, 235, 0.6)"
            }]
        }
    });
}
