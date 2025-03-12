<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda de Vacinação</title>
    <!-- Link para o CSS do Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/css/styles.css">
    <script src="${pageContext.request.contextPath}/static/js/alergia.js"></script>
</head>
<body>
<!-- Cabeçalho -->
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Agenda de Vacinação</h1>

</header>

<div class="container-fluid">
    <div class="row">
        <!-- Menu Lateral -->
        <nav class="col-md-2 col-lg-2 p-2 vh-100 d-flex flex-column custom-bg">

            <!-- Botões originais -->
            <div class="d-flex flex-column">
                <a href="${pageContext.request.contextPath}/pages/agenda.jsp" class="btn btn-info w-100 mb-1 text-light">Agendas</a>
                <a href="${pageContext.request.contextPath}/pages/vacina.jsp" class="btn btn-info w-100 mb-1 text-light">Vacinas</a>
                <a href="${pageContext.request.contextPath}/pages/usuario.jsp" class="btn btn-info w-100 mb-1 text-light">Usuários</a>
                <button class="btn btn-info w-100 mb-1 text-light" onclick="listarAlergias()">Alergias</button>
            </div>
        </nav>

        <!-- Conteúdo -->
        <main class="col-md-10 col-lg-10 p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex">
                    <!-- Botão Voltar -->
                    <button class="btn btn-info me-2" onclick="listarAlergias()">Listar</button>
                    <!-- Botão Cadastrar -->
                    <button class="btn btn-info" onclick="window.location.href='${pageContext.request.contextPath}/pages/cadastroAlergia.jsp'">Cadastrar</button>
                </div>
                <div class="d-flex align-items-center">
                    <!-- Campo de Busca -->
                    <input type="text" id="search-title" class="form-control me-2" placeholder="Buscar por título...">
                    <!-- Botão Buscar -->
                    <button class="btn btn-light" onclick="buscarAlergiaPorNome()">Buscar</button>
                </div>
            </div>


            <div id="conteudo-central">
                <!-- Seção de Listagem de Alergias -->
                <div>
                    <h2>Alergias Cadastradas</h2>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody id="alergias-table-body">
                        <!-- Alergias serão inseridas dinamicamente aqui -->
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</div>
</body>
</html>
