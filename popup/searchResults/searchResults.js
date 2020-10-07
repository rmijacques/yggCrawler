async function saveSearch(search){
    var cs = await browser.storage.local.get("currentSearches");
    console.log(cs)
    cs.currentSearches.push(search);
    browser.storage.local.set(cs);
    document.getElementById("save-img").setAttribute("src","../../icons/save-done.png")

}

function addElemToList(elem){
    var titre = elem.title;
    var link = elem.link;
    var seeds = elem.seeds;
    var weight = elem.weight;

    var listItem = document.createElement("li");
    listItem.setAttribute("class","list-group-item");

    var row = document.createElement("div");
    row.setAttribute("class","row text-center");

    var titreHtml = document.createElement("a");
    titreHtml.setAttribute("href",link)
    titreHtml.setAttribute("class","break-text overflow-hidden no-padding");
    titreHtml.innerHTML = titre;

    var seedHtml = document.createElement("div");
    seedHtml.setAttribute("class","col no-padding seeds text-center");
    seedHtml.innerHTML = "Seeds: "+seeds;

    var weigthHtml = document.createElement("div");
    weigthHtml.setAttribute("class","col no-padding torrent-weight text-center overflow-hidden");
    weigthHtml.innerHTML = "Size: "+weight;


    row.appendChild(seedHtml);
    row.appendChild(weigthHtml);
    listItem.appendChild(titreHtml);
    listItem.appendChild(row);

    document.getElementById("list-results").appendChild(listItem);

}

var url_string = window.location.href;
var url = new URL(url_string);
var searchName = url.searchParams.get("search");
var category = url.searchParams.get("category");

document.getElementById("search-name").innerHTML = searchName;



var request = new XMLHttpRequest()
request.open('GET', "http://localhost:3000/newSearch/"+searchName+"/"+category, true)
request.onload = function() {
  console.log("re")
  var data = JSON.parse(this.response)
  if(data.results !== undefined){
      var get = document.getElementById("conteneur-results")
      get.setAttribute("style","color:red;margin-top: 40px;margin-bottom:40px;text-align:center;font-size: 2.5em;font-waight: bold;")
        get.innerHTML = "Pas de résultats";
  }
  for(var elem of data){
      addElemToList(elem);
  }
}

request.send()

document.getElementById("return-button").addEventListener("click",function(){
    window.location.href ="../dashboard/dashboard.html"
})

document.getElementById("save-button").addEventListener("click",function(){
    saveSearch(searchName);
})





