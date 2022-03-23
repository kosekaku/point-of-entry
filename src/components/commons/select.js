import React from 'react';
import Select from 'react-select';

const SelectField = ({ name, label, error, ...rest }) => {
  return (
    <>
      <div className="form-group row mb-2">
        <label htmlFor={name} className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <Select {...rest} name={name} />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default SelectField;
