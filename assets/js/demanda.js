// ===================================================================== //
// ===== MODAL ========================================================= //
// ===================================================================== //

// Modal Cadastrar Demanda
$(document).ready(function () {
  // Abrir modal na página carregada
  $("#cadastrarDemanda").click(function () {
    $("#modalCadastarDemanda").modal('show');
    ListarDesenvolvedores();
    
    // Salvar dados cadastro
    $('#formulario-cadastro-demanda').submit(function (e) {
      e.preventDefault();
      CadastrarDemanda();
    });
  });

  // Fechar modal clicando no botão
  $(".cancelar").click(function () {
    $("#modalCadastarDemanda").modal('hide');
  });
});

// Modal Atualizar Demanda
function EditarDados() {
  $(document).ready(function () {
    // Abrir modal na página carregada
    $("#modalAtualizarDemanda").modal('show');
    ListarDesenvolvedores();
    
    // Salvar dados atualização
    $('#formulario-atualizacao-demanda').submit(function (e) {
      e.preventDefault();
      AtualizarDemanda();
    });

    // Fechar modal clicando no botão
    $(".cancelar").click(function () {
      $("#modalAtualizarDemanda").modal('hide');
    });
  });
}

// Modal Avaliar Demanda
function ModalAvaliarDemanda() {
  $(document).ready(function () {
    // Abrir modal na página carregada
    $("#modalAvaliarDemanda").modal('show');
    
    // Salvar dados avaliação
    $('#formulario-avaliacao-demanda').submit(function (e) {
      e.preventDefault();
      AvaliarDemanda();
    });

    // Fechar modal clicando no botão
    $(".cancelar").click(function () {
      $("#modalAvaliarDemanda").modal('hide');
    });
  });
}

// ===================================================================== //
// ===== LISTAR DEMANDAS =============================================== //
// ===================================================================== //

ChamarTabela();

function ChamarTabela(){
  $.ajax({
    method: "GET",
    url: "http://5.161.81.202:8080/v1/ListarDemandas",
    dataType: "json"
  }).done(function (resposta) {
    // console.log(resposta);
    CriarTabela(resposta);
  }).fail(function (details, error) {
    console.log(details);
    console.log(error);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Oops...',
      text: 'Os registros não puderam ser carregados!'
    });
  });
}
function CriarTabela(obj) {
  var texto = '<thead><tr>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID da Demanda</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome da Demanda</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Início do Atendimento</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Término do Atendimento</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tipo da Demanda</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Complexidade Horas</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status da Demanda</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID Dev</th>'
    + '<th></th></tr></thead><tbody>';

  $(obj).each(function (index, linha) {
    // Formatando data e hora
    var options = {     
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
    
    // Evitando problemas com valores nulos para as datas
    var dateInicio;
    var dateFim;
    
    if(linha.inicioAtendimento != undefined) {
       dateInicio = new Date(linha.inicioAtendimento).toLocaleDateString('pt-BR', options);
    }else {
      dateInicio = "Indefinido";
    }
    if(linha.fimAtendimento != undefined) {
      dateFim = new Date(linha.fimAtendimento).toLocaleDateString('pt-BR', options);
    }else {
      dateFim = "Indefinido";
    }

    texto += '<tr><td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="mb-0 text-sm">' + linha.identificador + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="mb-0 text-sm">' + linha.nomeDemanda + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + dateInicio + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + dateFim + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.tipoDemanda + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.complexidadeHoras + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.statusDemanda + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.idDesenvolvedor + '</p></div></div></td>'
      + '<td class="align-middle d-flex flex-column justify-content-lg-center">'
      + '<button class="btn bg-gradient-warning mx-1" id="avaliacaoDemanda" onclick="ExibirDadosInputAvaliar(' + linha.identificador + ')">Avaliação</button>'
      + '<button class="btn bg-gradient-success mx-1" id="editarDemanda" onclick="ExibirDadosInputAtualizar(' + linha.identificador + ')">Editar</button>'
      + '<button type="submit" class="btn bg-gradient-danger mx-1" id="excluirDemanda" onclick="DeletarDemanda(' + linha.identificador + ')">Excluir</button></td></tr>';
    // console.log(linha);
  });

  texto += "</tbody>";
  $("#registroDemanda").html(texto);
  $("#registroDemanda").DataTable();
}

// ===================================================================== //
// ===== CADASTRAR DEMANDAS ============================================ //
// ===================================================================== //

function CriarObjetoCadastrarDemanda() {
  var demanda = {

    nomeDemanda: $("#nomeCadastroDemanda").val(),
    tipoDemanda: $("#tipoCadastroDemanda").val(),
    idDesenvolvedor: $("#idCadastroDesenvolvedor").val()

  };
  console.log(demanda);
  return demanda;
}

function CadastrarDemanda() {
  if ($('#formulario-cadastro-demanda').parsley().validate()) {
    var objDemanda = CriarObjetoCadastrarDemanda();
    var jsonDemanda = JSON.stringify(objDemanda);

    $.ajax({
      method: "POST",
      url: "http://5.161.81.202:8080/v1/CadastrarDemanda",
      data: jsonDemanda,
      contentType: "application/json"
    }).done(function (resposta) {
      // console.log(resposta);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cadastro realizado com sucesso!'
      });
      $("#modalCadastarDemanda").modal('hide');
      ChamarTabela();
    }).fail(function (details, error) {
      console.log(details);
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Cadastro não realizado!'
      });
    });
  }
}

