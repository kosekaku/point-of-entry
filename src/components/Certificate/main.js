import React, { useState, useEffect, useRef } from 'react';
import { CertificateBio } from './certificateBio';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { verifyEvent } from '../../services/poeAirport';
import './main.css';
import NotFoundPage from '../Helpers/notFoundPage';

export const ComponentToPrint = React.forwardRef((props, ref,) => {
  // checkl event
  const {state} = useLocation();
  const [eventData, setEventData] = useState([]);
  const [eventBio, setEventBio] = useState({});
  const [eventError, setEventError] = useState(false);
  const [visitsId, setVisitsId] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchParams] = useSearchParams();
  const componentRef = useRef();

  // hook for api services
  useEffect(() => {

    const idParam = searchParams.get('id');
    setVisitsId(idParam);
    
    const getApiData = async () => {
      setLoadingData(true);
      const data = await verifyEvent(idParam); // returns an object
      if (data !== undefined){
        setLoadingData(false);
        return setEventData(data.data);
      } else{
        setLoadingData(false);
        setEventError(true);
      }
    };
    if(state=== null) return getApiData();
    setEventBio(state);
    setLoadingData(false);
    
  }, [searchParams, state]);
  // const {visitorId} = state;
  const visitorId = visitsId;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `POE IHR 2005-${visitorId}}`,
    //onAfterPrint: printsTracking,
  });

  eventData.map(({dataElement, value}) => {

    if (dataElement === "YCHZU8pxHLI") return (eventBio.firstName = value);
    if (dataElement === "gms6oEPUk7D") return (eventBio.lastName = value);
    if (dataElement === "v5KB4meGBFe") return (eventBio.passportId = value);
    if (dataElement === "MQ1WrfzMvbE") return (eventBio.nationality = value);
    if (dataElement === "Rcs5V3Xsloq") return (eventBio.issuingCountry = value);
    if (dataElement === "Pe3CHmZicqT") return (eventBio.dateOfBirth = new Date(value));
    if (dataElement === "K6ciAYeQKWL") return (eventBio.gender = value);
    if (dataElement === "aIJWYDBFVQT") return (eventBio.departureAirport = value);
    if (dataElement === "cZpW431xdsq") return (eventBio.departureCountry = value);
    if (dataElement === "eOOFtYiBS79") return (eventBio.flightNo = value);
    if (dataElement === "cZpW431xdsq") return (eventBio.arrivalPort = value);
    if (dataElement === "fAtpkycHG2R") return (eventBio.stayAddress = value);
    if (dataElement === "oBhPNGyqn2a") return (eventBio.stayDuration = value);
    if (dataElement === "Cs1wQfbUHSV") return (eventBio.stayPhone = value);
    if (dataElement === "hW9Gm4wqanx") return (eventBio.stayEmail = value);

    if (dataElement === "KhAl7eY8tdX") return (eventBio.countryVisited1 = value);
    if (dataElement === "AOg1wewJiRE") return (eventBio.countryVisited2 = value);
    if (dataElement === "Xak52XWejN2") return (eventBio.countryVisited3 = value);
    if (dataElement === "S6Gct1kOGKh") return (eventBio.ebolaContact = value);
    if (dataElement === "wCjASq6bH2C") return (eventBio.covidContact = value);
    if (dataElement === "weTF1HjA6o1") return (eventBio.animalContact = value);
    if (dataElement === "JGnHr6WI3AY") return (eventBio.signsSymptoms = value);

  });
  // visitorId,
  // arrivalPort: arrivalPort,
  // signsSymptomsSelected


  return (
    <>
    {
                        eventError=== true && loadingData===false &&
                        <NotFoundPage statusCode="404" text="Visits information not found"/>
                      }
    {
      
      (eventError === false &&  loadingData === false &&  eventBio.hasOwnProperty('firstName')) && (
        <div >
      
      <div style={{margin: '10px'}}>
                    
                          <button 
                           className="btn btn-secondary btn-lg"
                            style={{ margin: '10px 1px 1px 3px',
                          width: "10%"}}
                            onClick={handlePrint}
                          >
                            Print
                          </button>
                        </div>
      <div className="black-border" ref={componentRef}> {/* ref to print, */}
       
                    <div
                      style={{
                        width: 'calc(100% - 20px) !important',
                        backgroundImage: 'url(/icons/ministry.png)',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.9,
                        backgroundPosition: 'center 55%',
                        backgroundSize: '25%',
                      }}
                    >
                      <div
                        style={{
                          tableLayout: 'fixed !important',
                          width: '100% !important',
                          wordWrap: 'break-word !important',
                          wordBreak: 'break-all !important',
                          marginBottom: '0px !important',
                          backgroundColor: '#fff',
                          opacity: '0.9',
                        }}
                      >
                        
                        {/* <CertificateHeader  /> */}
                        <CertificateBio state={eventBio} visitorId={visitorId} />
                      </div>
                      
                    </div>
                  </div>
                  
                  {/* <ToastContainer/> */}
  
    </div>
      )}
   </>
  );
});


