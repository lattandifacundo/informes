const cheerio = require('cheerio');
const request = require('request-promise');

if(process.env.TOKEN == undefined){
    const dotenv = require('dotenv');
    dotenv.config();
}

async function requestBcra(text){
    const $ = await request({
        uri: process.env.BCRA_URL,
        transform: body => cheerio.load(body)
    });

    var j = 0;
    var toGet = "-1";
    $('tbody tr td').each((i, el) => {
        const data = $(el).text().trim();
        if(j==2){
            toGet = data.replace(/(\n+)/g, '');
            j=0;
        }
        if(j==1) j++;
        if(data.includes(text)) j++;
    });

    if(toGet == "-1") console.log('Error in BCRA Response');
    return toGet;
}

exports.requestBcra = requestBcra;