// ===================================================================== //
// ===== ATUALIZAR DEMANDAS ============================================ //
// ===================================================================== //

// Exibir dados nos inputs para atualizar
function ExibirDadosInputAtualizar(id) {
  EditarDados();

  $.ajax({
    method: "GET",
    url: "http://5.161.81.202:8080/v1/ListarDemandas",
    dataType: "json"
  }).done(function (resposta) {
    // console.log(resposta);
    PegarDados(resposta);
  }).fail(function (details, error) {
    console.log(details);
    console.log(error);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Oops...',
      text: 'Os registros não puderam ser carregados!'
    });
  });

  function PegarDados(obj) {
    $(obj).each(function (index, linha) {
      if(id == linha.identificador) {
        $("#idDemanda").val(linha.identificador);
        $("#nomeDemanda").val(linha.nomeDemanda);
        $("#inicioAtendimento").val(linha.inicioAtendimento);
        $("#fimAtendimento").val(linha.fimAtendimento);
        $("#tipoDemanda").val(linha.tipoDemanda);
        $("#complexidadeHoras").val(linha.complexidadeHoras);
        $("#statusDemanda").val(linha.statusDemanda);
        // $("#idDesenvolvedor").val(linha.idDesenvolvedor);
        $("#idDesenvolvedor option[value=" + linha.idDesenvolvedor + "]").attr('selected', 'selected');
      }
    });
  }
}

function CriarObjetoAtualizarDemanda() {
  var demanda = {

    identificador: $("#idDemanda").val(),
    nomeDemanda: $("#nomeDemanda").val(),
    inicioAtendimento: $("#inicioAtendimento").val(),
    fimAtendimento: $("#fimAtendimento").val(),
    tipoDemanda: $("#tipoDemanda").val(),
    complexidadeHoras: $("#complexidadeHoras").val(),
    statusDemanda: $("#statusDemanda").val(),
    idDesenvolvedor: $("#idDesenvolvedor").val()

  };
  console.log(demanda);
  return demanda;
}

function AtualizarDemanda() {
  if ($('#formulario-atualizacao-demanda').parsley().validate()) {
    var objDemanda = CriarObjetoAtualizarDemanda();
    var jsonDemanda = JSON.stringify(objDemanda);
  
    $.ajax({
      method: "PUT",
      url: "http://5.161.81.202:8080/v1/AtualizarDemanda",
      data: jsonDemanda,
      contentType: "application/json"
    }).done(function (resposta) {
      // console.log(resposta);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Atualização realizada com sucesso!'
      });
      $("#modalAtualizarDemanda").modal('hide');
      ChamarTabela();
    }).fail(function (details, error) {
      console.log(details);
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Atualização não realizada!'
      });
    });
  }
}

