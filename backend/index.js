const express = require('express');
const app = express();
const fs = require('fs')
var cors = require('cors')
var bodyParser = require("body-parser");
const {
  search
} = require("./parseYGG")



app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/newSearch/:search/:category', async function (req, res) {
  let searchContent = req.params.search;
  let category = req.params.category;

  console.log("requete recue")
  search(searchContent,category,"seed",(item)=>{
    if(item.length == 0){
      res.json({"results": 0});
    } else{
      res.send(item);
    }

  });
})

app.post('/newSettings', function(req, res){
  console.log(req.body);
  let adresses = {
    "addr_site" : req.body.adresseNormale,
    "addr_rech" : req.body.adresseRecherche
  };
  console.log(adresses)
  fs.writeFileSync("./params.json",JSON.stringify(adresses),{ flag: 'w'});
  res.send({"ok" : true});
})

app.listen(3000, function () {
  console.log('Serveur lancé sur le port 3000')
})