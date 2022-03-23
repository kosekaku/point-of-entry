import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import {  Divider} from '@dhis2/ui';
import countryList from 'react-select-country-list'; //TODO remove
import LoadingIndicator from './Helpers/loadingIndicator';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-input-2/lib/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../styles/styles.css';
import './Helpers/customStyles.css'; // custom css
import TravellerGuide from './travellerGuides';
import InputRe from './commons/input';
import SelectField from './commons/select';
import { checkVisits, getFacilitiesAirport } from '../services/poeAirport';
import { schemaPOE, validateSchema } from './Schema/poeSchema';
import {validateProperty} from './Schema/commonSchema';

const MainContent = () => {
  const navigate = useNavigate();
  const [loadingTEI, setLoadingTEI] = useState(true);
  const [loadingSwitch, setLoadingSwitch] = useState(true);
  const [handleSubmitClicked, setHandleSubmitClicked] = useState(0);

  // state data
  const [passportId, setPassportId] = useState('');
  const [nationalitySelected, setNationalitySelected] = useState('');
  const options = useMemo(() => countryList().getData(), []);
  const [travelMode, setTravelMode] = useState('');

  // data and error state validation
  const [error, setError] = useState({});
  const [data, setData] = useState({});

  const travelOptions = [
    { value: 'air', label: 'Air' },
    { value: 'land', label: 'Land Border', isDisabled: true },
    { value: 'river', label: 'River ', isDisabled: true },
  ];
 const [airports, setAirports] = useState([]);
  // load airport ou effect TODO, refactor this func to reuse for land
  useEffect(()=> {
    const getAirports = async() =>{
      const {data} = await getFacilitiesAirport();
      if(!data) setLoadingSwitch(true);
      setAirports(data);
      setLoadingSwitch(false);
      if (!localStorage) return setAirports(data);
      localStorage.setItem('airports', JSON.stringify(data));
    }
    const storedAirports = localStorage.getItem('airports');
    if(storedAirports===null || storedAirports===undefined ) return getAirports(); // no local storage support in browser
    setAirports(JSON.parse(storedAirports));
    setLoadingSwitch(false);
  },[loadingSwitch]);


  const handleSubmit = async (e) => {
    e.preventDefault();                                                                                                  
    //const errors = validate();
    const errors = validateSchema(nationalitySelected, passportId, travelMode);
    if(errors) return setError(errors || {});;
    setHandleSubmitClicked(1);
    if (travelMode.value === 'air'.toLocaleLowerCase()){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      const {data} = await checkVisits(passportId,nationalitySelected.value);
      if(!data) return setLoadingTEI(true);
      setLoadingTEI(false);
      const {firstName, lastName, gender, email, phone} = data;
     const stateData = {
       nationality: nationalitySelected,
      passportId,
      travelMode,
      firstName, lastName, gender, email, phone,
      airports

    }
    return navigate(`/airport/${passportId}`, {state: stateData
    });
   }
    // land border api initla calls
    if (travelMode.value === 'land'.toLocaleLowerCase())
    return navigate(`/land/${passportId}`, {state: initialData
    });
    // set joi errors if any
    setError(errors || {});
    setLoadingTEI(true);
    setHandleSubmitClicked(1);
  }; 

  const handleChange = ({ currentTarget: input }) => {
    data[input.name] = input.value;
    const errors = { ...error };
    const errorMessage = validateProperty(input, schemaPOE);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setData({ data });
    setError(errors);
  };

  const renderInput = (
    name,
    label,
    error,
    setState,
    placeHolder,
    type = 'text',
    ...rest
  ) => {
    return (
      <InputRe
        name={name}
        label={label}
        type={type}
        error={error[name]}
        onChange={(e) => {
          handleChange(e);
          setState(data[name]);
        }}
        placeholder={placeHolder}
      />
    );
  };

  const renderSelectText = (
    name,
    label,
    error,
    addOptions,
    setState,
    placeHolder,
    ...rest
  ) => {
    return (
      <SelectField
        id={name}
        name={name}
        label={label}
        error={error[name]}
        options={addOptions}
        onChange={(value) => setState(value)}
        placeholder={placeHolder}
        required
      />
    );
  };
  const initialData = {
    nationality: nationalitySelected,
    passportId,
    travelMode,
  };

  return (
    <>
      {loadingSwitch===true && 
      <LoadingIndicator/>}
      <div className="container">
        <div style={{ background: 'rgba(250,255,255,0.6)' }}>
          <p className="d-flex justify-content-center">
            <img
              className="icon img-responsive"
              src="/icons/ministry.png"
              alt="Ministry of Health-Juba"
            />
          </p>
          <p className="d-flex justify-content-center">Ministry of Health</p>
          <p className="d-flex justify-content-center">
            Republic of South Sudan
          </p>
          <h1 className="d-flex text-secondary justify-content-center">
            Covid-19 health arrival form
          </h1>
        </div>
        <div>
          <div>
            <div>
              <form onSubmit={handleSubmit}>
        
                {renderSelectText(
                  'nationality',
                  'Nationality',
                  error,
                  options,
                  setNationalitySelected,
                  'Select your nationality'
                )}
                {renderInput(
                  'passportNumber',
                  'Passport/ Nationality Number',
                  error,
                  setPassportId,
                  'Enter valid passport/ nationality number'
                )}
                {renderSelectText(
                  'travelMode',
                  'Travel entry mode',
                  error,
                  travelOptions,
                  setTravelMode,
                  'Select travel/entry mode'
                )}

                <div
                  className="d-flex justify-content-left "
                  style={{ margin: '1% 0% 0% 17%' }}
                >
                  <button type="submit" className="btn btn-secondary">
                    SUBMIT
                  </button>
                </div>
              </form>
              {handleSubmitClicked === 1 && loadingTEI === true && (
                <div className="text-center">
                  <button className="btn " type="text" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Preparing <strong> Port Entry </strong> Form..
                  </button>
                </div>
              )}
            </div>
          </div>
          <Divider dense />
          <div>
            <TravellerGuide  />
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default MainContent;
