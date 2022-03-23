import Joi from 'joi-browser';

// Validation schema
const poeAirSchema = {
  firstName: Joi.string().required().label('First name'),
  lastName: Joi.string().required().label('Last name'),
  issuingCountry: Joi.string().required().label('Issuing country'),
  age: Joi.object().required().label('Date of birth is Required and'),
  gender: Joi.string().required().label('Gender option'),
  // step 2 data validation
  departureAirport: Joi.string().required().label('Departure airport'),
  departureCountry: Joi.string().required().label('Departure country'),
  flightNo: Joi.string().required().label('Flight number'),
  arrivalDate: Joi.object().required().label('Arrival Date'),
  arrivalAirport: Joi.string().required().label('Point of Entry'),
  stayDuration: Joi.number()
    .required()
    .label('Number of days in South Sudan'),
  stayAddress: Joi.string().required().label('Address of residency'),
  stayEmail: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
    .label('Email address'),
  stayPhone: Joi.string().required().label('Phone number'),

  // health check info validation
  ebolaContact: Joi.string().required().label('Ebola contact question'),
  covidContact: Joi.string().required().label('Covid19 contact question'),
  animalContact: Joi.string().required().label('Animal contact question'),
  signsSymptoms: Joi.string().required().label('Signs and symtoms question'),
  signsSymptomsSelected: Joi.array()
    //.required()
    .label('Signs and symtoms option question'),
};

//validate before submit
const validateSchema = (firstName,lastName,issuingCountry,age,
  gender,departureAirport,departureCountry,flightNo,arrivalDate,
  arrivalPort,stayDuration,stayAddress,stayEmail,stayPhone,ebolaContact,
  covidContact,animalContact, signsSymptoms, signsSymptomsSelected
  ) => {
  // data to validate
  const data1 = {
    // step one  perfornal info validation
    firstName: firstName,
    lastName: lastName,
    issuingCountry: issuingCountry.value,
    age: age,
    gender: gender.value,

    // step 2 travel info validation
    departureAirport: departureAirport,
    departureCountry: departureCountry.value,
    flightNo: flightNo,
    arrivalDate: arrivalDate,
    arrivalAirport: arrivalPort.value,
    stayDuration: stayDuration,
    stayAddress: stayAddress,
    stayEmail: stayEmail,
    stayPhone: stayPhone,

    //step 3 health check info
    ebolaContact: ebolaContact.value,
    covidContact: covidContact.value,
    animalContact: animalContact.value,
    signsSymptoms: signsSymptoms.value,
    signsSymptomsSelected: signsSymptomsSelected.value,
  };

  const errors = {};
  const options = { abortEarly: false };
  const { error } = Joi.validate(data1, poeAirSchema, options);

  if (!error) return null;
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
    return errors;
  }
};

// validate on Change
 const validateProperty = ({ name, value }) => {
  const obj = { [name]: value };
  const schema = { [name]: poeAirSchema[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};


export {poeAirSchema, validateSchema, validateProperty}