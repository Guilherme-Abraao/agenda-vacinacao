<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agendamentos do Usuário</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/agendamentoUsuario.js"></script>
</head>
<body>
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Agendamentos do Usuário</h1>
</header>

<div class="container-fluid">
    <div class="row">
        <main class="col-md-12 p-4">
            <h2>Agendamentos do Usuário</h2>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Situação</th>
                    <th>Vacina</th>
                    <th>Dose</th>
                </tr>
                </thead>
                <tbody id="agendamentos-table-body"></tbody>
            </table>
        </main>
    </div>
</div>
</body>
</html>
