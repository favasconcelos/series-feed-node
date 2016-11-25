const scheduler = require('node-cron');

const Feed = require('./feed');
const Item = require('./item');


class Cron {

    constructor() {
        console.log('Cron');
    }

    run() {
        console.log('Cron - run');
        Feed.fetchFromFile((err, data) => {
            this.onFetchCallback(err, data);
        });
    }

    onFetchCallback(err, data) {
        console.log('Cron - onFetchCallback');
        if (err) {
            console.error(err);
        } else {
            var items = data.rss.channel[0];
            this.parseItems(items);
        }
    }

    parseItems(data) {
        console.log('Cron - parseItems');
        var items = [];
        for (var index = 0, length = data.item.length; index <= length; index++) {
            var rawItem = data.item[index];
            if (rawItem) {
                var item = new Item(rawItem);
                if (item.isValid()) {
                    items.push(item);
                } 
                // else 
                // {
                //     console.log('Not Valid: %s', item.title);
                // }
            }
        }
        this.processItems(items);
    }

    processItems(items) {
        console.log('Cron - processItems');
        items = items.filter(Feed.filter);
        console.dir(items);
    }

}

// scheduler.schedule('* * * * *', () => {
//     console.log('running a task every minute');
//     new Cron().run();
// });

new Cron().run();
