package orgr.servico;

import orgr.model.Agenda;

import java.util.List;

public interface AgendaServico {

    void salvarAgenda(Agenda agenda);

    void atualizarAgenda(Agenda agenda);

    void deletarAgenda(Long id);

    Agenda buscarPorId(Long id);

    List<Agenda> listarAgendas();
}
