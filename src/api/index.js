import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) =>{
let changableUrl = url;
console.log(country);
if(country){
    changableUrl = `${url}/countries/${country}`
}

try{
const {data:{confirmed,recovered,deaths,lastUpdate}} = await axios.get(changableUrl);

const modifiedData = {
    confirmed:confirmed,
    recovered:recovered,
    deaths:deaths,
    lastUpdate:lastUpdate
}

return modifiedData;

}catch(error){
console.log(error)
}
}


export const fetchDailyData = async()=>{
   


    try{
        const {data} = await axios.get(`${url}/daily`);
        
        const modifiedData = data.map((dailyData) =>({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate,
        }))
        return modifiedData;

    }catch(error){
        console.log(error)
    }
}

export const fetchCountries = async () =>{


try{
    const {data:{countries}} = await axios.get(`${url}/countries`)
  
    const temp = countries.map((country)=>country.name);
    return temp;

}catch(error){
        console.log(error)
    }
}