<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Alergia</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="${pageContext.request.contextPath}/static/js/alergia.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get("id");

            if (!id) {
                alert("ID da alergia não encontrado.");
                return;
            }

            // Busca os dados da alergia
            fetch(`http://localhost:8080/alergia/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Erro ao buscar dados da alergia.");
                    }
                    return response.json();
                })
                .then(alergia => {
                    // Preenche os campos do formulário com os dados retornados
                    document.querySelector("#nome").value = alergia.nome;
                })
                .catch(error => {
                    console.error("Erro ao carregar alergia:", error);
                    alert("Erro ao carregar os dados da alergia.");
                });
        });
    </script>
</head>
<body>
<header class="bg-info text-light text-center py-3">
    <h1 class="mb-0">Editar Alergia</h1>
</header>
<div class="container mt-5">
    <form id="form-editar" onsubmit="event.preventDefault(); atualizarAlergia(idAlergia);">
        <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" id="nome" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Atualizar</button>
        <a href="${pageContext.request.contextPath}/pages/alergia.jsp" class="btn btn-secondary">Cancelar</a>
    </form>
</div>
</body>
</html>
