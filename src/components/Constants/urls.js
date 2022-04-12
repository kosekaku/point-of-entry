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
const verifyVisitorsURL = (id) =>{
  return `${REACT_APP_API_HOST}/api/v1/poe/visitor/?visitId=${id}`;
}

const verifyURLQRCODE = (host, passportId, eventId) => {
  return `${host}/visitors/${passportId}/?id=${eventId}`;
}

export {
  checkVisitsURL, getFacilitiesAirportURL, registerVisitorsURL,
  verifyVisitorsURL, verifyURLQRCODE
}

