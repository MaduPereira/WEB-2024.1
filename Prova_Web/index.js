function passarPag() { //rescrever a pagina
    document.open("text/html","replace");
    document.replaceChild(index2.html, old);
    document.close();
}

let Cadastro = [];
function incluir(){
    let novoregistro = document.getElementById("registro").value;
    Cadastro.push(novoregistro);
    alert(novoregistro + " novo registro da Covid 19");
    document.getElementById("registro").value = "";
    verregistro();
}
function verregistro(){
    let registro = "<table class='tabela'>";
    registro += "<tr>";
    registro += " <th>Estado</th>";
    registro += " <th>Data</th>";
    registro += "</tr>";
    for (i=0; i<Cadastro.length; i++){
        if (i%2==0) {registro += "<tr class='par'><td>";}
        else {registro += "<tr class='impar'><td>";}
        registro += Cadastro[i];
        registro += "</td><td>Estado A</td></tr>";
    }
    registro += "</table>";
    document.getElementById("relatorio").innerHTML = registro;
}