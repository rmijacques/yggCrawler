async function newSearch() {
    var search = document.getElementById("searchbox").value;
    var cs = await browser.storage.local.get("currentSearches");
    console.log(cs.currentSearches);
    cs.currentSearches.push(search);
    await browser.storage.local.set(cs);
}


function insertElementIntoSearchList(text) {
    var liste_search = document.querySelector('#liste_search');

    var item = document.createElement("li");
    item.setAttribute("class", "list-group-item");

    var row = document.createElement("div");
    row.setAttribute("class", "row");

    var titre = document.createElement("div");
    titre.setAttribute("class", "col-9 overflow-hidden");
    titre.innerHTML = text;

    var actu = document.createElement("img");
    actu.setAttribute("class", "col delete-search");
    actu.setAttribute("src","../../icons/trashcan.png");
    actu.setAttribute("height","30");
    actu.innerHTML = "O";

    row.appendChild(titre);
    row.appendChild(actu);

    item.appendChild(row);

    liste_search.appendChild(item);
}

async function loadList() {
    var listeSearch = await browser.storage.local.get("currentSearches");
    console.log(listeSearch.currentSearches);
    for(const e of listeSearch.currentSearches){
        insertElementIntoSearchList(e);
    }
}

function clearStorage(){
    browser.storage.local.set({"currentSearches": []});
}

//clearStorage();
loadList();
document.querySelector("form").addEventListener("submit", newSearch);