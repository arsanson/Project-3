var request = require('request'); // "Request" library
require('dotenv').config()

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const base64 = new Buffer(client_id + ':' + client_secret).toString('base64');

// your application requests authorization
var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        Authorization: 'Basic ' + base64
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

module.exports = function (req, res) {
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            console.log('Token', token);
            var options = {
                url: 'https://api.spotify.com/v1/browse/categories/party/playlists',
                headers: {
                    Authorization: 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {
                console.log(body.playlists.items[0].owner.uri);
            });
        }
    });
}

