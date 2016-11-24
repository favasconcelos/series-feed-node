// regex to extract the SEASON and EPISODE
// from the title
const SEASON_EPISODE_REGEX = /.*S(\d\d)E(\d\d).*/i;
const BREAK_REGEX = /\n/g;

class Item {

    constructor(data) {
        this.parseLink(data.link[0]);
        this.parseDate(data.pubDate);
        this.episode = null;
        this.season = null;
        this.parseTitle(data.title[0]);
    }

    parseTitle(title) {
        const match = SEASON_EPISODE_REGEX.exec(title);
        if (match != null) {
            this.season = match[1];
            this.episode = match[2];
        }
        return title;
    }

    parseDate(date) {
        this.date = new Date(date);
    }

    parseLink(link) {
        this.link = link.replace(BREAK_REGEX, '');
    }

    isValid() {
        return this.season != '' && this.eposide != '';
    }
}

module.exports = Item;
