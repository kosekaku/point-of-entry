
const checkVisitsURL = (passPortNumber,nationality) =>{
  return `http://localhost:8000/api/v1/poe/checkVisitor?passPortNumber=${passPortNumber}&nationality=${nationality}`;
}


const getFacilitiesAirportURL = () =>{
  return 'http://localhost:8000/api/v1/poe/facilities';
}
const registerVisitorsURL = () =>{
  return 'http://localhost:8000/api/v1/poe/visitor';
}

export {
  checkVisitsURL, getFacilitiesAirportURL, registerVisitorsURL
}

