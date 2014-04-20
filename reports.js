var helpers = require('./helpers')
  , validateHtml = require('html-validator')
  , validateWcag = require('wcag-validator')
  , xml2js = require('xml2js')
  , parser = new xml2js.Parser()
  , acheckerID = 'insert-your-achecker-webserviceID-here';

function mkCsvRowFromArray(arr){
  var a = arr.map(function(i){
        return '"' + i + '"'
      });
  return a.join(',') + '\r\n'
}

module.exports = {

  mkReportFresh: function(page){
    helpers.getPageDaysSinceLastUpdate(page, function(err, data){
      if(err){
        console.error(err);
      } else {
        readStream.push(data);
      }
    });
  },
  mkReportLinks: function(pages, stream){
    var pagesLength = pages.length
      , headers = mkCsvRowFromArray(['location', 'link']);

    stream.push(headers);

    for(var i=0;i < pagesLength; i++){
      var page = pages[i]
        , location = page.loc[0];

      helpers.getPageLinks(location, function(err, data){
        if(err){
          console.error(err);
        } else {

          var linksLength = data.links.length;

          for(var i=0;i < linksLength; i++){
            var link = data.links[i]
              , ret = mkCsvRowFromArray([data.url, link]);

            stream.push(ret);
          }
        }
      });

    }
  },
  mkReportDeadlinks: function(pages, stream){
    var pagesLength = pages.length
      , headers = mkCsvRowFromArray(['location', 'link', 'status_code']);

    stream.push(headers);

    for(var i=0;i < pagesLength; i++){
      var page = pages[i]
        , location = page.loc[0];

      helpers.getPageLinks(location, function(err, data){
        if(err){
          console.error(err);
        } else {
          helpers.checkPageLinks(data.url, stream, data.links);
        }
      });
    }
  },
  mkReportHealth: function(pages, stream){
    var pagesLength = pages.length
      , headers = mkCsvRowFromArray(['location', 'status_code']);

    stream.push(headers);

    for(var i=0;i < pagesLength; i++){
      var page = pages[i]
        , location = page.loc[0];

      helpers.checkPageStatus(location, function(err, data){
        if(err){
          console.error(err);
        } else {
          stream.push(data);
        }
      })
    }
  },
  mkReportHtml: function(pages, stream){
    var pagesLength = pages.length
      , headers = mkCsvRowFromArray(['location', 'status']);

    stream.push(headers);

    for(var i=0;i < pagesLength; i++){
      var page = pages[i]
        , location = page.loc[0];

      validateHtml({url:location, format:'json'}, function(err, result){
        if(err){
          console.error(err);
        } else {
          var res = result.messages.length > 0 ? "Errors" : "Valid"
            , data = mkCsvRowFromArray([result.url, res]);
          stream.push(data);
        }
      });
    }
  },
  mkReportWcag: function(pages, stream){
    var pagesLength = pages.length
      , headers = mkCsvRowFromArray(['location', 'errors']);

    stream.push(headers);

    for(var i=0;i < pagesLength; i++){
      (function(){
        var page = pages[i]
          , location = page.loc[0]
          , opts = {
            uri : location,
            id : acheckerID,
            output : 'rest'
          };

        validateWcag(opts, function(error, body){
          if(error){
            console.error(error, null);
          } else {
            parser.parseString(body.toString(), function (err, result) {
              if (err) {
                console.error(err, null);
              } else {
                if (result){
                  var data = mkCsvRowFromArray([opts.uri, result.resultset.summary[0].NumOfErrors[0]]);
                  stream.push(data);
                } else {
                  console.error(new Error('Something is wrong: ' + result));
                }
              }
            });
          }
        });
      })();
    }
  },
  mkReportPagespeed: function(pages, stream){
    var pagesLength = pages.length
      , headers = mkCsvRowFromArray(['location', 'score']);

    stream.push(headers);

    for(var i=0;i < pagesLength; i++){
      var page = pages[i]
        , location = page.loc[0];

      helpers.getPagespeedReport(location, function(err, data){
        if(err){
          console.error(err);
        } else {
          stream.push(data);
        }
      });
    }
  },
  mkReportMeta: function(pages, stream){
    var pagesLength = pages.length
      , headers = mkCsvRowFromArray(['location', 'title', 'keywords', 'description']);

    stream.push(headers);

    for(var i=0;i < pagesLength; i++){
      var page = pages[i]
        , location = page.loc[0];

      helpers.getPageMetadata(location, function(err, data){
        if(err){
          console.error(err);
        } else {
          stream.push(data);
        }
      });
    }
  }
};