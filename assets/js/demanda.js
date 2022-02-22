//Modal Cadastrar Demanda
$(document).ready(function () {
  // Abrir modal na página carregada
  $("#cadastrarDemanda").click(function () {
    $("#tituloModal").html("Nova Demanda");
    $("#modalDemanda").modal('show');
    $('#salvarDemanda').show();
    $('#atualizarDemanda').hide();
    ListarDesenvolvedores();
    
    //Salvar dados cadastro
    $('#salvarDemanda').submit(function (e) {
      e.preventDefault();
      CadastrarDemanda();
    });
  });

  // Fechar modal clicando no botão
  $(".cancelarDemanda").click(function () {
    $("#modalDemanda").modal('hide');
  });
});

//Modal Atualizar Demanda
function EditarDados() {
  $(document).ready(function () {
    // Abrir modal na página carregada
    $("#tituloModal").html("Atualizar Demanda");
    $("#modalDemanda").modal('show');
    $('#atualizarDemanda').show();
    $('#salvarDemanda').hide();
    ListarDesenvolvedores();
    
    //Salvar dados atualização
    $('#atualizarDemanda').submit(function (e) {
      e.preventDefault();
      AtualizarDemanda();
    });

    // Fechar modal clicando no botão
    $(".cancelarDemanda").click(function () {
      $("#modalDemanda").modal('hide');
    });
  });
}

//Exibir dados nos inputs para atualizar
function ExibirDadosInput(dados) {
  EditarDados();

  var linha = $(dados).parents("tr");
  var coluna = linha.children("td");
  $("#nomeDemanda").val($(coluna[0]).text());
  $("#inicioAtendimento").val($(coluna[1]).text());
  $("#fimAtendimento").val($(coluna[2]).text());
  $("#tipoDemanda").val($(coluna[3]).text());
  $("#complexidadeHoras").val($(coluna[4]).text());
  $("#statusDemanda").val($(coluna[5]).text());
  $("#idDesenvolvedor").val($(coluna[6]).text());
}

$.ajax({
  method: "GET",
  url: "http://apidemandas.aiur.com.br/v1/ListarDemandas",
  dataType: "json"
}).done(function (resposta) {
  // console.log(resposta);
  CriarTabela(resposta);
}).fail(function (details, error) {
  console.log(details);
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
      + '<p class="text-xs text-secondary mb-0">'
        + (linha.inicioAtendimento != null ? (linha.inicioAtendimento).replace('T', ' | ') : linha.inicioAtendimento)
        + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">'
        + (linha.fimAtendimento != null ? (linha.fimAtendimento).replace('T', ' | ') : linha.fimAtendimento)
        + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.tipoDemanda + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.complexidadeHoras + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.statusDemanda + '</p></div></div></td>'
      + '<td><div class="d-flex px-2 py-1"><div class="d-flex flex-column justify-content-center">'
      + '<p class="text-xs text-secondary mb-0">' + linha.idDesenvolvedor + '</p></div></div></td>'
      + '<td class="align-middle d-flex justify-content-lg-center">'
      + '<button class="btn bg-gradient-success my-2 mx-1" onclick="ExibirDadosInput(this)">Editar</button>'
      + '<button class="btn bg-gradient-danger my-2 mx-1" onclick="DeletarDemanda(' + linha.identificador + ')">Excluir</button></td></tr>';
    // console.log(linha);
  });

  texto += "</tbody>";
  $("#registroDemanda").html(texto);
  $("#registroDemanda").DataTable();
}

function AtualizarDemanda() {
  if ($('#formulario-cadastro-demanda').parsley().validate()) {
    var objDemanda = CriarObjetoDemanda();
    var jsonDemanda = JSON.stringify(objDemanda);
  
    $.ajax({
      method: "PUT",
      url: "http://apidemandas.aiur.com.br/v1/AtualizarDemanda",
      data: jsonDemanda,
      contentType: "application/json"
    }).done(function (resposta) {
      // console.log(resposta);
      Swal.fire(
        'Feito!',
        'Demanda atualizada com sucesso!',
        'success'
      );
    }).fail(function (details, error) {
      console.log(details);
      // alert();
      swal.fire(
        'Erro',
        details.responseText,
        'error'
      );
      console.log(error);
    });
  }
}

function ListarDesenvolvedores() {
  $.ajax({
    method: "GET",
    url: "https://apidesenvolvedor.aiur.com.br/V1/ListaDesenvolvedores",
    dataType: "json"
  }).done(function (resposta) {
    // console.log(resposta);
    CriarSelect(resposta);
  }).fail(function (details, error) {
    console.log(details);
    // alert();
    swal.fire(
      'Erro',
      details.responseText,
      'error'
    );
    console.log(error);
  });
}
function CriarSelect(obj) {
  var texto;

  $(obj).each(function (index, linha) {
    texto += '<option value="' + linha.identificador + '">' + linha.identificador + ' - ' + linha.nomeDesenvolvedor + '</option>';
    // console.log(linha);
  });

  $("#idDesenvolvedor").html(texto);
}

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
    var objDemanda = CriarObjetoDemanda();
    var jsonDemanda = JSON.stringify(objDemanda);

    $.ajax({
      method: "POST",
      url: "http://apidemandas.aiur.com.br/v1/CadastrarDemanda",
      data: jsonDemanda,
      contentType: "application/json"
    }).done(function (resposta) {
      // console.log(resposta);
      Swal.fire(
        'Feito!',
        'Demanda cadastrada com sucesso!',
        'success'
      );
    }).fail(function (details, error) {
      console.log(details);
      // alert();
      Swal.fire(
        'Erro!',
        details.responseText,
        'error'
      );
      console.log(error);
    });
  }
}

function DeletarDemanda(id) {
  $.ajax({
    method: "DELETE",
    url: "http://apidemandas.aiur.com.br/v1/DeletarDemanda?idDemanda=" + id,
    dataType: "json"
  }).done(function (resposta) {
    // console.log(resposta);
    Swal.fire(
      'Feito!',
      'Demanda deletada com sucesso!',
      'success'
    );
  }).fail(function (details, error) {
    console.log(details);
    // alert();
    swal.fire(
      'Erro',
      details.responseText,
      'error'
    );
    console.log(error);
  });
}