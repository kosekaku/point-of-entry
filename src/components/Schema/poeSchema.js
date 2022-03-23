import Joi from 'joi-browser'; 
 // Validation schema
 const schemaPOE = {
  nationality: Joi.string().required().label('Nationality'),
  passportNumber: Joi.string().min(5).required().label('Passport number'),
  travelMode: Joi.string().required().label('Travel mode'),
};

//validate before submit
const validateSchema = (nationalitySelected,passportId,travelMode ) => {
  // data to validate
  const data = {
    nationality: nationalitySelected.value,
    passportNumber: passportId,
    travelMode: travelMode.value,
  };
  const errors = {};
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schemaPOE, options);
  if (!error) return null;
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
    return errors;
  }
  // return Object.keys(errors).length === 0 ? null : errors;
};

export {schemaPOE, validateSchema}