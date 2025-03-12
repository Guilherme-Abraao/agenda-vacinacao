document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#usuarios-table-body")) {
        listarUsuarios();
    }
});

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function listarUsuarios() {
    fetch('http://localhost:8080/usuario')
        .then(response => response.json())
        .then(usuarios => {
            const tbody = document.querySelector("#usuarios-table-body");
            tbody.innerHTML = "";
            usuarios.forEach(usuario => {
                const tr = document.createElement("tr");
                const alergias = usuario.alergias ? usuario.alergias.map(a => a.nome).join(', ') : 'Nenhuma';
                tr.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${formatarData(usuario.dataNascimento)}</td>
                    <td>${usuario.sexo}</td>
                    <td>${usuario.cidade}</td>
                    <td>${usuario.uf}</td>
                    <td>${usuario.setor}</td>
                    <td>${usuario.numero}</td>
                    <td>${alergias}</td>
                    <td>
                        <a class="btn btn-warning btn-sm" href="/pages/editarUsuario.jsp?id=${usuario.id}">Editar</a>
                        <button class="btn btn-danger btn-sm" onclick="excluirUsuario(${usuario.id})">Excluir</button>
                        <a class="btn btn-primary btn-sm" href="/pages/agendamentoUsuario.jsp?id=${usuario.id}">Agendamentos</a>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao listar usuários:', error);
            alert('Falha ao carregar a lista de usuários.');
        });
}


function cadastrarUsuario() {
    const dados = obterDadosFormulario();
    console.log('Dados do formulário:', dados);  // Adicionando um log para inspecionar os dados

    fetch('http://localhost:8080/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }
            return response.json();
        })
        .then(data => {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = '/pages/usuario.jsp';
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Falha ao cadastrar usuário.');
        });
}

function excluirUsuario(id) {
    if (confirm(`Deseja excluir o usuário com ID ${id}?`)) {
        fetch(`http://localhost:8080/usuario/${id}`, { method: 'DELETE' })
            .then(() => listarUsuarios())
            .catch(() => alert("Erro ao excluir usuário."));
    }
}

function buscarUsuarioPorNome() {
    const nome = document.querySelector("#search-name").value.trim().toLowerCase();

    if (!nome) {
        alert("Por favor, insira um nome para buscar.");
        return;
    }

    fetch('http://localhost:8080/usuario')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar usuários para busca.");
            }
            return response.json();
        })
        .then(usuarios => {
            const usuariosEncontrados = usuarios.filter(usuario =>
                usuario.nome.toLowerCase().includes(nome)
            );

            const tbody = document.querySelector("#usuarios-table-body");
            tbody.innerHTML = ""; // Limpa a tabela antes de mostrar os resultados

            if (usuariosEncontrados.length === 0) {
                alert("Nenhum usuário encontrado com o nome especificado.");
                return;
            }

            usuariosEncontrados.forEach(usuario => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                     <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.dataNascimento}</td>
                    <td>${usuario.sexo}</td>
                    <td>${usuario.cidade}</td>
                    <td>${usuario.uf}</td>
                    <td>${usuario.setor}</td>
                    <td>${usuario.numero}</td>
                    <td>
                        <a class="btn btn-warning btn-sm" href="/pages/editarUsuario.jsp?id=${usuario.id}">Editar</a>
                        <button class="btn btn-danger btn-sm" onclick="excluirUsuario(${usuario.id})">Excluir</button>
                        <a class="btn btn-primary btn-sm" href="/pages/agendamentoUsuario.jsp?id=${usuario.id}">Agendamentos</a>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar usuários:", error);
            alert("Erro ao buscar usuários.");
        });
}
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
        carregarDadosUsuario(id);
        carregarAlergias();
    }

    // Evento para o formulário de atualização
    document.querySelector("#form-editar").addEventListener("submit", event => {
        event.preventDefault();
        atualizarUsuario(id);
    });
});

