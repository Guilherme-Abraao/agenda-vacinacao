package orgr.servico;

import orgr.model.Vacina;
import java.util.List;

public interface VacinaServico {

    void salvarVacina(Vacina vacina);

    void atualizarVacina(Vacina vacina);

    void deletarVacina(Long id);

    Vacina buscarPorId(Long id);

    List<Vacina> listarVacinas();

}
