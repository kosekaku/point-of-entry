import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { Divider} from '@dhis2/ui';
import countryList from 'react-select-country-list'; 
import parseISO from 'date-fns/parseISO';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-input-2/lib/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../../styles/styles.css';
import '.././Helpers/customStyles.css'; // custom css
import InputRe from '.././commons/input';
import Joi from 'joi-browser';
import SelectField from '.././commons/select';
import DatePickerSelect from '../commons/datePicker';
import PhoneInputBox from '../commons/phoneInput';
import { registerVisitors } from '../../services/poeAirport';
import { genderOptions, optionHealth,optionsSymptomsList } from '../Constants/constants';
import { poeAirSchema, validateSchema } from '../Schema/poeAirSchema';
import {validateProperty} from '../Schema/commonSchema';

const POEAirport = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // validations states data and error
  const [error, setError] = useState({});
  const [data, setData] = useState({});

  // declaring and initiazing states
  const [loadingTEI, setLoadingTEI] = useState(true);
  const [handleSubmitNext1, setHandleSubmitNext1] = useState(0);
  const [handleSubmitClicked, setHandleSubmitClicked] = useState(0);

  // POE main form
  const [passportId, setPassportId] = useState('');
  const [nationalitySelected, setNationalitySelected] = useState('');
  const options = useMemo(() => countryList().getData(), []);
  const [travelMode, setTravelMode] = useState('');
  const [airportOptions, setAirportOptions] = useState([]);


  // step 1- personal info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [issuingCountry, setIssuingCountry] = useState(nationalitySelected);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  //setp 2
  const [departureAirport, setDepartureAirport] = useState('');
  const [departureCountry, setDepartureCountry] = useState('');
  const [flightNo, setFlightNo] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalPort, setArrivalPort] = useState('');
  const [stayDuration, setStayDuration] = useState('');
  const [stayAddress, setStayAddress] = useState('');
  const [stayEmail, setStayEmail] = useState('');
  const [stayPhone, setStayPhone] = useState('');

  //step 3
  const [countryVisited1, setCountryVisited1] = useState('');
  const [countryVisited2, setCountryVisited2] = useState('');
  const [countryVisited3, setCountryVisited3] = useState('');
  const [ebolaContact, setEbolaContact] = useState('');
  const [covidContact, setCovidContact] = useState('');
  const [animalContact, setAnimalContact] = useState('');
  const [signsSymptoms, setSignsSymptoms] = useState('');
  const [signsSymptomsSelected, setSignsSymptomsSelected] = useState([]);
  let { passportId: idParam } = useParams();
  useEffect(() => {
    if (state === null) return navigate('/', { replace: true });
    const {
      nationality: initialNationality,
      passportId: initialPassportId,
      travelMode: initialTravelMode,
      firstName: initialFirstName,
      lastName: initialLastName,
      gender: initialGender,
      email: initialEmail,
      phone: initialPhone,
      airports,
    } = state;

    setNationalitySelected(initialNationality); // set the intial state nationality
    setPassportId(initialPassportId);
    setTravelMode(initialTravelMode);
    setIssuingCountry(initialNationality);
    setFirstName(initialFirstName);
    setLastName(initialLastName);
    setGender({ value: initialGender, label: initialGender });
    setStayEmail(initialEmail);
    setStayPhone(initialPhone);
    setAirportOptions(airports);
  }, [idParam]);

  

  const handleChange = ({ currentTarget: input }) => {
    data[input.name] = input.value;
    const errors = { ...error };
    const errorMessage = validateProperty(input, poeAirSchema);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    setData({ data });
    setError(errors);
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingTEI(true);
    setHandleSubmitClicked(1);
    setHandleSubmitNext1(1); 
    const errors = validateSchema(firstName,lastName,issuingCountry,age,
      gender,departureAirport,departureCountry,flightNo,arrivalDate,
      arrivalPort,stayDuration,stayAddress,stayEmail,stayPhone,ebolaContact,
      covidContact,animalContact, signsSymptoms, signsSymptomsSelected)
    setError(errors || {});
    if (errors) return;
    // call events submission api
    toast('Submitting data..');
    const results = await registerVisitors(
      firstName,
      lastName,
      nationalitySelected.value,
      passportId,
      issuingCountry.value,
      age.toISOString(),
      gender.value,
      travelMode.value,
      departureAirport,
      departureCountry.value,
      flightNo,
      arrivalDate.toISOString(),
      arrivalPort.value,
      stayDuration,
      stayAddress,
      stayEmail,
      stayPhone,
      countryVisited1.value,
      countryVisited2.value,
      countryVisited3.value,
      ebolaContact.value,
      covidContact.value,
      animalContact.value,
      signsSymptoms.value,
      signsSymptomsSelected
    );
    if(!results.data) return toast('Failed to submit data, please try again');
    toast.success('success, present this qrcode to the airport health check authorities');
    const {data: visitorId} = results.data;
    navigate(`/vistors/${visitorId}`, {state: {
      visitorId,
      firstName,
      lastName,
      nationality: nationalitySelected,
      passportId,
      issuingCountry: issuingCountry,
      dateOfBirth: age,
      gender: gender.value,
      travelMode: travelMode.value,
      departureAirport,
      departureCountry: departureCountry.value,
      flightNo,
      arrivalDate: arrivalDate,
      arrivalPort: arrivalPort,
      stayDuration,
      stayAddress,
      stayEmail,
      stayPhone,
      countryVisited1: countryVisited1,
      countryVisited2: countryVisited2,
      countryVisited3: countryVisited3,
      ebolaContact: ebolaContact.value,
      covidContact: covidContact.value,
      animalContact: animalContact.value,
      signsSymptoms: signsSymptoms.value,
      signsSymptomsSelected
    }});
  };

  //helper func for input
  const renderInput = (
    name,
    label,
    error,
    setState,
    placeHolder,
    type = 'text',
    value,
    autoFocus = false,
    disabled = false,
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
        autoFocus={autoFocus}
        disabled={disabled}
        value={value}
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
    value,
    isMulti = false,
    isDisabled = false,
    ...rest
  ) => {
    return (
      <SelectField
        id={name}
        name={name}
        label={label}
        error={error[name]}
        value={value}
        options={addOptions}
        onChange={(value) => setState(value)}
        placeholder={placeHolder}
        isDisabled={isDisabled}
        required
        isMulti={isMulti}
      />
    );
  };

  const renderDatePicker = (
    name,
    label,
    error,
    selected,
    setState,
    openToDate,
    placeHolder,
    maxDate,
    minDate,
    yearDropdownItemNumber,
    showYearDropdown = true
  ) => {
    return (
      <DatePickerSelect
        name={name}
        label={label}
        error={error[name]}
        selected={selected}
        onChange={(value) => setState(value)}
        openToDate={new Date(openToDate)}
        placeholderText={placeHolder}
        yearDropdownItemNumber={yearDropdownItemNumber}
        showYearDropdown={showYearDropdown}
        maxDate={maxDate}
        minDate={minDate}
      />
    );
  };

  const renderPhoneInput = (name, label, error, value, setter) => {
    return (
      <PhoneInputBox
        name={name}
        label={label}
        value={value}
        onChange={(phone) => setter(phone)}
      />
    );
  };

  return (
    <>
      {nationalitySelected !== '' && (
        <div className="container">
          <div style={{ background: 'rgba(250,255,255,0.6)' }}>
            <p className="d-flex justify-content-center">
              <img
                className="icon img-responsive"
                src="/icons/ministry.png"
                // width="100" height="150"
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
            <Divider dense />
            {/* start POE */}

            <div
              className=" mx-auto"
              style={{
                maxWidth: '65rem',
                //margin: '0px',
                //boxShadow: '0px 1px 0px cyan',
              }}
            >
              <div className="card text-left">
                <div className="card-header ">
                  <strong>Step 1,</strong> Personal information
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    {renderInput(
                      'firstName',
                      'First Name',
                      error,
                      setFirstName,
                      'Enter first name',
                      'text',
                      firstName,
                      true
                    )}
                    {renderInput(
                      'lastName',
                      'Last Name',
                      error,
                      setLastName,
                      'Enter last name',
                      'text',
                      lastName
                    )}
                    {renderSelectText(
                      'nationality',
                      'Nationality',
                      error,
                      options,
                      '',
                      '',
                      nationalitySelected,
                      false,
                      true
                    )}
                    {renderInput(
                      'passportNumber',
                      'Passport number',
                      error,
                      '',
                      '',
                      'text',
                      passportId,
                      false,
                      true
                    )}
                    {renderSelectText(
                      'issuingCountry',
                      'Issuing country',
                      error,
                      options,
                      setIssuingCountry,
                      'select country issuing passport',
                      issuingCountry,
                      false
                    )}
                    {renderDatePicker(
                      'age',
                      'Date of Birth',
                      error,
                      age,
                      setAge,
                      parseISO('1990-01-01T14:00:00'),
                      'Enter year of birth & select date',
                      new Date(),
                      '',
                      50
                    )}
                    {renderSelectText(
                      'gender',
                      'Gender',
                      error,
                      genderOptions,
                      setGender,
                      'Select Sex',
                      gender,
                      false
                    )}
                  </div>

                  {/* TODO hide button after moving to step 2 */}
                  <div className="card-text">
                    <button type="submit" className="btn btn-secondary">
                      NEXT
                    </button>
                  </div>
                </form>

                <div className="card-header">
                  <strong>Step, 2</strong> Travel information
                </div>
                {!error.hasOwnProperty('firstName') &&
                  !error.hasOwnProperty('lastName') &&
                  !error.hasOwnProperty('issuingCountry') &&
                  !error.hasOwnProperty('age') &&
                  !error.hasOwnProperty('gender') &&
                  handleSubmitNext1 === 1 && (
                    <>
                
                      <form onSubmit={handleSubmit}>
                        <div className="card-body">
                          {/*card body*/}
                          {renderInput(
                            'travelMode',
                            'Mode of travel',
                            error,
                            '',
                            'Enter your flight number',
                            'text',
                            travelMode.value,
                            false,
                            true
                          )}
                          {renderInput(
                            'departureAirport',
                            'Airport of departure',
                            error,
                            setDepartureAirport,
                            'Enter airport of departure',
                            'text',
                            departureAirport,
                            true
                          )}
                          {renderSelectText(
                            'departureCountry',
                            'Country of departure',
                            error,
                            options,
                            setDepartureCountry,
                            'Select country of departure',
                            departureCountry,
                            false
                          )}
                          {renderInput(
                            'flightNo',
                            'Flight Number',
                            error,
                            setFlightNo,
                            'Enter your flight number',
                            'text',
                            flightNo
                          )}
                          {renderDatePicker(
                            'arrivalDate',
                            'Date of Arrival',
                            error,
                            arrivalDate,
                            setArrivalDate,
                            new Date(),
                            'Select arrival date',
                            null,
                            new Date(),
                            null,
                            false
                          )}
                          {renderSelectText(
                            'arrivalAirport',
                            'Point of Entry',
                            error,
                            airportOptions,
                            setArrivalPort,
                            'Select point of entry into South Sudan',
                            arrivalPort,
                            false
                          )}
                          {renderInput(
                            'stayDuration',
                            'Duration of Stay in South Sudan',
                            error,
                            setStayDuration,
                            'Enter stay duration in days Ex. 10',
                            'text',
                            stayDuration
                          )}
                          {renderInput(
                            'stayAddress',
                            'Physical Address in South Sudan',
                            error,
                            setStayAddress,
                            'Enter address, Ex. Juba NaBari or Juba times hotel',
                            'text',
                            stayAddress
                          )}
                          {renderInput(
                            'stayEmail',
                            'Email contact while in South Sudan',
                            error,
                            setStayEmail,
                            'Enter valid email contact, ',
                            'text',
                            stayEmail
                          )}
                          {renderPhoneInput(
                            'stayPhone',
                            'Phone Contact',
                            error,
                            stayPhone,
                            setStayPhone
                          )}
                        </div>
                        <div className="card-text">
                          <button type="submit" className="btn btn-secondary">
                            NEXT
                          </button>
                        </div>
                      </form>
                      {/* card footer */}
                    </>
                  )}

                <div className="card-header">
                  <strong>Step 3,</strong> Health Check information
                </div>

                {!error.hasOwnProperty('departureAirport') &&
                  !error.hasOwnProperty('departureCountry') &&
                  !error.hasOwnProperty('flightNo') &&
                  !error.hasOwnProperty('arrivalDate') &&
                  !error.hasOwnProperty('arrivalAirport') &&
                  !error.hasOwnProperty('stayDuration') &&
                  !error.hasOwnProperty('stayAddress') &&
                  !error.hasOwnProperty('stayEmail') &&
                  !error.hasOwnProperty('stayPhone') &&
                  handleSubmitNext1 === 1 && (
                    <>
                      <form onSubmit={handleSubmit}>
                        <div className="card-body">
                          {/*card body*/}
                          {renderSelectText(
                            'countryVisited1',
                            'First Country visited in the last 21 days',
                            error,
                            options,
                            setCountryVisited1,
                            'Select first country..',
                            countryVisited1,
                            false
                          )}
                          {renderSelectText(
                            'countryVisited2',
                            'Second Country visited in the last 21 days',
                            error,
                            options,
                            setCountryVisited2,
                            'Select second country..',
                            countryVisited2,
                            false
                          )}
                          {renderSelectText(
                            'countryVisited2',
                            'Third Country visited in the last 21 days',
                            error,
                            options,
                            setCountryVisited3,
                            'Select third country..',
                            countryVisited3,
                            false
                          )}
                          {renderSelectText(
                            'ebolaContact',
                            'Past 21 days contact with ebola suspect/confirmed case?',
                            error,
                            optionHealth,
                            setEbolaContact,
                            'Ebola personnel contact in the past 21 days?',
                            ebolaContact,
                            false
                          )}
                          {renderSelectText(
                            'covidContact',
                            'Past 14 days contact with covid19 suspect/confirmed case?',
                            error,
                            optionHealth,
                            setCovidContact,
                            'Covid19 personnel contact in the past 14 days?',
                            covidContact,
                            false
                          )}
                          {renderSelectText(
                            'animalContact',
                            ' Past 21 days contact with sick/dead animal??',
                            error,
                            optionHealth,
                            setAnimalContact,
                            'Animal contact in the past 21 days?',
                            animalContact,
                            false
                          )}
                          {renderSelectText(
                            'signsSymptoms',
                            'Signs and Symptoms present?',
                            error,
                            optionHealth,
                            setSignsSymptoms,
                            'Any Signs and symptoms present?',
                            signsSymptoms,
                            false
                          )}

                          {signsSymptoms !== '' &&
                            signsSymptoms.value === 'yes' &&
                            // render health options
                            renderSelectText(
                              'signsSymptomsSelected',
                              'Select Signs and Symptoms',
                              error,
                              optionsSymptomsList,
                              setSignsSymptomsSelected,
                              'select Signs and symptoms possessed',
                              signsSymptomsSelected,
                              true
                            )}
                        </div>
                        <div className="card-text">
                          <button type="submit" className="btn btn-secondary">
                            SUBMIT
                          </button>
                        </div>
                      </form>
                      {/* card footer */}
                    </>
                  )}
              </div>{' '}
              {/*card footer*/}
            </div>

            {/* end POE */}
          </div>
          <ToastContainer
            position="top-center"
            //autoClose={loadingTime}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      )}
    </>
  );
};

export default POEAirport;
