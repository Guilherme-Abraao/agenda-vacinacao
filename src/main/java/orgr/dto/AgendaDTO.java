package orgr.dto;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

import orgr.model.Agenda;

public class AgendaDTO {

    private Long id;
    private LocalDate data;
    private Time hora;
    private String situacao;
    private LocalDate dataSituacao;
    private String observacoes;

    // Dados completos da Vacina
    private Long vacinaId;
    private String vacinaTitulo;
    private String vacinaDescricao;
    private int vacinaDoses;
    private int vacinaPeriodicidade;
    private int vacinaIntervalo;

    // Dados completos do Usuário
    private Long usuarioId;
    private String usuarioNome;
    private Date usuarioDataNascimento;
    private String usuarioSexo;
    private String usuarioLogradouro;
    private int usuarioNumero;
    private String usuarioSetor;
    private String usuarioCidade;
    private String usuarioUf;

    // Construtor que converte a entidade Agenda para DTO
    public AgendaDTO(Agenda agenda) {
        this.id = agenda.getId();
        this.data = agenda.getData();
        this.hora = agenda.getHora();
        this.situacao = agenda.getSituacao() != null ? agenda.getSituacao().name() : null;
        this.dataSituacao = agenda.getDataSituacao();
        this.observacoes = agenda.getObservacoes();

        // Dados da Vacina
        if (agenda.getVacina() != null) {
            this.vacinaId = agenda.getVacina().getId();
            this.vacinaTitulo = agenda.getVacina().getTitulo();
            this.vacinaDescricao = agenda.getVacina().getDescricao();
            this.vacinaDoses = agenda.getVacina().getDoses();
            this.vacinaPeriodicidade = agenda.getVacina().getPeriodicidade();
            this.vacinaIntervalo = agenda.getVacina().getIntervalo();
        }

        // Dados do Usuário
        if (agenda.getUsuario() != null) {
            this.usuarioId = agenda.getUsuario().getId();
            this.usuarioNome = agenda.getUsuario().getNome();
            this.usuarioDataNascimento = agenda.getUsuario().getDataNascimento();
            this.usuarioSexo = agenda.getUsuario().getSexo();
            this.usuarioLogradouro = agenda.getUsuario().getLogradouro();
            this.usuarioNumero = agenda.getUsuario().getNumero();
            this.usuarioSetor = agenda.getUsuario().getSetor();
            this.usuarioCidade = agenda.getUsuario().getCidade();
            this.usuarioUf = agenda.getUsuario().getUf();
        }
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Time getHora() {
        return hora;
    }

    public void setHora(Time hora) {
        this.hora = hora;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public LocalDate getDataSituacao() {
        return dataSituacao;
    }

    public void setDataSituacao(LocalDate dataSituacao) {
        this.dataSituacao = dataSituacao;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Long getVacinaId() {
        return vacinaId;
    }

    public void setVacinaId(Long vacinaId) {
        this.vacinaId = vacinaId;
    }

    public String getVacinaTitulo() {
        return vacinaTitulo;
    }

    public void setVacinaTitulo(String vacinaTitulo) {
        this.vacinaTitulo = vacinaTitulo;
    }

    public String getVacinaDescricao() {
        return vacinaDescricao;
    }

    public void setVacinaDescricao(String vacinaDescricao) {
        this.vacinaDescricao = vacinaDescricao;
    }

    public int getVacinaDoses() {
        return vacinaDoses;
    }

    public void setVacinaDoses(int vacinaDoses) {
        this.vacinaDoses = vacinaDoses;
    }

    public int getVacinaPeriodicidade() {
        return vacinaPeriodicidade;
    }

    public void setVacinaPeriodicidade(int vacinaPeriodicidade) {
        this.vacinaPeriodicidade = vacinaPeriodicidade;
    }

    public int getVacinaIntervalo() {
        return vacinaIntervalo;
    }

    public void setVacinaIntervalo(int vacinaIntervalo) {
        this.vacinaIntervalo = vacinaIntervalo;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuarioNome() {
        return usuarioNome;
    }

    public void setUsuarioNome(String usuarioNome) {
        this.usuarioNome = usuarioNome;
    }

    public Date getUsuarioDataNascimento() {
        return usuarioDataNascimento;
    }

    public void setUsuarioDataNascimento(Date usuarioDataNascimento) {
        this.usuarioDataNascimento = usuarioDataNascimento;
    }

    public String getUsuarioSexo() {
        return usuarioSexo;
    }

    public void setUsuarioSexo(String usuarioSexo) {
        this.usuarioSexo = usuarioSexo;
    }

    public String getUsuarioLogradouro() {
        return usuarioLogradouro;
    }

    public void setUsuarioLogradouro(String usuarioLogradouro) {
        this.usuarioLogradouro = usuarioLogradouro;
    }

    public int getUsuarioNumero() {
        return usuarioNumero;
    }

    public void setUsuarioNumero(int usuarioNumero) {
        this.usuarioNumero = usuarioNumero;
    }

    public String getUsuarioSetor() {
        return usuarioSetor;
    }

    public void setUsuarioSetor(String usuarioSetor) {
        this.usuarioSetor = usuarioSetor;
    }

    public String getUsuarioCidade() {
        return usuarioCidade;
    }

    public void setUsuarioCidade(String usuarioCidade) {
        this.usuarioCidade = usuarioCidade;
    }

    public String getUsuarioUf() {
        return usuarioUf;
    }

    public void setUsuarioUf(String usuarioUf) {
        this.usuarioUf = usuarioUf;
    }
}
