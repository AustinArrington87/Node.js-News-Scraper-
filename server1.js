var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // New York Times Business Page Latest News - Top 3 w Timestamp
  url = 'http://www.nytimes.com/pages/business/index.html?hpw&rref&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var sectionHead, sectionMiddle, sectionEnd;
      var json = { sectionHead : "", sectionMiddle : "", sectionEnd : ""};

      $('.scrollContent').filter(function(){
        var data = $(this);
        sectionHead = data.children().first().text().trim();
  		sectionMiddle = data.children().eq(2).text().trim();
  		sectionEnd = data.children().eq(3).text().trim();
        json.sectionHead = sectionHead;
        json.sectionMiddle = sectionMiddle;
        json.sectionEnd = sectionEnd;
      })

    }

    fs.writeFile('output1.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;