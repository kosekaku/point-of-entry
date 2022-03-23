import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInputBox = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group row mb-2">
      <label htmlFor={name} className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-10">
        <PhoneInput
          {...rest}
          country={'ss'}
          countryCodeEditable={false}
          enableSearch={true}
          placeholder='hello phone'
          inputProps={{
            name: 'phone',
            id: 'phone',
            required: true,
            autoFocus: false,
          }}
         
          isValid={(value, country) => {
            if (value.toString().startsWith(`${country.dialCode}0`))
              return 'Phone number must not start with zero(0)';
            if ((value.length <12) || value.length >= 13 )
              return `Phone number must not be less or more than 9 in numbers`;

            if (
              country.dialCode === '211' &&
              !value.toString().startsWith(`${country.dialCode}9`)
            )
              return `South Sudan phone numbers must start with 9`;
          }}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default PhoneInputBox;