// ===================================================================== //
// ===== LISTAR DESENVOLVEDORES ======================================== //
// ===================================================================== //

function ListarDesenvolvedores() {
  $.ajax({
    method: "GET",
    url: "http://5.161.81.202:8030/V1/ListaDesenvolvedores",
    dataType: "json"
  }).done(function (resposta) {
    // console.log(resposta);
    CriarSelectDev(resposta);
  }).fail(function (details, error) {
    console.log(details);
    console.log(error);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Oops...',
      text: 'A lista de desenvolvedores não pode ser carregada!'
    });
  });
}
// Cria select com as opções dos desenvolvedores
function CriarSelectDev(obj) {
  var texto;

  $(obj).each(function (index, linha) {
    texto += '<option value="' + linha.identificador + '">' + linha.identificador + ' - ' + linha.nomeDesenvolvedor + '</option>';
    // console.log(linha);
  });

  $(".listaDev").html(texto);
}

// ===================================================================== //
// ===== DELETAR DEMANDAS ============================================== //
// ===================================================================== //

function DeletarDemanda(id) {
  $.ajax({
    method: "DELETE",
    url: "http://5.161.81.202:8080/v1/DeletarDemanda?idDemanda=" + id,
    dataType: "json"
  }).done(function (resposta) {
    // console.log(resposta);
    Swal.fire({
      title: 'Tem certeza que quer excluir?',
      text: "Você não poderá reverter essa ação!",
      icon: 'warning',
      showCancelButton: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Demanda deletada com sucesso!'
        });
      }
    });
    ChamarTabela();
  }).fail(function (details, error) {
    console.log(details);
    console.log(error);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Oops...',
      text: 'Falha ao excluir registro!'
    });
  });
}

// ===================================================================== //
// ===== AVALIAÇÃO DEMANDAS ============================================ //
// ===================================================================== //

function ExibirDadosInputAvaliar(id) {
  ModalAvaliarDemanda();

  $("#idDemandaAvaliacao").val(id);
}

// Exibir valor do range Qualidade do Atendimento
$("#qualidadeAtendimento").on('mousemove', function() {
  var valor = $("#qualidadeAtendimento").val();
  $("#valorRange1").val(valor);
});

// Exibir valor do range Tempo do Atendimento
$("#tempoAtendimento").on('mousemove', function() {
  var valor = $("#tempoAtendimento").val();
  $("#valorRange2").val(valor);
});

// Exibir valor do range Qualidade Técnica do Dev
$("#qualidadeTecnicaDev").on('mousemove', function() {
  var valor = $("#qualidadeTecnicaDev").val();
  $("#valorRange3").val(valor);
});

function CriarObjetoAvaliarDemanda() {
  var avaliacao = {

    idDemanda: $("#idDemandaAvaliacao").val(),
    qualidadeAtendimento: $("#qualidadeAtendimento").val(),
    tempoAtendimento: $("#tempoAtendimento").val(),
    qualidadeTecnicaDesenvolvedor: $("#qualidadeTecnicaDev").val()

  };
  console.log(avaliacao);
  return avaliacao;
}

function AvaliarDemanda() {
  if ($('#formulario-avaliacao-demanda').parsley().validate()) {
    var objAvaliacao = CriarObjetoAvaliarDemanda();
    var jsonAvaliacao = JSON.stringify(objAvaliacao);
  
    $.ajax({
      method: "POST",
      url: "https://apiavaliacao.aiur.com.br/InserirAvaliacao",
      data: jsonAvaliacao,
      contentType: "application/json"
    }).done(function (resposta) {
      // console.log(resposta);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Avaliação realizada com sucesso!'
      });
      $("#modalAvaliarDemanda").modal('hide');
      ChamarTabela();
    }).fail(function (details, error) {
      console.log(details);
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops...',
        text: 'Avaliação não realizada!'
      });
    });
  }
}