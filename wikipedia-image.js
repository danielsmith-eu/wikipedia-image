var Promise = require("node-promise").Promise;
var SparqlClient = require('sparql-client');
var util = require('util');

module.exports = function(page) {
    var p = new Promise();

    // query dbpedia for images from a page
    var endpoint = 'http://dbpedia.org/sparql';
    var query = "SELECT ?img WHERE {?concept <http://xmlns.com/foaf/0.1/isPrimaryTopicOf> <"+page+"> . ?concept <http://xmlns.com/foaf/0.1/depiction> ?img}";

    // issue query
    var client = new SparqlClient(endpoint);
    client.query(query)
        .execute(function(error, results) {
            if (error) {
                p.reject(error);
            } else {
                try {
                    p.resolve(results.results.bindings[0].img.value);
                } catch (e) {
                    p.reject(e);
                }
            }
        });

    return p;
}
