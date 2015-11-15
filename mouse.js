function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function getRandomArbitrary(min, max) {
    return( Math.random() * (max - min) + min);
}

function changeImage(canvas) {
    var data = {Data: "aux"};
    $.ajax({
        url : "changeimage.php",
        type : "POST",
        data : data,
        success: function (result)
        {
           canvas.style.backgroundImage = 'url(' + String(result) + ')';
           document.getElementById("im_name").value = String(result);
           console.log("Imagem trocada com sucesso.")
        },
        error : function ()
        {
           console.log("Erro trocando a imagem.");
        },
    });

}

function ValidaUserEmail(nome, email) {
  if (nome == "" || email == "") {
    return true;
  }
  else {
    return false;
  }
}

function sendToDB(user, email, image, retangulos) {
    var formData = {User:String(user),Email:String(email),Image:image,Rect:String(retangulos)};
    console.log(formData);
    console.log("Enviando ao banco de dados...");
    $.ajax({
        url : "savedata.php",
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

function reload() {
    location.reload()
}

function initDraw(canvas) {
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;


    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
    }

    canvas.onmouseup = function(e) {
        if (element != null) {
            el_list.push(element);
            element = null;
            canvas.style.cursor = "default";
            console.log("Fim do retangulo.");
        }


    }

    canvas.onmousedown = function (e) {
        /*if (element !== null) {
            el_list.push(element);
            element = null;
            canvas.style.cursor = "default";
            console.log("finsihed.");
        }*/
        if (element == null) {
            console.log("Inicio do retangulo.");
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement('div');
            element.className = 'rectangle'
            element.id = 'rect'
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            canvas.appendChild(element)
            canvas.style.cursor = "crosshair";
        }
    }
}


var canvas = document.getElementById('idCanvas');
//canvas.style.backgroundImage = 'url(15_de_Novembro_600_90.jpg)'
changeImage(canvas);
console.log(canvas);

var el_list = [];
initDraw(document.getElementById('idCanvas'), el_list);

document.getElementById("submit").onclick = function(){
  var nome = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var valida = ValidaUserEmail(nome, email);

  if (valida) {
    document.getElementById("error").style.display = null;
  }
  else {
    document.getElementById("error").style.display = "none";
    console.log(el_list);
    //console.log(canvas);

    //Creating the rectangles
    var data = "";
    for (var i=0; i<el_list.length; i++) {
        var rect = canvas.getBoundingClientRect();

        var left = (parseInt(el_list[i].style.left) - rect.left);
        var top = (parseInt(el_list[i].style.top) - rect.top);
        data += "(" + String(left) + "px, " + String(top) + "px, " + el_list[i].style.width + ", " + el_list[i].style.height + ")";
    }
    //Creating the lat_lon
    //data_lat_lon = "(" + String(lat_lon[0]) + ", " + String(lat_lon[1]) + ")";
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    im_name = document.getElementById("im_name").value;

    sendToDB(name, email, im_name, data);
    //download(num + '.txt', data);

    //Remove all elements
    while (el_list.length > 0) {
        el_list[0].parentNode.removeChild(el_list[el_list.length-1])
        el_list.pop()
    }
    console.log("Todos retangulos removidos.");

    changeImage(canvas);
  }
}
document.getElementById("submit-empty").onclick = function() {
  var nome = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var valida = ValidaUserEmail(nome, email);

  if (valida) {
    document.getElementById("error").style.display = null;
  }
  else {
    document.getElementById("error").style.display = "none";
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    im_name = document.getElementById("im_name").value;

    //Send with no data
    console.log("Enviar sem retangulos.");
    sendToDB(name, email, im_name, "");

    //Remove all elements
    while (el_list.length > 0) {
        el_list[0].parentNode.removeChild(el_list[el_list.length-1])
        el_list.pop()
    }
    console.log("Todos retangulos removidos.");

    changeImage(canvas);
  }

}
document.getElementById("skip").onclick = function() {
    //Remove all elements
    while (el_list.length > 0) {
        el_list[0].parentNode.removeChild(el_list[el_list.length-1])
        el_list.pop()
    }
    console.log("Todos retangulos removidos.");

    changeImage(canvas);
}
document.getElementById("undo").onclick = function(){
    if (el_list.length > 0) {
        console.log("Ultimo retangulo removido.")
        el_list[el_list.length-1].parentNode.removeChild(el_list[el_list.length-1])
        el_list.pop()
    }
    else {
        console.log("Sem mais retangulos.")

    }
}
