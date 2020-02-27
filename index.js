const hbs = require(`express-handlebars`);
const path = require(`path`);
const express = require(`express`);
const fs = require('fs');

const app = express();

// Import the getWeather function
const getNews = require('./lib/getNews');

// use tells express to use this folder
// static tells express that the path is static
// path is used to join these 2 paths
// this html stuff is in the 'public' folder
app.use(express.static(path.join(__dirname, `public`)));

// set view engine to handlebars
// extname sets extension to .hbs
app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

// tell express to use this engine
app.set('view engine', '.hbs');

// app.get('/', (req, res) => {
//     // render index.hbs page
//     res.render('index');
// });

// Make function asynchronous
app.get('/', async(req, res) => {
    // Wait for getWeather function to run and store in the 'data'
    let data = await getNews();

    // data is already made up of data.body - return data.body in getWeather
    console.log(data)
    fs.writeFileSync('getNews.json', JSON.stringify(data))

    console.log(data.results[0].title)
    console.log(data.results[1].title)
    console.log(data.results[2].title)
    console.log(data.results[3].title)
    console.log(data.results[4].title)

    console.log(`Try to log URL: ${data.results[0].media[0].copyright}`) // Not Pulling

    // let photo1 = ;
    let title1 = data.results[0].title;
    let abstract1 = data.results[0].abstract;
    // let photo2 = ;
    let title2 = data.results[1].title;
    let abstract2 = data.results[1].abstract;
    // let photo3 = ;
    let title3 = data.results[2].title;
    let abstract3 = data.results[2].abstract;
    // let photo4 = ;
    let title4 = data.results[3].title;
    let abstract4 = data.results[3].abstract;
    // let photo5 = ;
    let title5 = data.results[4].title;
    let abstract5 = data.results[4].abstract;

    // render index.hbs page
    res.render('index', {title1, abstract1, title2, abstract2, title3, abstract3, title4, abstract4, title5, abstract5});
});

app.listen(3001, () => {
    console.log('server listening on port 3001');
});