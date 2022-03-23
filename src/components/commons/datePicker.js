import React from 'react';
import DatePicker from 'react-datepicker';

const DatePickerSelect = ({ name, label, error, ...rest }) => {
  return (
    <>
      <div className="form-group row mb-2">
        <label htmlFor={name} className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10 " style={{ margin: '10px 0px 15px 0px' }}>
          <DatePicker
            {...rest}
            name={name}
            id={name}
            dateFormat="yyyy-MM-dd"
            scrollableYearDropdown
                      />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};

export default DatePickerSelect;
