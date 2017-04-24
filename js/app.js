var tbody = document.getElementById('tbody');

document.getElementsByTagName('input')[0].checked = true;

$.ajax({
        method: 'GET',
        url: 'https://api.twitch.tv/kraken/streams/featured?',
        data: {
            client_id: '3nzcyd6qgb11u3ethqhymn37i11fyg',
            stream_type: 'all',
            limit: 20,
            language: 'en'
        },
        datatype: 'jsonp',
    })
    .done(function(res) {
        console.log(res);
        res.featured.forEach(function(stream) {
            tbody.appendChild(makeRow(stream));
        });
        addClickHandlers();
    })
    .fail(function(err) {
        console.log(err);
    });

document.getElementById('tbody');

function makeRow(stream) {
    var row = document.createElement('tr');
    var logo = 'http://i.imgur.com/3tkNHB6.png';
    var displayName = stream.title;
    var details = 'offline';
    var anchor = null;

    if (stream.stream) {
        logo = stream.stream.channel.logo;
        displayName = stream.stream.channel.display_name;
        details = stream.stream.channel.status;
        row.classList.add('streaming');

        var streamLink = stream.stream.channel.url;
        anchor = document.createElement('a');
        anchor.setAttribute('href', streamLink);
        anchor.setAttribute('target', "_blank");
        anchor.setAttribute('rel', "noopener");
    } else {
        row.classList.add('offline');
    }

    var logoEl = document.createElement('td');
    var img = document.createElement('img');
    img.setAttribute('src', logo);
    logoEl.classList.add('logo');
    logoEl.appendChild(img);

    var nameEl = document.createElement('td');
    var nameText = document.createTextNode(displayName);
    nameEl.classList.add('displayName');
    nameEl.appendChild(nameText);

    var detailsEl = document.createElement('td');
    var detailsText = document.createTextNode(details);
    detailsEl.classList.add('details');
    if (anchor) {
        anchor.appendChild(detailsText);
        detailsEl.appendChild(anchor);
    } else {
        detailsEl.appendChild(detailsText);
    }

    row.appendChild(logoEl);
    row.appendChild(nameEl);
    row.appendChild(detailsEl);
    row.classList.add('channel');

    return row;
}



function addClickHandlers() {
    var filters = [].slice.call(document.querySelectorAll('input'));

    filters.forEach(function(filter) {
        filter.nextElementSibling.addEventListener('click', function() {
            filterStreams(this.htmlFor);
        });
    });

    var channels = [].slice.call(document.querySelectorAll('.channel'));

    function filterStreams(label) {
        if (label === 'all') {
            channels.forEach(function(channel) {
                channel.classList.remove('hide');
            });
        } else {
            channels.forEach(function(channel) {
                channel.classList.forEach(function(className) {
                    if (className === 'channel') return;
                    if (className === label) {
                        channel.classList.remove('hide');
                    } else {
                        channel.classList.add('hide');
                    }
                });
            });
        }
    }
}
