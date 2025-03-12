<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Vacina</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/vacina.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("id");

            if (!id) {
                alert("ID da vacina não encontrado.");
                return;
            }

            // Busca os dados da vacina
            fetch('http://localhost:8080/vacina${id}')
                .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados da vacina.");
                }
                return response.json();
            })
                .then(vacina => {
                    // Preenche os campos do formulário com os dados retornados
                    document.querySelector("#titulo").value = vacina.titulo;
                    document.querySelector("#descricao").value = vacina.descricao;
                    document.querySelector("#doses").value = vacina.doses;
                    document.querySelector("#intervalo").value = vacina.intervalo;
                    document.querySelector("#periodicidade").value = vacina.periodicidade;
                })
                .catch(error => {
                    console.error("Erro ao carregar vacina:", error);
                    alert("Erro ao carregar os dados da vacina.");
                });
        });
    </script>
</head>
<body>
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Editar Vacina</h1>
</header>
<div class="container mt-5">
    <form id="form-editar">
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
            <label for="intervalo" class="form-label">Intervalo (em dias)</label>
            <input type="number" id="intervalo" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="periodicidade" class="form-label">Periodicidade</label>
            <input type="text" id="periodicidade" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Atualizar</button>
        <a href="${pageContext.request.contextPath}/pages/vacina.jsp" class="btn btn-secondary">Cancelar</a>
    </form>
</div>
</body>
</html>