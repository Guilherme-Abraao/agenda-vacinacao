package orgr.rest;

import orgr.model.Alergia;
import orgr.servico.AlergiaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alergia")
public class AlergiaRest {

    private final AlergiaServico alergiaServico;

    @Autowired
    public AlergiaRest(AlergiaServico alergiaServico) {
        this.alergiaServico = alergiaServico;
    }

    // Endpoint para listar todas as alergias
    @GetMapping
    public ResponseEntity<List<Alergia>> listarAlergias() {
        List<Alergia> alergias = alergiaServico.listarAlergias();
        return new ResponseEntity<>(alergias, HttpStatus.OK);
    }

    // Endpoint para buscar uma alergia por ID
    @GetMapping("/{id}")
    public ResponseEntity<Alergia> buscarPorId(@PathVariable Long id) {
        try {
            Alergia alergia = alergiaServico.buscarPorId(id);
            return new ResponseEntity<>(alergia, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para criar uma nova alergia
    @PostMapping
    public ResponseEntity<Alergia> salvarAlergia(@RequestBody Alergia alergia) {
        try {
            alergiaServico.salvarAlergia(alergia);
            return new ResponseEntity<>(alergia, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint para atualizar uma alergia existente
    @PutMapping("/{id}")
    public ResponseEntity<Alergia> atualizarAlergia(@PathVariable Long id, @RequestBody Alergia alergia) {
        try {
            alergia.setId(id);  // Definindo o ID da alergia que será atualizada
            alergiaServico.atualizarAlergia(alergia);
            return new ResponseEntity<>(alergia, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint para deletar uma alergia
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAlergia(@PathVariable Long id) {
        try {
            alergiaServico.deletarAlergia(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
