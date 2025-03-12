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
        "N6071740": { "Total": 431 },
        "N6173067": { "Total": 1346 },
        "N6172207": { "Total": 1677 },
        "N6104793": { "Total": 959 },
        "N5931955": { "Total": 46 },
        "F204763": { "Total": 1845 }
    };

    let mediaEquipe = Object.values(dados).reduce((acc, curr) => acc + curr.Total, 0) / Object.keys(dados).length;
    let analista = dados[login];

    if (!analista) {
        alert("Matrícula não encontrada.");
        return;
    }

    tabelaDados.innerHTML = "";
    for (let key in analista) {
        let row = `<tr><td>${key}</td><td>${analista[key]}</td></tr>`;
        tabelaDados.innerHTML += row;
    }

    if (analista.Total > mediaEquipe) {
        analise.innerText = "Parabéns! Você está acima da média da equipe.";
        btnAjuda.classList.add("hidden");
    } else if (analista.Total < mediaEquipe) {
        analise.innerText = "Atenção! Você está abaixo da média. Foco nos seus indicadores!";
        btnAjuda.classList.remove("hidden");
    } else {
        analise.innerText = "Você está dentro da média da equipe.";
        btnAjuda.classList.add("hidden");
    }

    resultadoDiv.classList.remove("hidden");
}

function solicitarAjuda() {
    alert("Entraremos em contato para auxiliar na sua melhoria de desempenho.");
}
