document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnAjuda").classList.add("hidden");
});

function buscarDados() {
    let login = document.getElementById("login").value.trim();
    let resultadoDiv = document.getElementById("resultado");
    let tabelaDados = document.getElementById("tabelaDados");
    let analise = document.getElementById("analise");
    let btnAjuda = document.getElementById("btnAjuda");

    if (!login) {
        alert("Por favor, digite uma matrícula válida.");
        return;
    }

    let dados = {
        "N6071740": { "Abertura RAL": 0, "RAL": 0, "REC": 0, "Remedy Móvel": 418, "TOA: 1ª Int.": 0, "NICE: Recebido": 1, "NICE: Atendido": 1, "NICE: Realizado": 11, "Total": 431 },
        "N6173067": { "Abertura RAL": 61, "RAL": 0, "REC": 0, "Remedy Móvel": 1260, "TOA: 1ª Int.": 3, "NICE: Recebido": 3, "NICE: Atendido": 3, "NICE: Realizado": 16, "Total": 1346 },
        "N6172207": { "Abertura RAL": 0, "RAL": 0, "REC": 0, "Remedy Móvel": 1671, "TOA: 1ª Int.": 4, "NICE: Recebido": 1, "NICE: Atendido": 1, "NICE: Realizado": 0, "Total": 1677 },
        "N6104793": { "Abertura RAL": 52, "RAL": 1, "REC": 0, "Remedy Móvel": 880, "TOA: 1ª Int.": 0, "NICE: Recebido": 2, "NICE: Atendido": 0, "NICE: Realizado": 24, "Total": 959 },
        "N5931955": { "Abertura RAL": 0, "RAL": 0, "REC": 0, "Remedy Móvel": 0, "TOA: 1ª Int.": 39, "NICE: Recebido": 0, "NICE: Atendido": 0, "NICE: Realizado": 7, "Total": 46 },
        "F204763": { "Abertura RAL": 0, "RAL": 0, "REC": 0, "Remedy Móvel": 1793, "TOA: 1ª Int.": 5, "NICE: Recebido": 10, "NICE: Atendido": 9, "NICE: Realizado": 28, "Total": 1845 }
    };

    let mediaEquipe = {};
    let totalAnalistas = Object.keys(dados).length;
    
    for (let key in dados[Object.keys(dados)[0]]) {
        mediaEquipe[key] = Object.values(dados).reduce((acc, curr) => acc + curr[key], 0) / totalAnalistas;
    }
    
    let analista = dados[login];
    if (!analista) {
        alert("Matrícula não encontrada.");
        return;
    }
    
    tabelaDados.innerHTML = "";
    let pontosFracos = [];
    let pontosFortes = [];
    
    for (let key in analista) {
        let row = `<tr><td>${key}</td><td>${analista[key]}</td></tr>`;
        tabelaDados.innerHTML += row;
        
        if (key !== "Total") {
            if (analista[key] < mediaEquipe[key]) {
                pontosFracos.push(key);
            } else if (analista[key] > mediaEquipe[key]) {
                pontosFortes.push(key);
            }
        }
    }
    
    if (analista.Total > mediaEquipe.Total) {
        analise.innerText = `Parabéns! Você está acima da média da equipe. Seus pontos fortes: ${pontosFortes.join(", " )}. Continue assim!`;
        btnAjuda.classList.add("hidden");
    } else if (analista.Total < mediaEquipe.Total) {
        analise.innerText = `Atenção! Você está abaixo da média. Pontos a melhorar: ${pontosFracos.join(", " )}. Foco nesses indicadores!`;
        btnAjuda.classList.remove("hidden");
    } else {
        analise.innerText = "Você está dentro da média da equipe. Continue monitorando seus indicadores!";
        btnAjuda.classList.add("hidden");
    }

    resultadoDiv.classList.remove("hidden");
}

function solicitarAjuda() {
    alert("Entraremos em contato para auxiliar na sua melhoria de desempenho.");
}
