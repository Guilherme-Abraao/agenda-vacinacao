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
    <script src="${pageContext.request.contextPath}/static/js/vacina.js"></script>
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
                <button class="btn btn-info w-100 mb-1 text-light" onclick="listarVacinas()">Vacinas</button>
                <a href="${pageContext.request.contextPath}/pages/usuario.jsp" class="btn btn-info w-100 mb-1 text-light">Usuários</a>
                <a href="${pageContext.request.contextPath}/pages/alergia.jsp" class="btn btn-info w-100 mb-1 text-light">Alergias</a>
            </div>
        </nav>

        <!-- Conteúdo -->
        <main class="col-md-10 col-lg-10 p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex">
                    <!-- Botão Voltar -->
                    <button class="btn btn-info me-2" onclick="listarVacinas()">Listar</button>
                    <!-- Botão Cadastrar -->
                    <button class="btn btn-info" onclick="window.location.href='${pageContext.request.contextPath}/pages/cadastroVacina.jsp'">Cadastrar</button>
                </div>
                <div class="d-flex align-items-center">
                    <!-- Campo de Busca -->
                    <label for="search-title"></label><input type="text" id="search-title" class="form-control me-2" placeholder="Buscar por título...">
                    <!-- Botão Buscar -->
                    <button class="btn btn-light" onclick="buscarVacinaPorTitulo()">Buscar</button>
                </div>
            </div>


            <div id="conteudo-central">
                <!-- Seção de Listagem de Vacinas -->
                <div>
                    <h2>Vacinas Cadastradas</h2>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Doses</th>
                            <th>Intervalo</th>
                            <th>Periodicidade</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody id="vacinas-table-body">
                        <!-- Vacinas serão exibidas aqui dinamicamente -->
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</div>
</body>
</html>