// regex to extract the SEASON and EPISODE from the title
const SEASON_EPISODE_REGEX = /.*S(\d\d)E(\d\d).*/i;
// regex to remove \n from string
const BREAK_REGEX = /\n/g;
// quality strings
const Q_720P = '720p';
const Q_1080P = '1080p';

class Item {

    constructor(data) {
        this.parseLink(data.link[0]);
        this.parseDate(data.pubDate);
        this.season = null;
        this.episode = null;
        this.parseTitle(data.title[0]);
        this.parseQuality(data.title[0]);
    }

    parseTitle(title) {
        title = title.replace(BREAK_REGEX, '');
        const match = SEASON_EPISODE_REGEX.exec(title);
        if (match != null) {
            this.season = match[1];
            this.episode = match[2];
        }
        this.title = title;
    }

    parseQuality(title){
        var quality = null;
        if(title.indexOf(Q_720P) !== -1){
            quality = Q_720P;
        } else if(title.indexOf(Q_1080P) !== -1){
            quality = Q_1080P;
        }
        this.quality = quality;
    }

    parseDate(date) {
        this.date = new Date(date);
    }

    parseLink(link) {
        this.link = link.replace(BREAK_REGEX, '');
    }

    isValid() {
        return this.season != null && this.episode != null;
    }
}

module.exports = Item;
