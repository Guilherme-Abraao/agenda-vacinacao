package orgr.servico;

import orgr.model.Agenda;
import orgr.model.Usuario;

import java.util.List;

public interface UsuarioServico {

    void salvarUsuario(Usuario usuario);

    void atualizarUsuario(Usuario usuario);

    void deletarUsuario(Long id);

    Usuario buscarPorId(Long id);

    List<Usuario> listarUsuarios();

    List<Agenda> listarAgendamentosPorUsuario(Long id);
}
