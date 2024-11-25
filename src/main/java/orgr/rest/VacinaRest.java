package orgr.rest;

import orgr.model.Vacina;
import orgr.servico.VacinaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vacina")
public class VacinaRest {

    private final VacinaServico vacinaServico;

    @Autowired
    public VacinaRest(VacinaServico vacinaServico) {
        this.vacinaServico = vacinaServico;
    }

    // Endpoint para listar todas as vacinas
    @GetMapping
    public ResponseEntity<List<Vacina>> listarVacinas() {
        List<Vacina> vacinas = vacinaServico.listarVacinas();
        return new ResponseEntity<>(vacinas, HttpStatus.OK);
    }

    // Endpoint para buscar uma vacina por ID
    @GetMapping("/{id}")
    public ResponseEntity<Vacina> buscarPorId(@PathVariable Long id) {
        try {
            Vacina vacina = vacinaServico.buscarPorId(id);
            return new ResponseEntity<>(vacina, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para criar uma nova vacina
    @PostMapping
    public ResponseEntity<Vacina> salvarVacina(@RequestBody Vacina vacina) {
        try {
            vacinaServico.salvarVacina(vacina);
            return new ResponseEntity<>(vacina, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint para atualizar uma vacina existente
    @PutMapping("/{id}")
    public ResponseEntity<Vacina> atualizarVacina(@PathVariable Long id, @RequestBody Vacina vacina) {
        try {
            vacina.setId(id);  // Definindo o ID da vacina que será atualizada
            vacinaServico.atualizarVacina(vacina);
            return new ResponseEntity<>(vacina, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para deletar uma vacina
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVacina(@PathVariable Long id) {
        try {
            vacinaServico.deletarVacina(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

