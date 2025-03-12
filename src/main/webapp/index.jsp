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

</head>
<body>
<!-- Cabeçalho -->
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Agenda de Vacinação</h1>
</header>

<!-- Menu Lateral -->
<nav class="col-md-1 col-lg-2 p-2 vh-100 d-flex flex-column custom-bg">
    <div class="d-flex flex-column">
        <a href="${pageContext.request.contextPath}/pages/agenda.jsp" class="btn btn-info w-100 mb-1 text-light">Agendas</a>
        <a href="${pageContext.request.contextPath}/pages/vacina.jsp" class="btn btn-info w-100 mb-1 text-light">Vacinas</a>
        <a href="${pageContext.request.contextPath}/pages/usuario.jsp" class="btn btn-info w-100 mb-1 text-light">Usuários</a>
        <a href="${pageContext.request.contextPath}/pages/alergia.jsp" class="btn btn-info w-100 mb-1 text-light">Alergias</a>
    </div>

</nav>
</body>
</html>