// Função para carregar os dados do usuário
function carregarDadosUsuario(id) {
    fetch(`http://localhost:8080/usuario/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados do usuário.");
            }
            return response.json();
        })
        .then(usuario => {
            // Preenche os campos do formulário com os dados retornados
            document.querySelector("#nome").value = usuario.nome;
            document.querySelector("#dataNascimento").value = usuario.dataNascimento.split("T")[0]; // Apenas a data
            document.querySelector("#sexo").value = usuario.sexo === "M" ? "Masculino" : (usuario.sexo === "F" ? "Feminino" : "Outro");
            document.querySelector("#cidade").value = usuario.cidade;
            document.querySelector("#uf").value = usuario.uf;
            document.querySelector("#setor").value = usuario.setor;
            document.querySelector("#numero").value = usuario.numero;
            document.querySelector("#logradouro").value = usuario.logradouro; // Preenche logradouro

            // Carregar as alergias selecionadas
            carregarAlergiasUsuario(usuario.alergias);
        })
        .catch(error => {
            console.error("Erro ao carregar usuário:", error);
            alert("Erro ao carregar os dados do usuário.");
        });
}

function carregarAlergiasUsuario(alergiasUsuario) {
    const selectAlergias = document.querySelector("#alergias");
    const alergiasSelecionadas = new Set(alergiasUsuario.map(alergia => alergia.id));

    selectAlergias.querySelectorAll("option").forEach(option => {
        if (alergiasSelecionadas.has(option.value)) {
            option.selected = true;
        }
    });
}

function atualizarUsuario(id) {
    const usuarioAtualizado = {
        nome: document.querySelector("#nome").value,
        dataNascimento: document.querySelector("#dataNascimento").value,
        sexo: document.querySelector("#sexo").value,
        cidade: document.querySelector("#cidade").value,
        uf: document.querySelector("#uf").value,
        setor: document.querySelector("#setor").value,
        numero: document.querySelector("#numero").value,
        logradouro: document.querySelector("#logradouro").value,
        alergias: Array.from(document.querySelector("#alergias").selectedOptions)
            .map(option => ({ id: option.value, nome: option.textContent }))
    };

    fetch(`http://localhost:8080/usuario/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioAtualizado)
    })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao atualizar usuário.");
            alert("Usuário atualizado com sucesso!");
            window.location.href = "/pages/usuario.jsp";
        })
        .catch(error => {
            console.error("Erro ao atualizar usuário:", error);
            alert("Erro ao atualizar usuário.");
        });
}


function obterDadosFormulario() {
    const nome = document.getElementById('nome')?.value || '';
    const dataNascimento = document.getElementById('data_nascimento')?.value || '';
    const sexo = document.getElementById('sexo')?.value || '';
    const logradouro = document.getElementById('logradouro')?.value || '';
    const numero = document.getElementById('numero')?.value || '';
    const setor = document.getElementById('setor')?.value || '';
    const cidade = document.getElementById('cidade')?.value || '';
    const uf = document.getElementById('uf')?.value || '';

    // Aqui você vai montar um array de objetos {id, nome} para alergias
    const alergias = Array.from(document.getElementById('alergias')?.selectedOptions || []).map(option => ({
        id: option.value,
        nome: option.textContent.trim()
    }));

    return {
        nome,
        dataNascimento,
        sexo,
        logradouro,
        numero,
        setor,
        cidade,
        uf,
        alergias // Agora você está enviando o array de objetos {id, nome}
    };
}

function carregarAlergias() {
    fetch('http://localhost:8080/alergia')
        .then(response => response.json())
        .then(alergias => {
            const selectAlergias = document.getElementById('alergias');
            selectAlergias.innerHTML = ''; // Limpa as opções atuais
            alergias.forEach(alergia => {
                const option = document.createElement('option');
                option.value = alergia.id;
                option.textContent = alergia.nome;
                selectAlergias.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar alergias:', error);
            alert('Falha ao carregar as alergias.');
        });
}

// Chame essa função quando a página for carregada
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#form-cadastro")) {
        carregarAlergias();
    }
});