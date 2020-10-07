async function newSearch() {
    var search = document.getElementById("searchbox").value;
    var cs = await browser.storage.local.get("currentSearches");
    

    var elem = document.getElementById("category");
    var cat = elem.options[elem.selectedIndex].value;

    window.location.href="../searchResults/searchResults.html?search="+search.replace(" ","+")+"&category="+cat;

}

async function deleteSearch(search) {
    var cs = await browser.storage.local.get("currentSearches");

    for( var i = 0; i < cs.currentSearches.length; i++){ 
        if ( cs.currentSearches[i] === search) {
          cs.currentSearches.splice(i, 1); 
        }
     }
    await browser.storage.local.set(cs);
    window.location.reload();
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
    titre.addEventListener("click",function(){
        var elem = document.getElementById("category");
        var cat = elem.options[elem.selectedIndex].value;
        window.location.href="../searchResults/searchResults.html?search="+text.replace(" ","+")+"&category="+cat;
    })

    var imgButton = document.createElement("button");
    imgButton.setAttribute("class","btn btn-danger delete-button btn-sm");
    imgButton.addEventListener("click",function(){
        deleteSearch(text);
    });

    var imageDel = document.createElement("img");
    imageDel.setAttribute("class", "col delete-search");
    imageDel.setAttribute("src","../../icons/trashcan.png");
    imageDel.setAttribute("height","17");
    imageDel.innerHTML = "O";

    imgButton.appendChild(imageDel);

    row.appendChild(titre);
    row.appendChild(imgButton);

    item.appendChild(row);

    liste_search.appendChild(item);
}

async function loadList() {
    var listeSearch = await browser.storage.local.get("currentSearches");

    for(const e of listeSearch.currentSearches){
        insertElementIntoSearchList(e);
    }
}

function clearStorage(){
    browser.storage.local.set({"currentSearches": []});
    console.log("Storage cleared !")
}

if(browser.storage.local.get("currentSearches",(elem)=>{
    console.log(Object.entries(elem))
    if(Object.entries(elem).length > 0){
        clearStorage();
    }
}))
loadList();
document.querySelector("form").addEventListener("submit", newSearch);

document.getElementById("settings-button").addEventListener("click",function(){
    window.location.href = "../settings/settings.html"
})