document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('#agendas-table-body')) {
        listarAgendas();
    } else if (document.querySelector("form")) {
        document.querySelector("form").addEventListener("submit", event => {
            event.preventDefault();
            cadastrarAgenda();
        });
    }
});

function listarAgendas() {
    fetch('http://localhost:8080/agenda')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na resposta da API: ${response.status}`);
            }
            return response.json();
        })
        .then(agendas => {
            // Ordenando as agendas pela situação (primeiro AGENDADO, depois REALIZADO, por fim CANCELADO)
            const situacaoOrder = {
                'AGENDADO': 1,
                'REALIZADO': 2,
                'CANCELADO': 3
            };

            agendas.sort((a, b) => {
                const situacaoDiff = situacaoOrder[a.situacao] - situacaoOrder[b.situacao];

                // Se as situações forem iguais, ordena pela data
                if (situacaoDiff === 0) {
                    return new Date(a.data) - new Date(b.data);
                }

                return situacaoDiff;
            });

            const tbody = document.querySelector('#agendas-table-body');
            tbody.innerHTML = '';

            if (agendas.length === 0) {
                tbody.innerHTML = '<tr><td colspan="10" class="text-center">Nenhuma agenda encontrada.</td></tr>';
                return;
            }

            agendas.forEach(agenda => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${agenda.usuarioNome}</td>
                    <td>${agenda.situacao}</td>
                    <td>${agenda.data}</td>
                    <td>${agenda.hora}</td>
                    <td>${agenda.observacoes || 'N/A'}</td>
                    <td>${agenda.vacinaTitulo}</td>
                    <td>${agenda.vacinaDoses}</td>
                    <td>${agenda.usuarioCidade}</td>
                    <td>${agenda.usuarioUf}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="excluirAgenda(${agenda.id})">Excluir</button>
                        <button class="btn btn-success btn-sm" onclick="darBaixa(${agenda.id})">Realizar</button>
                        <button class="btn btn-secondary btn-sm" onclick="cancelarAgenda(${agenda.id})">Cancelar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao listar agendas:', error);
            alert('Erro ao carregar agendas. Por favor, tente novamente.');
        });
}


function cancelarAgenda(id) {
    const confirmarCancelamento = confirm(`Deseja cancelar a agenda com ID ${id}?`);

    if (confirmarCancelamento) {
        fetch(`http://localhost:8080/agenda/${id}/cancelar`, {
            method: 'PUT', // Usando o método PATCH para atualizar parcialmente
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao cancelar a agenda');
                }
                console.log(`Agenda com ID ${id} cancelada.`);
                alert(`Agenda com ID ${id} cancelada!`);
                listarAgendas();  // Atualiza a lista após cancelamento
            })
            .catch(error => {
                console.error('Erro ao cancelar a agenda:', error);
                alert('Erro ao cancelar a agenda. Tente novamente.');
            });
    }
}

function darBaixa(id) {
    const confirmarBaixa = confirm(`Deseja marcar a agenda com ID ${id} como REALIZADO?`);

    if (confirmarBaixa) {
        fetch(`http://localhost:8080/agenda/${id}/realizar`, {
            method: 'PUT', // Usando o método PATCH para atualizar parcialmente
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao dar baixa na agenda');
                }
                console.log(`Agenda com ID ${id} marcada como REALIZADO.`);
                alert(`Agenda com ID ${id} marcada como REALIZADO!`);
                listarAgendas();  // Atualiza a lista após dar baixa
            })
            .catch(error => {
                console.error('Erro ao dar baixa na agenda:', error);
                alert('Erro ao realizar a agenda. Tente novamente.');
            });
    }
}

