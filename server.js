var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if (query['cmd'] == 'repeat')
    {
      console.log("Handling a request");
      console.log(query);
      var word = query['word'];
      var i;
      res.write('<pre>');
      for (i = 0; i < word.length; i++ )
      {
        res.write(''+word+'<br>');
      }
      res.write('</pre>');
      res.end('');
    }
    else if (query['cmd'] == 'dotted')
    {
      console.log("Handling a request");
      console.log(query);
      var word1 = query['word1'];
      var word2 = query['word2'];
      var x;
      res.write('<pre>'+word1+ '');
      for (x = word1.length; x < (30 - word2.length) ; x++ )
      {
        res.write('.');
      }
      res.write(''+word2+'</pre>');
      res.end('');
    }
    else if (query['cmd'] == 'stats')
    {
      console.log("Handling a request");
      console.log(query);
      var grades = query['grades'];
      res.write('<pre>');
      var high = grades[0];
      var low = grades[0];
      for (var key = 0; key < grades.length; key++)
      {
        if(grades[key] > high)
        {
          high = grades[key];
        }
        if(grades[key] < low)
        {
          low = grades[key];
        }
        var temp = 0;
        temp = grades[key] + temp;
      }
      var ave = temp/(grades.length);
      res.write('Ave:'+ave+'Min:'+low+' Max:'+high+'</pre>');
      res.end('');
    }
    else
    {
      res.end('');
    }
}