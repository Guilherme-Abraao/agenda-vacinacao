package orgr.servico;

import orgr.model.Alergia;

import java.util.List;

public interface AlergiaServico {

    void salvarAlergia(Alergia alergia);

    void atualizarAlergia(Alergia alergia);

    void deletarAlergia(Long id);

    Alergia buscarPorId(Long id);

    List<Alergia> listarAlergias();
}
