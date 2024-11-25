package orgr.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import orgr.model.Usuario;
import orgr.model.Vacina;

import java.util.List;

public interface UsuarioDAO extends JpaRepository<Usuario, Long> {


}

