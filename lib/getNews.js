const request = require('request');
const {promisify} = require('util');

require('dotenv').config() // https://www.npmjs.com/package.dotenv

const promisifiedRequest = promisify(request);

const getNews = async () => {

    let data = await promisifiedRequest({
        uri: `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${process.env.APPID}`,
        json: true // Automatically stringifies the body to JSON
    })

    return data.body;

}

// export the function to be run in index.js
module.exports = getNews;