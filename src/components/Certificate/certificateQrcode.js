import React from 'react';
import QRCode from 'qrcode.react';

export const CertificateQrcode = ({state}) => {
  const {firstName,
    lastName,
    nationality,
    passportId,gender, stayAddress,
    stayEmail,
    stayPhone, visitorId} = state;
  const url = `http://localhost:3000/vistors/${visitorId}`;
  const checkUndefined = (data) => data? data: '';
  return (
    <div className="row">
      <div className="col" style={{display: 'flex', flexDirection:'column', margin:'0% 0% 1% 45%'}}>
      <span style={{padding:'1%'}}>scan to validate</span>
      <QRCode value={
        `
        Passport number: ${checkUndefined(passportId)}
        Full name: ${checkUndefined(firstName)} ${checkUndefined(lastName)}
        Gender: ${checkUndefined(gender)}
        Nationality: ${checkUndefined(nationality)}
        Contact Phone: ${checkUndefined(stayPhone)}
        Contact Email: ${checkUndefined(stayEmail)}
        Staying Address: ${checkUndefined(stayAddress)}
        ${url}
        `}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        imageSettings={{
          src: "/icons/ministry.png",
          x: null,
          y: null,
          height: 24,
          width: 24,
          excavate: true,
        }}
        />
      </div>
    </div>
  );
};
