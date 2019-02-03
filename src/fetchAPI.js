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
     const arrayData = await Promise.all(Object.keys(httpRequestsObj)
        .map(key => { 
            if(Array.isArray(httpRequestsObj[key])){
               return Promise.all(multipleHttpRequests(httpRequestsObj[key])) 
            } else  return singleHttpRequest(httpRequestsObj[key])
        }))
        .then(responsePromiseAll => {
           return  responsePromiseAll.map(responseEachKey => {
                if(Array.isArray(responseEachKey)){
                    return responseEachKey.map(resEachRequest => resEachRequest.data)
                } else {
                    return responseEachKey.data; 
                }
            })
        })
      const keysArray = Object.keys(httpRequestsObj)
      const objData = arrayData.reduce((acc, arr, ind) => {
           acc[keysArray[ind]] = arr;
           return acc;
        }, {})
        console.log(objData)
        return objData
}

