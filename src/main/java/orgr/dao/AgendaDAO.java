package orgr.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import orgr.model.Agenda;
import orgr.model.Vacina;

import java.util.List;

public interface AgendaDAO extends JpaRepository<Agenda, Long> {


    List<Agenda> findByUsuarioId(Long usuarioId);
}

