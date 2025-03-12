package servlets;

import orgr.model.Vacina;
import orgr.servico.impl.VacinaServicoImpl;
import com.google.gson.Gson;
import orgr.dao.VacinaDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(urlPatterns = {
        "/vacina",     // endpoint para cadastro de vacinas
        "/vacina/*"    // endpoint para operações individuais de vacinas (buscar, atualizar, excluir)
})

public class VacinaServlet extends HttpServlet {
    private VacinaServicoImpl vacinaService;
    private Gson gson;
    private VacinaDAO vacinaDAO;

    @Override
    public void init() throws ServletException {
        super.init();
        // Inicializar o VacinaService, que provavelmente é injetado por um framework de injeção de dependência
        this.vacinaService = new VacinaServicoImpl(vacinaDAO);
        this.gson = new Gson();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Vacina> vacinas = vacinaService.listarVacinas();
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            out.print(gson.toJson(vacinas));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Criar uma nova vacina
        Vacina novaVacina = gson.fromJson(request.getReader(), Vacina.class);
        Vacina vacina = vacinaService.salvarVacina(novaVacina);

        // Converter a nova vacina para JSON e enviar a resposta
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            out.print(gson.toJson(vacina));
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Atualizar uma vacina existente
        Vacina vacina = gson.fromJson(request.getReader(), Vacina.class);
        Vacina atualizadaVacina = vacinaService.atualizarVacina(vacina);

        // Converter a vacina atualizada para JSON e enviar a resposta
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            out.print(gson.toJson(atualizadaVacina));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Excluir uma vacina
        Long id = Long.parseLong(request.getParameter("id"));
        vacinaService.deletarVacina(id);

        // Enviar uma resposta de sucesso
        response.setStatus(HttpServletResponse.SC_OK);
    }
}