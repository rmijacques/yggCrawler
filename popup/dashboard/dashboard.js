

function insertElementIntoSearchList(text) {
    var liste_search = document.querySelector('#liste_search');

    var item = document.createElement("li")
    item.setAttribute("class","list-group-item");

    var row = document.createElement("div");
    row.setAttribute("class","row");

    var titre = document.createElement("div");
    titre.setAttribute("class", "col-9");
    titre.innerHTML = text;

    var actu = document.createElement("div");
    actu.setAttribute("class", "col actualize-button");
    actu.innerHTML = "O";

    row.appendChild(titre);
    row.appendChild(actu);

    item.appendChild(row);

    liste_search.appendChild(item);
}

insertElementIntoSearchList("ds");
