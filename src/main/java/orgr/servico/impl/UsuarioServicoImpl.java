package orgr.servico.impl;

import orgr.dao.UsuarioDAO;
import orgr.model.Usuario;
import orgr.servico.UsuarioServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServicoImpl implements UsuarioServico {

    private final UsuarioDAO usuarioDAO;

    @Autowired
    public UsuarioServicoImpl(UsuarioDAO usuarioDAO) {
        this.usuarioDAO = usuarioDAO;
    }

    @Override
    public void salvarUsuario(Usuario usuario) {
        usuarioDAO.save(usuario);
    }

    @Override
    public void atualizarUsuario(Usuario usuario) {
        if (usuarioDAO.existsById(usuario.getId())) {
            usuarioDAO.save(usuario);
        } else {
            throw new RuntimeException("Usuário não encontrado com o ID: " + usuario.getId());
        }
    }

    @Override
    public void deletarUsuario(Long id) {
        if (usuarioDAO.existsById(id)) {
            usuarioDAO.deleteById(id);
        } else {
            throw new RuntimeException("Usuário não encontrado com o ID: " + id);
        }
    }

    @Override
    public Usuario buscarPorId(Long id) {
        return usuarioDAO.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado com o ID: " + id));
    }

    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioDAO.findAll();
    }
}
