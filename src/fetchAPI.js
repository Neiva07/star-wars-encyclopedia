import axios from 'axios';

const ROOT = "https://swapi.co/api/people/?search=";

export async function getCharInfo(char) {
    const finalUrl = ROOT + char ;
    return axios({
        method: 'get',
        url: finalUrl,
    })
    .then(response => {
        return response.data.results[0];
    })
}
