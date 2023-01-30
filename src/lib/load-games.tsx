import secrets from "../../config/secrets.json";
import { BHIQuestion, DemographicQuestion, GameProps, GemProps, JsonProps, PrefGamesQuestion, SelfDetQuestion } from "../types_interfaces/types";

// const SERVER_URL = process.env
// const SERVER_URL = "http://localhost:3000"
const SERVER_URL = process.env.API_URL;

const gdb_api_url = 'https://api.igdb.com/v4';
// const twitch_api_login = `https://id.twitch.tv/oauth2/token?client_id=${secrets.twitch_api.client_id}&client_secret=${secrets.twitch_api.client_secret}&grant_type=client_credentials`;

const twitch_api_login = "https://id.twitch.tv/oauth2/token?client_id=hj3okkvvefkqdfi1flzd9k3w5htbn4&client_secret=04nfx2u3aa4nmxx7o3zochutzyjm3g&grant_type=client_credentials"

export async function loadGames() {
    const twitch_res = await fetch(twitch_api_login, {method: 'POST'});
    console.log(twitch_res)
    const twitch_access_token = await twitch_res.json();
    let games: GameProps[];
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

export async function loadCatalogGames() {
    const gemProps = await loadGemProps();
    const titles = gemProps.map(item => item.title)
    const titles_string = titles.join('","')
    const twitch_res = await fetch(twitch_api_login, {method: 'POST'});
    console.log(twitch_res)
    const twitch_access_token = await twitch_res.json();
    let games: GameProps[];
    // try {
        const twitch_bearer = twitch_access_token.access_token;
        const gdb_res = await fetch(`${gdb_api_url}/games`, {
            method: 'POST', 
            headers: {
                "Client-ID": secrets.twitch_api.client_id,
                "Authorization": `Bearer ${twitch_bearer}`,
            },
            body: `fields name,url,cover.url,cover.height,cover.width,release_dates.y; where name=("${titles_string}") & release_dates.y>2000 & release_dates.y<2023; sort follows desc; limit 100;`
        });
        games = await gdb_res.json();
    // }
    //TODO: isolate the error type
    // catch {
        // console.error("No twitch access token was returned")
    // }
    return games;    
}

export async function loadBhiProps() {
    const bhiProps: JsonProps<BHIQuestion> = await fetch(`${SERVER_URL}/api/bhi`)
      .then(async response => await response.json());
      return bhiProps;
}

export async function loadDemographicProps() {
    const demographicProps: JsonProps<DemographicQuestion> = await fetch(`${SERVER_URL}/api/demographics`)
      .then(async response => await response.json());
      return demographicProps;
}

export async function loadSelfDetProps() {
    const selfDetProps: JsonProps<SelfDetQuestion> = await fetch(`${SERVER_URL}/api/bpnsfs`)
      .then(async response => await response.json());
      return selfDetProps;
}

export async function loadPrefGamesProps() {
    const prefGamesProps: JsonProps<PrefGamesQuestion> = await fetch(`${SERVER_URL}/api/prefgames`)
      .then(async response => await response.json())
      return prefGamesProps;
}

export async function loadGemProps() {
    const gemProps: GemProps[] = await fetch(`${SERVER_URL}/api/gem`)
      .then(async response => await response.json())
      return gemProps;
}