function listarAgendasRealizadas() {
    fetch('http://localhost:8080/agenda')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na resposta da API: ${response.status}`);
            }
            return response.json();
        })
        .then(agendas => {
            // Filtra as agendas com a situação "REALIZADO"
            const agendasRealizadas = agendas.filter(agenda => agenda.situacao.toUpperCase() === "REALIZADO");

            const tbody = document.querySelector('#agendas-table-body');
            tbody.innerHTML = '';

            if (agendasRealizadas.length === 0) {
                tbody.innerHTML = `<tr><td colspan="9" class="text-center">Nenhuma agenda realizada encontrada.</td></tr>`;
                return;
            }

            agendasRealizadas.forEach(agenda => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${agenda.situacao}</td>
                    <td>${agenda.data}</td>
                    <td>${agenda.hora}</td>
                    <td>${agenda.observacoes}</td>
                    <td>${agenda.vacinaTitulo}</td>
                    <td>${agenda.vacinaDoses}</td>
                    <td>${agenda.usuarioNome}</td>
                    <td>${agenda.usuarioCidade}</td>
                    <td>${agenda.usuarioUf}</td>
                    <td>
                         <button class="btn btn-danger btn-sm" onclick="excluirAgenda(${agenda.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao listar agendas realizadas:', error);
            alert('Erro ao carregar agendas realizadas. Por favor, tente novamente.');
        });
}


function listarAgendasCanceladas() {
    fetch('http://localhost:8080/agenda')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na resposta da API: ${response.status}`);
            }
            return response.json();
        })
        .then(agendas => {
            // Filtra as agendas com a situação "REALIZADO"
            const agendasRealizadas = agendas.filter(agenda => agenda.situacao.toUpperCase() === "CANCELADO");

            const tbody = document.querySelector('#agendas-table-body');
            tbody.innerHTML = '';

            if (agendasRealizadas.length === 0) {
                tbody.innerHTML = `<tr><td colspan="9" class="text-center">Nenhuma agenda realizada encontrada.</td></tr>`;
                return;
            }

            agendasRealizadas.forEach(agenda => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${agenda.situacao}</td>
                    <td>${agenda.data}</td>
                    <td>${agenda.hora}</td>
                    <td>${agenda.observacoes}</td>
                    <td>${agenda.vacinaTitulo}</td>
                    <td>${agenda.vacinaDoses}</td>
                    <td>${agenda.usuarioNome}</td>
                    <td>${agenda.usuarioCidade}</td>
                    <td>${agenda.usuarioUf}</td>
                    <td>
                         <button class="btn btn-danger btn-sm" onclick="excluirAgenda(${agenda.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao listar agendas realizadas:', error);
            alert('Erro ao carregar agendas realizadas. Por favor, tente novamente.');
        });
}


function cadastrarAgenda() {
    const agenda = {
        data: document.querySelector('#data').value,
        hora: document.querySelector('#hora').value,
        situacao: document.querySelector('#situacao').value,
        dataSituacao: document.querySelector('#dataSituacao').value,
        observacoes: document.querySelector('#observacoes').value,
        usuarioId: document.querySelector('#usuarioId').value,
        vacinaId: document.querySelector('#vacinaId').value,
    };

    fetch('http://localhost:8080/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agenda),
    })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao cadastrar agenda');
            alert('Agenda cadastrada com sucesso!');
            window.location.href = '/pages/agenda.jsp';
        })
        .catch(error => console.error('Erro ao cadastrar agenda:', error));
}

function excluirAgenda(id) {
    if (confirm(`Deseja excluir a agenda com ID ${id}?`)) {
        fetch(`http://localhost:8080/agenda/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao excluir agenda');
                alert(`Agenda com ID ${id} excluída com sucesso!`);
                listarAgendas();
            })
            .catch(error => console.error('Erro ao excluir agenda:', error));
    }
}

function buscarAgendaPorSituacao() {
    const situacao = document.querySelector('#search-situacao').value.trim().toLowerCase();

    fetch('http://localhost:8080/agenda')
        .then(response => response.json())
        .then(agendas => {
            const resultados = agendas.filter(agenda => agenda.situacao.toLowerCase().includes(situacao));
            const tbody = document.querySelector('#agendas-table-body');
            tbody.innerHTML = '';

            if (resultados.length === 0) {
                alert('Nenhuma agenda encontrada.');
                return;
            }

            resultados.forEach(agenda => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${agenda.id}</td>
                    <td>${agenda.data}</td>
                    <td>${agenda.hora}</td>
                    <td>${agenda.situacao}</td>
                    <td>${agenda.dataSituacao}</td>
                    <td>${agenda.observacoes}</td>
                    <td>${agenda.usuarioId}</td>
                    <td>${agenda.vacinaId}</td>
                    <td>
                        <a href="/pages/editarAgenda.jsp?id=${agenda.id}" class="btn btn-warning btn-sm">Editar</a>
                        <button class="btn btn-danger btn-sm" onclick="excluirAgenda(${agenda.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erro ao buscar agendas:', error));
}
