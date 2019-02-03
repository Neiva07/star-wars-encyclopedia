import axios from 'axios';

const ROOT = "https://swapi.co/api/people/?search=";

export async function getCharInfo(char) {
    const finalUrl = ROOT + char ;
    return singleHttpRequest(finalUrl).then(response => response.data.results[0]);
    }
function singleHttpRequest(...url) {
    return axios({
        method: 'get',
        url: url,
    })
}

function multipleHttpRequests(arrayOfUrls) {
    return arrayOfUrls.map(url => singleHttpRequest(url)); 
}

export async function getMoreInfo(httpRequestsObj) {
     const data = Promise.all(
            Object.keys(httpRequestsObj)
                .map(key => (
                    Array.isArray(httpRequestsObj[key]) ? multipleHttpRequests(httpRequestsObj[key]) : singleHttpRequest(httpRequestsObj[key])  
                ))).then(responses => {
                        return responses.map(response => (Array.isArray(response) ? response.map(pro => pro) : response))    
                })
    console.log(data);
    return data
}
