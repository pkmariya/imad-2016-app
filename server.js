var express = require('express');
var morgan = require('morgan');
var path = require('path');
// var Pool = require('pg').Pool; // commenting db changes for now.

var config = {
  user: 'pkmariya', 
  database: 'pkmariya',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    
    'article-one' : {
      title: 'Article 1',
      heading: 'Article One',
      date: 'Sep 24, 2016',
      content:
      `   <p>This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
                </p>`
    },
    
    'article-two' : {
      title: 'Article 2',
      heading: 'Article Two',
      date: 'Sep 24, 2016',
      content:
      `   <p>This is the content for my second article. This is the content for my second article. This is the content for my   second article. This is the content for my second article. This is the content for my second article.
          </p>
          <p>This is the content for my second article. This is the content for my second article. This is the content for my   second article. This is the content for my second article. This is the content for my second article.
          </p>`
    },
    
    'article-three' : {
      title: 'Article 3',
      heading: 'Article Three',
      date: 'Sep 24, 2016',
      content:
      `   <p>This is the content for my third article. This is the content for my third article. This is the content for my third article. This is the content for my third article. This is the content for my third article.
          </p>
          <p>This is the content for my third article. This is the content for my third article. This is the content for my third article. This is the content for my third article. This is the content for my third article.
          </p>
          <p>This is the content for my third article. This is the content for my third article. This is the content for my third article. This is the content for my third article. This is the content for my third article.
          </p>`
    }
};

var names = [];
app.get('/submit-name', function(req, res) {
        var name = req.query.name;
        names.push(name);
        res.send(JSON.stringify(names));
});

function createTemplate(data){

var title = data.title;
var heading = data.heading;
var date = data.date;
var content = data.content;

var htmlTemplate = 
  `<html>
    
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <div>
            <h3>
                ${heading}
            </h3>
        </div>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
        </div>
    </body>

    </html>`;
    
    return htmlTemplate;
}

var counter = 0;
app.get('/counter', function(req, res) {
        counter = counter + 1;
        res.send(counter.toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

// var pool = new Pool(config);
app.get('/test-db', function(req, res) 
{
   pool.query('SELECT * FROM test', function(err, result)
   {
      if(err)
      {
          res.status(500).send(err.toString());
      } else
      {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/Puppy.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Puppy.jpg'));
});

app.get('/ui/bgrnd.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bgrnd.jpg'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/typed.min.js', function(req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'typed.min.js'));
});

app.get('/typed.min.js', function (req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'typed.min.js'));
});

app.get('/ui/favicon.ico', function(req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));
});

app.get('/:articleName', function(req, res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
