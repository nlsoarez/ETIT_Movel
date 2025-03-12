const dadosProdutividade = {
    "N6071740": { "Abertura RAL": 0, "RAL": 0, "REC": 0, "Remedy Móvel": 418, "TOA: 1ª Int.": 0, "NICE: Recebido": 1, "NICE: Atendido": 1, "NICE: Realizado": 11, "Total": 431 },
    "N6173067": { "Abertura RAL": 61, "RAL": 0, "REC": 0, "Remedy Móvel": 1260, "TOA: 1ª Int.": 3, "NICE: Recebido": 3, "NICE: Atendido": 3, "NICE: Realizado": 16, "Total": 1346 },
    "N6172207": { "Abertura RAL": 0, "RAL": 0, "REC": 0, "Remedy Móvel": 1671, "TOA: 1ª Int.": 4, "NICE: Recebido": 1, "NICE: Atendido": 1, "NICE: Realizado": 0, "Total": 1677 },
    "N6104793": { "Abertura RAL": 52, "RAL": 1, "REC": 0, "Remedy Móvel": 880, "TOA: 1ª Int.": 0, "NICE: Recebido": 2, "NICE: Atendido": 0, "NICE: Realizado": 24, "Total": 959 },
    "N5931955": { "Abertura RAL": 0, "RAL": 0, "REC": 0, "Remedy Móvel": 0, "TOA: 1ª Int.": 39, "NICE: Recebido": 0, "NICE: Atendido": 0, "NICE: Realizado": 7, "Total": 46 },
    "F204763": { "Abertura RAL": 0, "RAL": 0, "REC": 0, "Remedy Móvel": 1793, "TOA: 1ª Int.": 5, "NICE: Recebido": 10, "NICE: Atendido": 9, "NICE: Realizado": 28, "Total": 1845 }
};

function calcularMediaGeral() {
    let soma = 0;
    let totalAnalistas = Object.keys(dadosProdutividade).length;
    Object.values(dadosProdutividade).forEach(dados => {
        soma += dados["Total"];
    });
    return soma / totalAnalistas;
}

function buscarDados() {
    const login = document.getElementById("login").value;
    const resultadoDiv = document.getElementById("resultado");
    const tabelaDados = document.getElementById("tabelaDados");
    const analise = document.getElementById("analise");
    const btnAjuda = document.getElementById("btnAjuda");
    
    if (dadosProdutividade[login]) {
        const dados = dadosProdutividade[login];
        tabelaDados.innerHTML = "";
        
        Object.keys(dados).forEach(indicador => {
            const row = `<tr><td>${indicador}</td><td>${dados[indicador]}</td></tr>`;
            tabelaDados.innerHTML += row;
        });
        
        const mediaGeral = calcularMediaGeral();
        const diferenca = dados["Total"] - mediaGeral;
        
        if (diferenca >= 0) {
            analise.textContent = `Parabéns! Seu desempenho está dentro ou acima da média da equipe.`;
        } else {
            analise.textContent = `Você está abaixo da média da equipe. Fique atento aos seguintes pontos:`;
            const pontosFracos = [];
            
            Object.keys(dados).forEach(indicador => {
                if (indicador !== "Total" && dados[indicador] < mediaGeral / 8) {
                    pontosFracos.push(indicador);
                }
            });
            
            if (pontosFracos.length > 0) {
                analise.textContent += `
                 Você pode focar mais em: ${pontosFracos.join(", ")}.`;
            }
        }
        
        resultadoDiv.classList.remove("hidden");
        btnAjuda.classList.remove("hidden");
    } else {
        resultadoDiv.classList.add("hidden");
        btnAjuda.classList.add("hidden");
        alert("Login não encontrado!");
    }
}

function solicitarAjuda() {
    alert("Um supervisor será notificado para ajudá-lo a melhorar seu desempenho!");
}
