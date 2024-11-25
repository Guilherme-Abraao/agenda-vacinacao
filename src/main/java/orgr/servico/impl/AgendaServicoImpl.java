package orgr.servico.impl;

import orgr.dao.AgendaDAO;
import orgr.model.Agenda;
import orgr.servico.AgendaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendaServicoImpl implements AgendaServico {

    private final AgendaDAO agendaDAO;

    @Autowired
    public AgendaServicoImpl(AgendaDAO agendaDAO) {
        this.agendaDAO = agendaDAO;
    }

    @Override
    public void salvarAgenda(Agenda agenda) {
        agendaDAO.save(agenda);
    }

    @Override
    public void atualizarAgenda(Agenda agenda) {
        if (agendaDAO.existsById(agenda.getId())) {
            agendaDAO.save(agenda);
        } else {
            throw new RuntimeException("Agenda não encontrada com o ID: " + agenda.getId());
        }
    }

    @Override
    public void deletarAgenda(Long id) {
        if (agendaDAO.existsById(id)) {
            agendaDAO.deleteById(id);
        } else {
            throw new RuntimeException("Agenda não encontrada com o ID: " + id);
        }
    }

    @Override
    public Agenda buscarPorId(Long id) {
        return agendaDAO.findById(id).orElseThrow(() -> new RuntimeException("Agenda não encontrada com o ID: " + id));
    }

    @Override
    public List<Agenda> listarAgendas() {
        return agendaDAO.findAll();
    }
}
