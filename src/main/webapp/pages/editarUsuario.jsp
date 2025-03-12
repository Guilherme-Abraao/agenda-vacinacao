<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuário</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/usuario.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("id");
            if (id) {
                carregarDadosUsuario(id);
            }
            document.addEventListener("DOMContentLoaded", () => {
                carregarAlergias();
            });
            // Busca os dados do usuário
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
                    document.querySelector("#sexo").value = usuario.sexo;
                    document.querySelector("#cidade").value = usuario.cidade;
                    document.querySelector("#uf").value = usuario.uf;
                    document.querySelector("#setor").value = usuario.setor;
                    document.querySelector("#numero").value = usuario.numero;
                })
                .catch(error => {
                    console.error("Erro ao carregar usuário:", error);
                    alert("Erro ao carregar os dados do usuário.");
                });

            document.querySelector("#form-editar").addEventListener("submit", event => {
                event.preventDefault();
                atualizarUsuario(id);
            });
        });

        function atualizarUsuario(id) {
            const usuarioAtualizado = {
                nome: document.querySelector("#nome").value,
                dataNascimento: document.querySelector("#dataNascimento").value,
                sexo: document.querySelector("#sexo").value,
                cidade: document.querySelector("#cidade").value,
                uf: document.querySelector("#uf").value,
                setor: document.querySelector("#setor").value,
                numero: document.querySelector("#numero").value
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
    </script>
</head>
<body>
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Editar Usuário</h1>
</header>
<div class="container mt-5">
    <form id="form-editar">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" id="nome" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="dataNascimento" class="form-label">Data de Nascimento</label>
            <input type="date" id="dataNascimento" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="sexo" class="form-label">Sexo</label>
            <select id="sexo" class="form-select" required>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="cidade" class="form-label">Cidade</label>
            <input type="text" id="cidade" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="uf" class="form-label">UF</label>
            <input type="text" id="uf" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="setor" class="form-label">Setor</label>
            <input type="text" id="setor" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="numero" class="form-label">Número</label>
            <input type="text" id="numero" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="logradouro" class="form-label">Logradouro</label>
            <input type="text" id="logradouro" class="form-control">
        </div>
        <div class="mb-3">
            <label for="alergias" class="form-label">Alergias</label>
            <select id="alergias" class="form-select" multiple>
                <!-- As opções serão carregadas dinamicamente -->
            </select>
            <small class="form-text text-muted">Segure a tecla CTRL (ou Command no Mac) para selecionar várias opções.</small>
        </div>
        <button type="submit" class="btn btn-primary">Atualizar</button>
        <a href="${pageContext.request.contextPath}/pages/usuario.jsp" class="btn btn-secondary">Cancelar</a>
    </form>
</div>
</body>
</html>
