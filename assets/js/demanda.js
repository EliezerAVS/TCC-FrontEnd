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
    $('#salvarDemanda').submit(function (e) {
      e.preventDefault();
      CadastrarDemanda();
    });
  });

  // Fechar modal clicando no botão
  $(".cancelarDemanda").click(function () {
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
    $('#atualizarDemanda').submit(function (e) {
      e.preventDefault();
      AtualizarDemanda();
    });

    // Fechar modal clicando no botão
    $(".cancelarDemanda").click(function () {
      $("#modalAtualizarDemanda").modal('hide');
    });
  });
}

// ===================================================================== //
// ===== LISTAR DEMANDAS =============================================== //
// ===================================================================== //

$.ajax({
  method: "GET",
  url: "http://5.161.81.202:8080/v1/ListarDemandas",
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
      + '<button class="btn bg-gradient-warning mx-1" id="avaliacao" onclick="">Avaliação</button>'
      + '<button class="btn bg-gradient-success mx-1" id="editarDemanda" onclick="ExibirDadosInput(this)">Editar</button>'
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

    nomeDemanda: $("#idCadastroDemanda").val(),
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

// ===================================================================== //
// ===== ATUALIZAR DEMANDAS ============================================ //
// ===================================================================== //

// Exibir dados nos inputs para atualizar
function ExibirDadosInput(dados) {
  EditarDados();

  var linha = $(dados).parents("tr");
  var coluna = linha.children("td");
  $("#idDemanda").val($(coluna[0]).text());
  $("#nomeDemanda").val($(coluna[1]).text());
  $("#inicioAtendimento").val($(coluna[2]).text());
  $("#fimAtendimento").val($(coluna[3]).text());
  $("#tipoDemanda").val($(coluna[4]).text());
  $("#complexidadeHoras").val($(coluna[5]).text());
  $("#statusDemanda").val($(coluna[6]).text());
  $("#idDesenvolvedor").val($(coluna[7]).text());
}

function CriarObjetoAtualizarDemanda() {
  var demanda = {

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

function AtualizarDemanda(id) {
  if ($('#formulario-atualizacao-demanda').parsley().validate()) {
    var objDemanda = CriarObjetoAtualizarDemanda();
    var jsonDemanda = JSON.stringify(objDemanda);
  
    $.ajax({
      method: "PUT",
      url: "http://5.161.81.202:8080/v1/AtualizarDemanda?idDemanda=" + id,
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
// Cria select com as opções dos desenvolvedores
function CriarSelect(obj) {
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

  // Atualizar página após excluir registro
  // location.reload();
}

// ===================================================================== //
// ===== AVALIAÇÃO DEMANDAS ============================================ //
// ===================================================================== //

