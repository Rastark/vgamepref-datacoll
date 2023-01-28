import secrets from "../../config/secrets.json";
import { GameProps } from "../types_interfaces/types";


const gdb_api_url = 'https://api.igdb.com/v4';
// const twitch_api_login = `https://id.twitch.tv/oauth2/token?client_id=${secrets.twitch_api.client_id}&client_secret=${secrets.twitch_api.client_secret}&grant_type=client_credentials`;

const twitch_api_login = "https://id.twitch.tv/oauth2/token?client_id=hj3okkvvefkqdfi1flzd9k3w5htbn4&client_secret=04nfx2u3aa4nmxx7o3zochutzyjm3g&grant_type=client_credentials"

export async function loadGames() {
    const twitch_res = await fetch(twitch_api_login, {method: 'POST'});
    console.log(twitch_res)
    const twitch_access_token = await twitch_res.json();
    let games;
    // try {
        const twitch_bearer = twitch_access_token.access_token;
        const gdb_res = await fetch(`${gdb_api_url}/games`, {
            method: 'POST', 
            headers: {
                "Client-ID": secrets.twitch_api.client_id,
                "Authorization": `Bearer ${twitch_bearer}`,
            },
            body: `fields name,url,cover.url,cover.height,cover.width; where follows>100; sort follows desc; limit 500;`
        });
        games = await gdb_res.json();
    // }
    //TODO: isolate the error type
    // catch {
        // console.error("No twitch access token was returned")
    // }
    return games;    
}

export async function loadCatalogGames(titles: Array<string>) {
    const titles_string = titles.join('","')
    const twitch_res = await fetch(twitch_api_login, {method: 'POST'});
    console.log(twitch_res)
    const twitch_access_token = await twitch_res.json();
    let games: GameProps;
    // try {
        const twitch_bearer = twitch_access_token.access_token;
        const gdb_res = await fetch(`${gdb_api_url}/games`, {
            method: 'POST', 
            headers: {
                "Client-ID": secrets.twitch_api.client_id,
                "Authorization": `Bearer ${twitch_bearer}`,
            },
            body: `fields name,url,cover.url,cover.height,cover.width; where name=("${titles_string}"); limit 100;`
        });
        games = await gdb_res.json();
    // }
    //TODO: isolate the error type
    // catch {
        // console.error("No twitch access token was returned")
    // }
    return games;    
}