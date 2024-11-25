package orgr.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import orgr.model.Alergia;
import orgr.model.Vacina;

import java.util.List;

public interface AlergiaDAO extends JpaRepository<Alergia, Long> {


}
