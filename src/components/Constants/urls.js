const {REACT_APP_API_HOST} = process.env;
const checkVisitsURL = (passPortNumber,nationality) =>{
  return `${REACT_APP_API_HOST}/api/v1/poe/checkVisitor?passPortNumber=${passPortNumber}&nationality=${nationality}`;
}


const getFacilitiesAirportURL = () =>{
  return `${REACT_APP_API_HOST}/api/v1/poe/facilities`;
}
const registerVisitorsURL = () =>{
  return `${REACT_APP_API_HOST}/api/v1/poe/visitor`;
}

export {
  checkVisitsURL, getFacilitiesAirportURL, registerVisitorsURL
}

