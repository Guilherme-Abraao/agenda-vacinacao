<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Alergia</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/alergia.js"></script>
</head>
<body>
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Cadastrar Nova Alergia</h1>
</header>
<div class="container mt-5">
    <form id="form-cadastro" onsubmit="event.preventDefault(); cadastrarAlergia();">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" id="nome" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Cadastrar</button>
        <a href="${pageContext.request.contextPath}/pages/alergia.jsp" class="btn btn-secondary">Voltar</a>
    </form>
</div>
</body>
</html>
