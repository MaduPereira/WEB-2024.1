function validateForm() { //se vazio manda a mensagem Te amo
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Te Amo");
      return false;
    }
}

function myMove() { //animaçao
    let id = null;
    const elem = document.getElementById("animate");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        if (pos == 350) {
        clearInterval(id);
        } else {
        pos++;
        elem.style.top = pos + 'px';
        elem.style.left = pos + 'px';
        }
    }
}

function myFunction() { //rescrever a pagina
    document.open("text/html","replace");
    document.write("<h2>Só quer mamão, só quer mel...</h2>");
    document.close();
}

//primeira versao só nome do aluno
let turma1 = [];
function incluir1(){
    let novoestudante1 =
    document.getElementById("estudante").value;
    turma1.push(novoestudante1);
    alert(novoestudante1 + " novo aluno inserido na Turma!");
    document.getElementById("estudante").value = "";
}
function verLista1(){
    let lista1 = "";
    for (i=0; i<turma1.length; i++){
        lista1 += turma1[i];
        lista1 += "<br>";
    }
    document.getElementById("listadealunos").innerHTML =
    lista1;
}

//segunda versao nome do aluno + turma
let turma2 = [];
function incluir2(){
    let novoestudante2 = document.getElementById("estudante").value;
    turma2.push(novoestudante2);
    alert(novoestudante2 + " novo aluno inserido na Turma!");
    document.getElementById("estudante").value = "";
}
function verLista2(){
    let lista2 = "<table class='tabela'>";
    lista2 += "<br>"
    lista2 += "<tr>";
    lista2 += " <th>Aluno</th>";
    lista2 += " <th>Turma</th>";
    lista2 += "</tr>";
    for (i=0; i<turma2.length; i++){
        lista2 += "<tr><td>";
        lista2 += turma2[i];
        lista2 += "</td><td>Turma A</td></tr>";
    }
    lista2 += "</table>";
    document.getElementById("listadealunos").innerHTML = lista2;
}

//terceira versao 
let turma3 = [];
function incluir3(){
    let novoestudante3 = document.getElementById("estudante").value;
    turma3.push(novoestudante3);
    alert(novoestudante3 + " novo aluno inserido na Turma!");
    document.getElementById("estudante").value = "";
}
function verLista3(){
    let lista3 = "<table class='tabela'>";
    lista3 += "<tr>";
    lista3 += " <th>Aluno</th>";
    lista3 += " <th>Turma</th>";
    lista3 += "</tr>";
    for (i=0; i<turma3.length; i++){
        if (i%2==0) {lista3 += "<tr class='par'><td>";}
        else {lista3 += "<tr class='impar'><td>";}
        lista3 += turma3[i];
        lista3 += "</td><td>Turma A</td></tr>";
    }
    lista3 += "</table>";
    document.getElementById("listadealunos").innerHTML = lista3;
}