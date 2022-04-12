import React from 'react';
import QRCode from 'qrcode.react';
import { verifyVisitorsURL, verifyURLQRCODE } from '../Constants/urls';
export const CertificateQrcode = ({state}) => {
  const {firstName,
    lastName,
    nationality,
    passportId,gender, stayAddress,
    stayEmail,
    stayPhone, visitorId: visitsId} = state;
  
  const host = window.location.origin;
  const url = verifyURLQRCODE(host, passportId, visitsId)
  const checkUndefined = (data) => data? data: '';
  return (
    <div className="row">
      <div className="col" style={{display: 'flex', flexDirection:'column', margin:'0% 0% 0% 0%'}}>
      {/* <span style={{padding:'1%', marginTop: '-15%'}}>scan to validate</span> */}
      <QRCode value={
        `
        Passport number: ${checkUndefined(passportId)}
        Full name: ${checkUndefined(firstName)} ${checkUndefined(lastName)}
        Gender: ${checkUndefined(gender)}
        Nationality: ${checkUndefined(nationality.label)}
        Contact Phone: ${checkUndefined(stayPhone)}
        Contact Email: ${checkUndefined(stayEmail)}
        Staying Address: ${checkUndefined(stayAddress)}
        Link: ${url}
        `}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        size={100}
        // style={{width: "80px", height: "60px"}}
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
