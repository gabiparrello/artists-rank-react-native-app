const lastFmApiUrl = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=argentina&api_key=2046e49500037444ce51242991949d50&format=json';

export function getArtists() {
    let i = 1;
    return fetch(lastFmApiUrl)
        .then(response => response.json())
        .then(data => data.topartists.artist)
        .then(artists => artists.map(artist => ({
                id: artist.mbid,
                name: artist.name,
                image: artist.image[3]['#text'],
                likes: 200,
                comments: 68,
                rank: i++
            }
        )))
}