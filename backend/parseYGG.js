const axios = require('axios');
const cheerio = require("cheerio");
const https = require("https")
const spawn = require("child_process").spawn;
const request = require("request")
const fs = require('fs');
const path = require('path')
var jar = request.jar();

const ENGINE = '/engine/search'

let search = async (name, cat, sortValue, todo) => {
    let urls = await JSON.parse(await fs.readFileSync("params.json"))
    let url_rech = urls.addr_rech;
    let quer;

    console.log(parseInt(cat))
    if(parseInt(cat) !== 0){
        quer = {
            name: name,
            description: "",
            file : "",
            uploader : "",
            category : cat,
            sub_category: "all",
            do: 'search',
            order: 'desc',
            sort: sortValue
        }
    }
    else{
        quer = {
            name: name,
            do: 'search',
            order: 'desc',
            sort: sortValue
        }
    }
    console.log(quer)
    request({
        method: 'GET',
        url: url_rech+ENGINE,
        qs: quer,
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
        },
        jar: jar
    }, (err, response, body) => {
        if(err) {console.log(err)}
        if (response.statusCode / 100 >= 4) {
            var error = new Error('Bad status code : ' + response.statusCode)
            error.body = body;
            console.log(error);
        }

        var $ = cheerio.load(body);

        var results = [];
        $('.table-responsive.results tbody tr').each((i, tr) => {
            results.push({
                // line: $(tr).text(),
                link: $(tr).find('#torrent_name').attr('href'),
                title: $(tr).find('#torrent_name').text().trim(),
                weight: $($(tr).find('td')[5]).text(),
                seeds: $($(tr).find('td')[7]).text(),
            });
        })

        todo(results);
    });
}


module.exports = {
    search
}
