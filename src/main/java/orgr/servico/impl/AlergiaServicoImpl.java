package orgr.servico.impl;

import orgr.dao.AlergiaDAO;
import orgr.model.Alergia;
import orgr.servico.AlergiaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlergiaServicoImpl implements AlergiaServico {

    private final AlergiaDAO alergiaDAO;

    @Autowired
    public AlergiaServicoImpl(AlergiaDAO alergiaDAO) {
        this.alergiaDAO = alergiaDAO;
    }

    @Override
    public void salvarAlergia(Alergia alergia) {
        alergiaDAO.save(alergia);
    }

    @Override
    public void atualizarAlergia(Alergia alergia) {
        if (alergiaDAO.existsById(alergia.getId())) {
            alergiaDAO.save(alergia);
        } else {
            throw new RuntimeException("Alergia não encontrada com o ID: " + alergia.getId());
        }
    }

    @Override
    public void deletarAlergia(Long id) {
        if (alergiaDAO.existsById(id)) {
            alergiaDAO.deleteById(id);
        } else {
            throw new RuntimeException("Alergia não encontrada com o ID: " + id);
        }
    }

    @Override
    public Alergia buscarPorId(Long id) {
        return alergiaDAO.findById(id).orElseThrow(() -> new RuntimeException("Alergia não encontrada com o ID: " + id));
    }

    @Override
    public List<Alergia> listarAlergias() {
        return alergiaDAO.findAll();
    }
}
