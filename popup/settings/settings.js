document.getElementById("maj-btn").addEventListener("click", function () {
    var adresse_normale = document.getElementById("adresse-site").value;
    var adresse_recherche = document.getElementById("adresse-recherche").value;
    var adresses = {
        "adresseNormale": adresse_normale,
        "adresseRecherche": adresse_recherche 
    }
    browser.storage.local.set({"settings" : adresses})

    var request = new XMLHttpRequest()

    request.open('POST', "http://localhost:3000/newSettings", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(adresses));
    request.onload = function () {
        console.log("re")
        var data = JSON.parse(this.response)
        for (var elem of data) {
            addElemToList(elem);
        }
    }
})

browser.storage.local.get("settings").then((val)=>{
    console.log(val)
    document.getElementById("adresse-site").setAttribute("placeholder",val.settings.adresseNormale)
    document.getElementById("adresse-recherche").setAttribute("placeholder",val.settings.adresseRecherche)
});


document.getElementById("return-button").addEventListener("click", function () {
    window.location.href = "../dashboard/dashboard.html"
})