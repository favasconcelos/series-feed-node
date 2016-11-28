const fs = require('fs');
const xml2js = require('xml2js');

const config = require('./series-config');

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

    static filter(item) {
        var passed = false;
        var quality = config.default.quality;
        var series = config.series;
        // search in each serie
        for (var index = 0, size = series.length; index < size; index++) {
            // if the series match with any
            var serie = series[index];
            // check if this serie is from this config
            if (item.title.toLowerCase().indexOf(serie.name.toLowerCase()) !== -1) {
                quality = serie.quality || quality;
                // check if the quality is the wanted
                if (quality && item.quality && !Feed.test(quality, item.quality)) {
                    continue;
                }
                // check if the season is the wanted
                if (item.season && !Feed.test(serie.season, item.season)) {
                    continue;
                }
                return true;
            }
        }
        return false;
    }

    static test(string, value) {
        string = string.replace('value', `'${value}'`);
        return eval(string);
    }

}

module.exports = Feed;
