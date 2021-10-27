const axios = require('axios');

module.exports = function findCoverImage(req, res, next) {
    const coverIdUrl = '/search.json?title=' + req.body.title.toLowerCase().replaceAll(" ", "+");
    const api = axios.create({
        baseURL: 'https://openlibrary.org'
    });

    api
    .get(coverIdUrl)
    .then(response => {
        res.locals.coverURL = 'https://covers.openlibrary.org' + '/b/id/' + response.data.docs[0].cover_i + '-M.jpg';
        next();
    })
    .catch(next);
}