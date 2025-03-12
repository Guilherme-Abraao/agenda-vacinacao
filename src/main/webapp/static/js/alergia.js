document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('#alergias-table-body')) {
        listarAlergias(); // Apenas para a página de listagem
    } else if (document.querySelector("form") && new URLSearchParams(window.location.search).has("id")) {
        const id = new URLSearchParams(window.location.search).get("id");
        carregarAlergiaParaEdicao(id); // Apenas para a página de edição
    } else if (document.querySelector("form")) {
        document.querySelector("form").addEventListener("submit", event => {
            event.preventDefault();
            cadastrarAlergia(); // Apenas para a página de cadastro
        });
    }
});



let idAlergia;

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    idAlergia = urlParams.get("id");

    // Busca os dados da alergia
    fetch(`http://localhost:8080/alergia/${idAlergia}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da alergia.");
            }
            return response.json();
        })
        .then(alergia => {
            document.querySelector("#nome").value = alergia.nome;
        })
        .catch(error => {

        });
});

function listarAlergias() {
    fetch('http://localhost:8080/alergia')
        .then(response => {
            if (!response.ok) {
                console.error('Erro ao carregar alergias:', response.statusText);
                throw new Error('Não foi possível carregar as alergias.');
            }
            return response.json();
        })
        .then(alergias => {
            const tbody = document.querySelector('#alergias-table-body');
            tbody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

            alergias.forEach(alergia => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${alergia.id}</td>
                    <td>${alergia.nome}</td>
                    <td>
                        <a class="btn btn-warning btn-sm" href="/pages/editarAlergia.jsp?id=${alergia.id}">Editar</a>
                        <button class="btn btn-danger btn-sm" onclick="excluirAlergia(${alergia.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao listar alergias:', error.message);
            // Remove o alerta aqui e apenas loga no console
        });
}


function cadastrarAlergia() {
    const nome = document.querySelector("#nome").value;

    fetch('http://localhost:8080/alergia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(err => {
                    console.error('Erro ao cadastrar alergia:', err);
                    throw new Error(err || 'Erro ao cadastrar alergia');
                });
            }
            return response.json();
        })
        .then(() => {
            alert('Alergia cadastrada com sucesso!');
            window.location.href = "/pages/alergia.jsp";
        })
        .catch(error => {
            console.error('Erro ao cadastrar alergia:', error.message);
            alert('Não foi possível cadastrar a alergia. Verifique os dados e tente novamente.');
        });
}


function atualizarAlergia(id) {
    const nome = document.querySelector("#nome").value;

    fetch(`http://localhost:8080/alergia/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(err => {
                    console.error(`Erro ao atualizar alergia ${id}:`, err);
                    throw new Error(err || 'Erro ao atualizar alergia');
                });
            }
            return response.json();
        })
        .then(() => {
            alert('Alergia atualizada com sucesso!');
            window.location.href = "/pages/alergia.jsp";
        })
        .catch(error => {
            console.error('Erro ao atualizar alergia:', error.message);
            alert('Não foi possível atualizar a alergia. Verifique os dados e tente novamente.');
        });
}

function excluirAlergia(id) {
    if (confirm(`Tem certeza que deseja excluir a alergia com ID: ${id}?`)) {
        fetch(`http://localhost:8080/alergia/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir a alergia');
                }
                alert(`Alergia com ID: ${id} foi excluída com sucesso.`);
                listarAlergias(); // Recarrega a lista de alergias após a exclusão
            })
            .catch(error => {
                console.error('Erro ao excluir alergia:', error);
                alert('Erro ao excluir alergia');
            });
    }
}

function carregarAlergiaParaEdicao(id) {
    fetch(`http://localhost:8080/alergia/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados da alergia');
            }
            return response.json();
        })
        .then(alergia => {
            document.querySelector("#nome").value = alergia.nome;
        })
        .catch(error => {
            console.error('Erro ao carregar a alergia:', error);
            alert('Erro ao carregar os dados da alergia para edição.');
        });
}


function buscarAlergiaPorNome() {
    const nome = document.querySelector("#search-title").value.trim();

    if (!nome) {
        console.warn("Campo de busca vazio.");
        return;
    }

    fetch('http://localhost:8080/alergia')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar alergias');
            }
            return response.json();
        })
        .then(alergias => {
            const resultados = alergias.filter(alergia =>
                alergia.nome.toLowerCase().includes(nome.toLowerCase())
            );

            const tbody = document.querySelector('#alergias-table-body');
            tbody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados filtrados

            if (resultados.length === 0) {
                console.info('Nenhuma alergia encontrada com esse nome.');
                return;
            }

            resultados.forEach(alergia => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${alergia.id}</td>
                    <td>${alergia.nome}</td>
                    <td>
                        <a class="btn btn-warning btn-sm" href="/pages/editarAlergia.jsp?id=${alergia.id}">Editar</a>
                        <button class="btn btn-danger btn-sm" onclick="excluirAlergia(${alergia.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar alergias:', error);
        });
}
