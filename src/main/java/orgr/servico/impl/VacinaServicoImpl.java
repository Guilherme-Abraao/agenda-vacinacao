package orgr.servico.impl;

import orgr.dao.VacinaDAO;
import orgr.model.Vacina;
import orgr.servico.VacinaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VacinaServicoImpl implements VacinaServico {

    private final VacinaDAO vacinaDAO;

    @Autowired
    public VacinaServicoImpl(VacinaDAO vacinaDAO) {
        this.vacinaDAO = vacinaDAO;
    }

    @Override
    public void salvarVacina(Vacina vacina) {
        vacinaDAO.save(vacina);
    }

    @Override
    public void atualizarVacina(Vacina vacina) {
        if (vacinaDAO.existsById(vacina.getId())) {
            vacinaDAO.save(vacina);
        } else {
            throw new RuntimeException("Vacina não encontrada com o ID: " + vacina.getId());
        }
    }

    @Override
    public void deletarVacina(Long id) {
        if (vacinaDAO.existsById(id)) {
            vacinaDAO.deleteById(id);
        } else {
            throw new RuntimeException("Vacina não encontrada com o ID: " + id);
        }
    }

    @Override
    public Vacina buscarPorId(Long id) {
        return vacinaDAO.findById(id).orElseThrow(() -> new RuntimeException("Vacina não encontrada com o ID: " + id));
    }

    @Override
    public List<Vacina> listarVacinas() {
        return vacinaDAO.findAll();
    }
}
