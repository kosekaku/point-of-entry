import Joi from 'joi-browser'; 

const validateProperty = ({ name, value },schemaName) => {
  const obj = { [name]: value };
  const schema = { [name]: schemaName[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};

export {validateProperty}