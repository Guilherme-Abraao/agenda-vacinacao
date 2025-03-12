document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('#vacinas-table-body')) {
        listarVacinas();
    } else if (document.querySelector("form") && new URLSearchParams(window.location.search).has("id")) {
        const id = new URLSearchParams(window.location.search).get("id");
        carregarVacinaParaEdicao(id);
    } else if (document.querySelector("form")) {
        document.querySelector("form").addEventListener("submit", event => {
            event.preventDefault();
            cadastrarVacina();
        });
    }
});


function listarVacinas() {
    fetch('http://localhost:8080/vacina')
        .then(response => {
            if (!response.ok) {
                console.error('Erro ao carregar vacinas:', response.status);
                return [];
            }
            return response.json();
        })
        .then(vacinas => {
            const tbody = document.querySelector('#vacinas-table-body');
            tbody.innerHTML = '';

            if (vacinas.length === 0) {
                console.warn('Nenhuma vacina encontrada.');
                return;
            }

            vacinas.forEach(vacina => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${vacina.id}</td>
                    <td>${vacina.titulo}</td>
                    <td>${vacina.descricao}</td>
                    <td>${vacina.doses}</td>
                    <td>${vacina.intervalo}</td>
                    <td>${vacina.periodicidade}</td>
                    <td>
                        <a class="btn btn-warning btn-sm" href="/pages/editarVacina.jsp?id=${vacina.id}">Editar</a>
                        <button class="btn btn-danger btn-sm" onclick="excluirVacina(${vacina.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao listar vacinas:', error);
        });
}

function carregarVacinaParaEdicao(id) {
    fetch(`http://localhost:8080/vacina/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da vacina.");
            }
            return response.json();
        })
        .then(vacina => {
            document.querySelector("#titulo").value = vacina.titulo;
            document.querySelector("#descricao").value = vacina.descricao;
            document.querySelector("#doses").value = vacina.doses;
            document.querySelector("#intervalo").value = vacina.intervalo;
            document.querySelector("#periodicidade").value = vacina.periodicidade;
        })
        .catch(error => {
            console.error("Erro ao carregar vacina:", error);
            alert("Erro ao carregar os dados da vacina.");
        });

    document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        atualizarVacina(id);
    });
}

function cadastrarVacina() {
    const vacina = {
        titulo: document.querySelector("#titulo").value,
        descricao: document.querySelector("#descricao").value,
        doses: document.querySelector("#doses").value,
        intervalo: document.querySelector("#intervalo").value,
        periodicidade: document.querySelector("#periodicidade").value
    };

    fetch('http://localhost:8080/vacina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vacina),
    })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao cadastrar vacina');
            alert('Vacina cadastrada com sucesso!');
            window.location.href = "/pages/vacina.jsp";
        })
        .catch(error => {
            console.error('Erro ao cadastrar vacina:', error);
            alert('Erro ao cadastrar vacina');
        });
}

function atualizarVacina(id) {
    const vacinaAtualizada = {
        titulo: document.querySelector("#titulo").value,
        descricao: document.querySelector("#descricao").value,
        doses: document.querySelector("#doses").value,
        intervalo: document.querySelector("#intervalo").value,
        periodicidade: document.querySelector("#periodicidade").value
    };

    fetch(`http://localhost:8080/vacina/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vacinaAtualizada),
    })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao atualizar vacina');
            alert('Vacina atualizada com sucesso!');
            window.location.href = "/pages/vacina.jsp";
        })
        .catch(error => {
            console.error('Erro ao atualizar vacina:', error);
            alert('Erro ao atualizar vacina');
        });
}

function excluirVacina(id) {
    if (confirm(`Tem certeza que deseja excluir a vacina com ID: ${id}?`)) {
        fetch(`http://localhost:8080/vacina/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao excluir vacina');
                alert(`Vacina com ID: ${id} foi excluída com sucesso.`);
                listarVacinas();
            })
            .catch(error => {
                console.error('Erro ao excluir vacina:', error);
                alert('Erro ao excluir vacina');
            });
    }
}

function buscarVacinaPorTitulo() {
    const titulo = document.querySelector("#search-title").value.trim().toLowerCase();

    if (!titulo) {
        alert("Por favor, insira um título para buscar.");
        return;
    }

    fetch('http://localhost:8080/vacina')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar vacinas para busca.");
            }
            return response.json();
        })
        .then(vacinas => {
            const vacinasEncontradas = vacinas.filter(vacina =>
                vacina.titulo.toLowerCase().includes(titulo)
            );

            const tbody = document.querySelector("#vacinas-table-body");
            tbody.innerHTML = ""; // Limpa a tabela antes de mostrar os resultados

            if (vacinasEncontradas.length === 0) {
                alert("Nenhuma vacina encontrada com o título especificado.");
                return;
            }

            vacinasEncontradas.forEach(vacina => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${vacina.id}</td>
                    <td>${vacina.titulo}</td>
                    <td>${vacina.descricao}</td>
                    <td>${vacina.doses}</td>
                    <td>${vacina.intervalo}</td>
                    <td>${vacina.periodicidade}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="atualizarVacina(${vacina.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirVacina(${vacina.id})">Excluir</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar vacinas:", error);
            alert("Erro ao buscar vacinas.");
        });
}
