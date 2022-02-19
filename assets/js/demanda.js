
//Modal Cadastrar Demanda
$(document).ready(function () {
  // Abrir modal na página carregada
  $("#cadastrarDemanda").click(function () {
    $("#tituloModal").html("Nova Demanda");
    $("#modalCadastrarDemanda").modal('show');
  });

  // Fechar modal clicando no botão
  $("#modalCloseCadastrarDemanda").click(function () {
    $("#modalCadastrarDemanda").modal('hide');
  });
  $("#cancelarCadastrarDemanda").click(function () {
    $("#modalCadastrarDemanda").modal('hide');
  });
});

//Modal Atualizar Demanda
$(document).ready(function () {
  // Abrir modal na página carregada
  $("#atualizarDemanda").click(function () {
    $("#tituloModal").html("Atualizar Demanda");
    $("#modalAtualizarDemanda").modal('show');
  });

  // Fechar modal clicando no botão
  $("#modalCloseAtualizarDemanda").click(function () {
    $("#modalAtualizarDemanda").modal('hide');
  });
  $("#cancelarAtualizarDemanda").click(function () {
    $("#modalAtualizarDemanda").modal('hide');
  });
});


$.ajax({
  method: "GET",
  url: "http://alunodv03:1012/v1/ListarDemandas",
  dataType: "json"
}).done(function (resposta) {
  console.log(resposta);
  CriarTabela(resposta);
}).fail(function (details, error) {
  console.log(err);
  alert();
  swal.fire(
    'Erro',
    details.responseText,
    'error'
  );
  console.log(error);
});
function CriarTabela(obj) {
  var texto = '<thead><tr>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nome da Demanda</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Início do Atendimento</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Término do Atendimento</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tipo da Demanda</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Complexidade Horas</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status da Demanda</th>'
    + '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID do Desenvolvedor</th>'
    + '<th></th></tr></thead><tbody>';

  $(obj).each(function (index, linha) {
    texto += '<tr><td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<h6 class="mb-0 text-sm">' + linha.nomeDemanda + '</h6></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + (linha.inicioAtendimento).replace('T', ' | ') + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + (linha.fimAtendimento).replace('T', ' | ') + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.tipoDemanda + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.complexidadeHoras + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.statusDemanda + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.idDesenvolvedor + '</p></div></div></td>'
      + '<td class="align-middle d-flex justify-content-lg-center">'
      + '<button class="btn bg-gradient-success my-2 mx-1" value=" ' + linha.identificador + ' ">Editar</button>'
      + '<button class="btn bg-gradient-danger my-2 mx-1" value=" ' + linha.identificador + ' ">Excluir</button></td></tr>';
    // console.log(linha);
  });

  texto += "</tbody>";
  $("#registroDemanda").html(texto);
  $("#registroDemanda").DataTable();
}

function AtualizarDemanda() {
  $.ajax({
    method: "PUT",
    url: "http://alunodv03:1012/v1/AtualizarDemanda",
    dataType: "json"
  }).done(function (resposta) {
    console.log(resposta);
    PegarId(resposta);
  }).fail(function (details, error) {
    console.log(err);
    alert();
    swal.fire(
      'Erro',
      details.responseText,
      'error'
    );
    console.log(error);
  });
}

$('#cadastrarDemanda').submit(function (e) {
  e.preventDefault()
  ListarDesenvolvedores()
});
function ListarDesenvolvedores() {
  $.ajax({
    method: "GET",
    url: "http://alunodv03:1013/v1/ListarDesenvolvedores",
    dataType: "json"
  }).done(function (resposta) {
    console.log(resposta);
    CriarTabela(resposta);
  }).fail(function (details, error) {
    console.log(err);
    alert();
    swal.fire(
      'Erro',
      details.responseText,
      'error'
    );
    console.log(error);
  });
}
function CriarSelect() {
  var texto;

  $(obj).each(function (index, linha) {
    texto += '<option value="' + linha.identificador + '">' + linha.identificador + '</option>'
    // console.log(linha);
  });

  $("#selectIdDesenvolvedor").html(texto);
}

$('#salvarCadastrarDemanda').submit(function (e) {
  e.preventDefault()
  CadastrarDemanda()
});

function CriarObjetoDemanda() {
  var demanda = {

    nomeDemanda: $("#nomeDemanda").val(),
    inicioAtendimento: $("#inicioAtendimento").val(),
    fimAtendimento: $("#fimAtendimento").val(),
    tipoDemanda: $("#tipoDemanda").val(),
    complexidadeHoras: $("#complexidadeHoras").val(),
    statusDemanda: $("#statusDemanda").val(),
    idDesenvolvedor: $("#idDesenvolvedor").val()

  };
  console.log(demanda)
  return demanda;
}

function CadastrarDemanda() {
  if ($('#formulario-cadastro-demanda').parsley().validate()) {
    var objDemanda = CriarObjetoDemanda()
    var jsonDemanda = JSON.stringify(objDemanda)

    $.ajax({
      method: "POST",
      url: "http://alunodv03:1012/v1/CadastrarDemanda",
      data: jsonDemanda,
      contentType: "application/json"
    }).done(function (resposta) {
      console.log(resposta)
      Swal.fire(
        'Feito!',
        'Cliente demanda cadastrada com sucesso',
        'success'
      )
    }).fail(function (details, error) {
      console.log(details)
      // alert()
      Swal.fire(
        'Erro!',
        details.responseText,
        'error'
      );
      console.log(error)
    });
  }
}