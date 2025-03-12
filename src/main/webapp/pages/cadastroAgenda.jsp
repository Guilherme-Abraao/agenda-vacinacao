<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Agenda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/agenda.js"></script>
</head>
<body>
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Cadastrar Agenda</h1>
</header>
<div class="container mt-5">
    <form id="form-cadastro" onsubmit="event.preventDefault(); cadastrarAgenda();">
        <div class="mb-3">
            <label for="data" class="form-label">Data</label>
            <input type="date" id="data" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="hora" class="form-label">Hora</label>
            <input type="time" id="hora" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="situacao" class="form-label">Situação</label>
            <input type="text" id="situacao" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="dataSituacao" class="form-label">Data Situação</label>
            <input type="date" id="dataSituacao" class="form-control">
        </div>
        <div class="mb-3">
            <label for="observacoes" class="form-label">Observações</label>
            <textarea id="observacoes" class="form-control" rows="3"></textarea>
        </div>
        <div class="mb-3">
            <label for="usuarioId" class="form-label">ID do Usuário</label>
            <input type="number" id="usuarioId" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="vacinaId" class="form-label">ID da Vacina</label>
            <input type="number" id="vacinaId" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Cadastrar</button>
        <a href="${pageContext.request.contextPath}/pages/agenda.jsp" class="btn btn-secondary">Voltar</a>
    </form>
</div>
</body>
</html>
