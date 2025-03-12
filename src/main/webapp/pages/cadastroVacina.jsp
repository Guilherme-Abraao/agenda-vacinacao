<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Vacina</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/vacina.js"></script>
</head>
<body>
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Cadastrar Nova Vacina</h1>
</header>
<div class="container mt-5">
    <form id="form-cadastro" onsubmit="event.preventDefault(); cadastrarVacina();">
        <div class="mb-3">
            <label for="titulo" class="form-label">Título</label>
            <input type="text" id="titulo" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="descricao" class="form-label">Descrição</label>
            <textarea id="descricao" class="form-control" rows="3" required></textarea>
        </div>
        <div class="mb-3">
            <label for="doses" class="form-label">Doses</label>
            <input type="number" id="doses" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="intervalo" class="form-label">Intervalo</label>
            <input type="number" id="intervalo" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="periodicidade" class="form-label">Periodicidade</label>
            <input type="text" id="periodicidade" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Cadastrar</button>
        <a href="${pageContext.request.contextPath}/pages/vacina.jsp" class="btn btn-secondary">Voltar</a>
    </form>
</div>
</body>
</html>
