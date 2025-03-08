document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('upload-form').style.display = 'none';
            document.getElementById('consulta-form').style.display = 'block';
        } else {
            alert('Erro ao fazer upload do arquivo.');
        }
    });
});

document.getElementById('consulta-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const login = document.getElementById('login').value;
    fetch('process.php?login=' + login)
        .then(response => response.json())
        .then(data => {
            let resultado = '';
            data.forEach(row => {
                resultado += `<p>Outage: ${row.outage}, Tempo: ${row.tempo}, ETIT HFC: ${row.etitHFC}, ETIT GPON: ${row.etitGPON}</p>`;
            });
            document.getElementById('resultado').innerHTML = resultado || '<p>Nenhum resultado encontrado.</p>';
        });
});
