<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Usuário</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/usuario.js"></script>
</head>
<body>
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Cadastrar Novo Usuário</h1>
</header>
<div class="container mt-5">
    <form id="form-cadastro" onsubmit="event.preventDefault(); cadastrarUsuario();">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" id="nome" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="data_nascimento" class="form-label">Data de Nascimento</label>
            <input type="date" id="data_nascimento" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="sexo" class="form-label">Sexo</label>
            <select id="sexo" class="form-control" required>
                <option value="" disabled selected>Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="logradouro" class="form-label">Logradouro</label>
            <input type="text" id="logradouro" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="numero" class="form-label">Número</label>
            <input type="text" id="numero" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="setor" class="form-label">Setor</label>
            <input type="text" id="setor" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="cidade" class="form-label">Cidade</label>
            <input type="text" id="cidade" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="uf" class="form-label">UF</label>
            <input type="text" id="uf" class="form-control" maxlength="2" required>
        </div>
        <div class="mb-3">
            <label for="alergias" class="form-label">Alergias</label>
            <select id="alergias" class="form-control" multiple>
                <!-- As opções serão preenchidas dinamicamente -->
            </select>
            <small class="form-text text-muted">Selecione as alergias (opcional).</small>
        </div>
        <button type="submit" class="btn btn-primary">Cadastrar</button>
        <a href="${pageContext.request.contextPath}/pages/usuario.jsp" class="btn btn-secondary">Voltar</a>
    </form>

</div>
</body>
</html>
