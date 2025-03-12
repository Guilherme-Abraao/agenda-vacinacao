<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciar Usuários</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/usuario.js"></script>
</head>
<body>
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Gerenciar Usuários</h1>
</header>

<div class="container-fluid">
    <div class="row">
        <!-- Menu Lateral -->
        <nav class="col-md-2 col-lg-2 p-2 vh-100 d-flex flex-column custom-bg">
            <div class="d-flex flex-column">
                <a href="${pageContext.request.contextPath}/pages/agenda.jsp" class="btn btn-info w-100 mb-1 text-light">Agendas</a>
                <a href="${pageContext.request.contextPath}/pages/vacina.jsp" class="btn btn-info w-100 mb-1 text-light">Vacinas</a>
                <button class="btn btn-info w-100 mb-1 text-light" onclick="listarUsuarios()">Usuários</button>
                <a href="${pageContext.request.contextPath}/pages/alergia.jsp" class="btn btn-info w-100 mb-1 text-light">Alergias</a>
            </div>
        </nav>

        <main class="col-md-10 col-lg-10 p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex">
                    <button class="btn btn-info me-2" onclick="listarUsuarios()">Listar</button>
                    <button class="btn btn-info" onclick="window.location.href='${pageContext.request.contextPath}/pages/cadastroUsuario.jsp'">Cadastrar</button>
                </div>
                <div class="d-flex align-items-center">
                    <input type="text" id="search-name" class="form-control me-2" placeholder="Buscar por nome...">
                    <button class="btn btn-light" onclick="buscarUsuarioPorNome()">Buscar</button>
                </div>
            </div>
            <div id="conteudo-central">
                <h2>Usuários Cadastrados</h2>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Setor</th>
                        <th>Número</th>
                        <th>Alergias</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody id="usuarios-table-body"></tbody>
                </table>
            </div>
        </main>
    </div>
</div>
</body>
</html>
