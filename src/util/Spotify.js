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

async function getAccessToken() {
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
    }


    const response = await fetch(url);

    if(!response.ok) {
        throw new Error('Bad response');
    }
}

export default Spotify;
