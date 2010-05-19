var WorldNomadsFeed = new Class({
    Extends: Feed,

    name: 'WorldNomads',

    TYPE: 'recent',

    search: function(searchFilter) {
        var country = searchFilter.location.country.toLowerCase();
        var country_id = this.countries.get(country);

        this.parent();

        if (!$chk(country_id)) {
            return;
        }
        new Request.JSONP({
            url: 'http://pipes.yahoo.com/pipes/pipe.run',
            data: {
                _id: 'cb5de2b4f3316941e39cd06ca852e7a9',
                _render: 'json',
                country_id: country_id,
                type: this.TYPE
            },
            callbackKey: '_callback',
            onSuccess: this.makeFeedItems.bind(this)
        }).send();
    },

    makeFeedItems: function(results) {
        if (results && results.value && results.value.items && $chk(results.value.items.length)) {
            results.value.items.each(function(post) {
                this.feedItems.push(new WorldNomadsFeedItem(post));
            }, this);
            this.feedReady();
        }
    },

    countries: $H({
        'argentina': 11,
        'australia': 14,
        'austria': 15,
        'bolivia': 27,
        'botswana': 29,
        'brazil': 31,
        'cambodia': 37,
        'canada': 39,
        'chile': 44,
        'china': 45,
        'colombia': 48,
        'costa rica': 53,
        'croatia': 55,
        'cuba': 56,
        'ecuador': 63,
        'egypt': 64,
        'fiji': 72,
        'france': 74,
        'germany': 81,
        'greece': 84,
        'guatemala': 89,
        'hungary': 97,
        'india': 99,
        'indonesia': 100,
        'ireland': 103,
        'italy': 105,
        'japan': 107,
        'kenya': 110,
        'laos': 116,
        'malaysia': 129,
        'mexico': 138,
        'morocco': 144,
        'myanmar': 146,
        'nepal': 149,
        'netherlands': 150,
        'new zealand': 153,
        'norway': 160,
        'pakistan': 162,
        'panama': 165,
        'peru': 168,
        'philippines': 169,
        'poland': 171,
        'portugal': 172,
        'south africa': 197,
        'south korea': 113,
        'spain': 199,
        'sri lanka': 200,
        'sweden': 205,
        'switzerland': 206,
        'syria': 207,
        'thailand': 211,
        'turkey': 218,
        'united kingdom': 225,
        'usa': 227,
        'venezuela': 232,
        'vietnam': 233
    })
});