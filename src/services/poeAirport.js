import http from './httpServices'
import { throwError } from '../components/Constants/messages';
import { checkVisitsURL, getFacilitiesAirportURL, registerVisitorsURL, verifyVisitorsURL } from '../components/Constants/urls';
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
        signsSymptomsSelected,
        feverTemp
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
    signsSymptomsSelected,
    measuredTemperature: feverTemp
  }
const results = await http.post(url, data);
return results;
} catch (error) {
    
}
};

// verify id of event when pulling data for card
const verifyEvent = async (eventId) => {
  try {
    const url = verifyVisitorsURL(eventId);    
    const {data} = await http.get(url);
    return data.data;
  } catch (error) {
    
  }
};
// TODO update event instead of creating a new one


export { checkVisits, getFacilitiesAirport,registerVisitors, verifyEvent };