// Here we use two APIS from openlibrary to fetch the cover picture of a book if the user doesn't upload an image

const axios = require('axios');

function removeAccents(str) {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "")
    // This comes directly from Stackoverflow and I don't understand it fully
    // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
}

module.exports = function findCoverImage(req, res, next) {

    // First we will use openlibrary to fetch general information about a book, searching by author and title to minimize the risk that 
    // we get the wrong book. The first API, search openlibrary, returns a list of books and we take the first one. In this info, what 
    // we are interested in is the reference number for a cover picture.

    const coverIdUrl = '/search.json?title=' + removeAccents(req.body.title).toLowerCase().replaceAll(" ", "+") + '&author=' + removeAccents(req.body.author).toLowerCase().replaceAll(" ", "+");
    console.log(coverIdUrl)
    const api = axios.create({
        baseURL: 'https://openlibrary.org'
    });

    api
    .get(coverIdUrl)
    .then(response => {
        // If we find a book and get the reference number for the cover pic, we build the URL for the picture on covers.openlibrary,
        // the second API.
        if (response.data.numFound === 0) {
            res.locals.coverURL = undefined;
        } else {
            res.locals.coverURL = 'https://covers.openlibrary.org' + '/b/id/' + response.data.docs[0].cover_i + '-M.jpg';
        }
        next();
    })
    .catch(next);
}