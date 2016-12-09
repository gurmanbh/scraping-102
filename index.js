// first pull in the modules that you have installed.

var request = require('request')
var cheerio = require('cheerio')
// exercise 1 
// Find the number of datasets (resources) on data.gov.in
// var url = "http://data.gov.in/"

// request(url, function(err, response, body){
//     // if (!err) means if there is no error. 
//     // response.statusCode checks if the fetch was successful. 
//     if (!err & response.statusCode == 200){
//         // if both are true, we run our regular code.
//          var $ = cheerio.load(body);
//          console.log($('.resources .home-stats-count').text())
//     } else {
//         console.log('error. fetch incomplete.')
//     }
// })

// exercise 2
// find the number of missing mobile complaints on zipnet
// var url = "http://zipnet.in/index.php?page=missing_mobile_phones_search&criteria=browse_all"
// request(url, function(err, response, body){
//     // if (!err) means if there is no error. 
//     // response.statusCode checks if the fetch was successful. 
//     if (!err & response.statusCode == 200){
//         // if both are true, we run our regular code.
//          var $ = cheerio.load(body);
//          console.log($('#AutoNumber17').text().split('of')[1].split(" Page")[0].trim())
//     } else {
//         console.log('error. fetch incomplete.')
//     }
// })

// exercise 3
// scrape some missing phones
var url = "http://zipnet.in/index.php?page=missing_mobile_phones_search&criteria=browse_all"
request(url , function(err, response, body){
        if (!err & response.statusCode == 200){
            var $ = cheerio.load(body);
            var $tables = $('body').find('#AutoNumber15,#AutoNumber16')
            console.log($tables.length)
            $tables.each(function(index,e){
                var obj = {}
                var $rows = $(e).find('tr')

                $rows.each(function(i,row){
                    if ($(row).text().trim()!=''){
                        obj[slugify($($(row).find('td[rowspan!="10"]')[0]).text())]=$($(row).find('td[rowspan!="10"]')[1]).text().trim()
                        obj[slugify($($(row).find('td[rowspan!="10"]')[2]).text())]=$($(row).find('td[rowspan!="10"]')[3]).text().trim()
                    }
                })
                obj.id = index;
                console.log(obj)
            })
        } else {
            console.log('error!');
        }
    })

function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}