export function stringProcessed(string) {
      let stringProcessed = "";
      stringProcessed = string.charAt(0).toUpperCase() + string.slice(1);
      const mark = string.indexOf("_")
       if(mark !== -1){
           return stringProcessed.slice(0, mark) +  " " + stringProcessed.replace("_", "").charAt(mark).toUpperCase() + stringProcessed.slice(mark +2 );
       }
          return stringProcessed;
}

export function filteredData(rawProfileData) {
         let category = "";
         const charData = Object.keys(rawProfileData)
             .filter(key => key!== "created" && key !== "edited" && key!== "url" && rawProfileData    [key] !== "n/a" && rawProfileData[key].length > 0)
             .reduce((acc, key) => {
                 if(rawProfileData[key].slice(0,4) !== "http" && !Array.isArray(rawProfileData[key    ])){
                     category = "personalInfo";
                 }else {
                     category = "httpRequests";
                 }
                 Object.assign(acc[category], {[key] : rawProfileData[key]});
                 return acc;
             }, {
                 personalInfo : {},
                 httpRequests: {}
             })
         return charData;
 }
 
