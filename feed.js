const fs = require('fs');
const xml2js = require('xml2js');


class Feed {

    static fetchFromFile(callback) {
        console.log('Feed - fetchFromFile');
        var parser = new xml2js.Parser();
        fs.readFile(__dirname + '/example.xml', (err, data) => {
            if (err) {
                return callback(err, data);
            }
            parser.parseString(data, (err, result) => {
                callback(err, result);
            });
        });
    }

}

module.exports = Feed;
