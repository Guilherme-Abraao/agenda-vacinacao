package orgr.rest;

import orgr.dto.AgendaDTO;
import orgr.model.Agenda;
import orgr.servico.AgendaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agenda")
public class AgendaRest {

    private final AgendaServico agendaServico;

    @Autowired
    public AgendaRest(AgendaServico agendaServico) {
        this.agendaServico = agendaServico;
    }

    // Endpoint para listar todas as agendas
    @GetMapping
    public ResponseEntity<List<AgendaDTO>> listarAgendas() {
        List<Agenda> agendas = agendaServico.listarAgendas(); // Método no serviço
        List<AgendaDTO> agendasDTO = agendas.stream()
                .map(AgendaDTO::new)
                .toList();
        return ResponseEntity.ok(agendasDTO);
    }

    // Endpoint para buscar uma agenda por ID
    @GetMapping("/{id}")
    public ResponseEntity<Agenda> buscarPorId(@PathVariable Long id) {
        try {
            Agenda agenda = agendaServico.buscarPorId(id);
            return new ResponseEntity<>(agenda, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para criar uma nova agenda
    @PostMapping
    public ResponseEntity<Agenda> salvarAgenda(@RequestBody Agenda agenda) {
        try {
            agendaServico.salvarAgenda(agenda);
            return new ResponseEntity<>(agenda, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint para atualizar uma agenda existente
    @PutMapping("/{id}")
    public ResponseEntity<Agenda> atualizarAgenda(@PathVariable Long id, @RequestBody Agenda agenda) {
        try {
            agenda.setId(id); // Definindo o ID da agenda que será atualizada
            agendaServico.atualizarAgenda(agenda);
            return new ResponseEntity<>(agenda, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para deletar uma agenda
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAgenda(@PathVariable Long id) {
        try {
            agendaServico.deletarAgenda(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
