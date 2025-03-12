document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get("id");

    if (usuarioId) {
        listarAgendamentosDoUsuario(usuarioId);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get("id");

    if (usuarioId) {
        listarAgendamentosDoUsuario(usuarioId);
    }
});

function listarAgendamentosDoUsuario(usuarioId) {
    fetch(`http://localhost:8080/agenda/usuario/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na resposta da API: ${response.status}`);
            }
            return response.json();
        })
        .then(agendas => {

            const tbody = document.querySelector("#agendamentos-table-body");
            tbody.innerHTML = ""; // Limpar a tabela antes de adicionar os novos dados

            if (agendas.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center">Nenhuma agenda encontrada.</td></tr>';
                return;
            }

            // Ordenando os agendamentos pela situação
            agendas.sort((a, b) => {
                const situacaoOrd = {
                    "AGENDADO": 0,
                    "REALIZADO": 1,
                    "CANCELADO": 2
                };

                return situacaoOrd[a.situacao] - situacaoOrd[b.situacao];
            });

            // Adicionando os agendamentos à tabela
            agendas.forEach(agenda => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${agenda.usuarioNome}</td>
                    <td>${agenda.data}</td>
                    <td>${agenda.hora}</td>
                    <td>${agenda.situacao}</td>
                    <td>${agenda.vacinaTitulo}</td>
                    <td>${agenda.vacinaDoses}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao listar agendas:', error);
            alert('Erro ao carregar as agendas. Por favor, tente novamente.');
        });
}

