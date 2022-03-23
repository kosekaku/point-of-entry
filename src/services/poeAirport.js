import http from './httpServices'
import { throwError } from '../components/Constants/messages';
import { checkVisitsURL, getFacilitiesAirportURL, registerVisitorsURL } from '../components/Constants/urls';
// check if user previously visited south sudan
const checkVisits = async (
  passPortNumber,nationality
) => {
  try {
    const url = checkVisitsURL(passPortNumber,nationality);
    const results = await http.get(url);
    if(!results.data) return throwError;
    const {status, message, data} = results
   if(status!== 200) return throwError;
   return data;
  
} catch (error) {
}
};

// load airports 
const getFacilitiesAirport = async () => {
  try {
    const url = getFacilitiesAirportURL();
    const results = await http.get(url);
    
    if(!results && !results.data) return throwError;
    const {status, data} = results;
   if(status!== 200) return throwError
   return data;
  
} catch (error) {
  return throwError
}
};

// post events
const registerVisitors = async(
  firstName, lastName, nationality,
        passportId, issuingCountry, age, gender,
        travelMode, departureAirport, departureCountry,
        flightNo, arrivalDate, arrivalPort, stayDuration, stayAddress,
        stayEmail, stayPhone, countryVisited1, countryVisited2, countryVisited3,
        ebolaContact, covidContact,animalContact,
        signsSymptoms,
        signsSymptomsSelected
) =>{
  try {
  
  const url = registerVisitorsURL();
  const data = {
    firstName, lastName, nationality,
    passportId, issuingCountry, age, gender,
    travelMode, departureAirport, departureCountry,
    flightNo, arrivalDate, arrivalPort, stayDuration, stayAddress,
    stayEmail, stayPhone, countryVisited1, countryVisited2, countryVisited3,
    ebolaContact, covidContact,animalContact,
    signsSymptoms,
    signsSymptomsSelected
  }
const results = await http.post(url, data);
return results;
} catch (error) {
    
}
};



export { checkVisits, getFacilitiesAirport,registerVisitors };