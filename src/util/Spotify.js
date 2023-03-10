// Module to get information from spotify

// constants
const CLIENT_ID = 'c7f04981775c47b887017b430329868b';
const REDIRECT_URI = 'http://localhost:3000';
const SCOPE = 'playlist-modify-public';

let url = 'https://account.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id' + encodeURIComponent(CLIENT_ID);
url += '&scope' + encodeURIComponent(SCOPE);
url += '&redirect_uri' + encodeURIComponent(REDIRECT_URI);

// user's acces token
let userToken = '';

const Spotify = {};

function getAccessToken() {
    if (userToken) {
        return userToken;
    }
    // see if access token already exists
    const window_url = window.location.href;
    const access_token_found = window_url.match(/access_token=([^&]*)/);
    const expires_found = window_url.match(/expires_in=([^&]*)/);

    if (access_token_found && expires_found) {
        userToken = access_token_found[0];
        const expiration = expires_found[0];
        window.setTimeout(() => userToken = '', expiration * 1000);
        window.history.pushState('Access Token', null, '/'); 
    } else {
        window.location(url);
    }
    
}

async function search(term) {
    let endpoint = 'https://api.spotify.com/v1/search?type=track&q=';
    endpoint += term;

    const response = await fetch(
        endpoint,
        {
          headers: {Authorization: `Bearer ${userToken}`}
        } );
    const response_json = await response.json();

    if (!response_json) {
      return [];
    }

    const tracks = response_json.map((item) => {
      const track = {
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artist[0].name,
        album: item.track.album.name,
        URI: item.track.uri
      }
      return track;
    })
    return tracks;
}

async function savePlaylist(playlistName, trackURIs) {
  if (!playlistName && !trackURIs) {
    return null;
  }
  const accesToken = userToken;
  const headersVariable = {Authorization: `Bearer ${accesToken}`}
  let userID = null;
  
  const response = await fetch('api.spotify.com/v1/me', {headers: headersVariable});
  const response_json = await response.json();
  userID = response_json.id;

  const postBody = {
    name: playlistName,
    description: "New playlist description",
    public: false
  }
  const playlistResponse = await fetch(
    `api.spotify.com/v1/users/${userID}/playlists`,
    {
      method: 'POST',
      headers: headersVariable,
      body: JSON.stringify(postBody)
    }
  );
  const playlistResponseJson = await playlistResponse.JSON();
  let playlistID = playlistResponseJson.id;

  const addItemsResponse = await fetch(
    `api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
    {
      method: 'POST',
      headers: headersVariable,
      body: JSON.stringify({
        uris: trackURIs
      })
    }
  );
  const addResponseJSON = await addItemsResponse.JSON();
  playlistID = addResponseJSON.snapshot_id;
}

export default Spotify;
