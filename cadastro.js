function fGetUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
};

function getUserEmail(hash) {
  var formData = {Hash:String(hash)};
  console.log(formData);
  console.log("Enviando ao banco de dados...");
  $.ajax({
      url : "get_hash.php",
      type: "post",
      data : formData,
      success: function(result)
      {
          result = JSON.parse(result);
          if (result != "hash_invalida") {
            document.getElementById("cad_nome").value = result["User"];
            document.getElementById("cad_email").value = result["Email"];
          }
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
          console.log('Erro recuperando a hash');
      },
  });
}

document.getElementById("cad_enviar").onclick = function() {
  var nome = document.getElementById("cad_nome").value;
  var email = document.getElementById("cad_email").value;

  if (nome == "" || email == "") {
    alert("Nome e/ou email inválidos! :(")
  }
  else {
    var formData = {User:String(nome),Email:String(email)};
    console.log(formData);
    console.log("Enviando ao banco de dados...");
    $.ajax({
        url : "confirmation_mail.php",
        type: "post",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
            console.log('Sucesso na insercao.');
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log('Erro inserindo no db');
        },
    });
  }

}

//Inicializa com os valores do url
var hash = fGetUrlParameter("hash");
getUserEmail(hash);
