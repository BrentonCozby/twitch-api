var tbody = document.getElementById('tbody');

document.getElementsByTagName('input')[0].checked = true;

apiResponse.forEach(function(channel) {
    if(channel._links) tbody.appendChild( makeRow(channel) );
});

document.getElementById('tbody');

function makeRow(channel) {
    var row = document.createElement('tr');
    var logo = 'http://i.imgur.com/3tkNHB6.png';
    var displayName = channel.display_name;
    var details = 'offline';
    var anchor = null;

    if(channel.stream) {
        logo = channel.stream.logo;
        displayName = channel.stream.display_name;
        details = channel.stream.status;
        row.classList.add('streaming');

        var streamLink = channel.stream.url;
        anchor = document.createElement('a');
        anchor.setAttribute('href', streamLink);
        anchor.setAttribute('target', "_blank");
    }
    else {row.classList.add('offline')}

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
    if(anchor) {
        anchor.appendChild(detailsText);
        detailsEl.appendChild(anchor);
    }
    else {
        detailsEl.appendChild(detailsText);
    }

    row.appendChild(logoEl);
    row.appendChild(nameEl);
    row.appendChild(detailsEl);
    row.classList.add('channel');

    return row;
}



var _filters = document.getElementsByTagName('input');
var filters = [];

for(var i = 0, x = _filters.length; i < x; i++) {
    filters.push(_filters[i]);
}

filters.forEach(function(filter) {
    filter.nextElementSibling.addEventListener('click', function() {
        filterStreams(this.htmlFor);
    });
});

var _channels = document.getElementsByClassName('channel');
var channels = [];

for(var j = 0, x = _channels.length; j < x; j++) {
    channels.push(_channels[j]);
}

function filterStreams(label) {
    if(label === 'all') {
        channels.forEach(function(channel) {
            channel.classList.remove('hide');
        });
    }
    else {
        channels.forEach(function(channel) {
            channel.classList.forEach(function(className) {
                if(className === 'channel') return;
                if(className === label) {
                    channel.classList.remove('hide');
                }
                else {
                    channel.classList.add('hide');
                }
            });
        });
    }
}
