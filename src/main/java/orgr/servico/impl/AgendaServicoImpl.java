package orgr.servico.impl;

import orgr.dao.AgendaDAO;
import orgr.dto.AgendaDTO;
import orgr.model.Agenda;
import orgr.servico.AgendaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import orgr.enums.Situacao;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public void darBaixaRealizada(Long id) {
        Agenda agenda = agendaDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Agenda não encontrada com o ID: " + id));
        agenda.setSituacao(Situacao.REALIZADO);
        agenda.setDataSituacao(LocalDate.now());
        agendaDAO.save(agenda);
    }

    @Override
    public void darBaixaCancelada(Long id) {
        Agenda agenda = agendaDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Agenda não encontrada com o ID: " + id));
        agenda.setSituacao(Situacao.CANCELADO);
        agenda.setDataSituacao(LocalDate.now());
        agendaDAO.save(agenda);
    }

    // Método que retorna todas as agendas de um usuário pelo id
    public List<AgendaDTO> listarAgendasPorUsuarioId(Long usuarioId) {
        List<Agenda> agendas = agendaDAO.findByUsuarioId(usuarioId);  // Busca as agendas
        return agendas.stream()
                .map(AgendaDTO::new)   // Converte as agendas para DTOs
                .collect(Collectors.toList());
    }

}
