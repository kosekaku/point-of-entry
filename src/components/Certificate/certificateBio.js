import { Table, TableBody, TableHead, TableRow, TableCell } from '@dhis2/ui';
import React, { useState, useEffect } from 'react';
import { CertificateQrcode } from './certificateQrcode';

export const CertificateBio = ({ state, visitorId }) => {
  const {
    firstName,
    lastName,
    nationality,
    passportId,
    issuingCountry,
    dateOfBirth,
    gender,
    travelMode,
    departureAirport,
    departureCountry,
    flightNo,
    arrivalDate,
    arrivalPort,
    stayDuration,
    stayAddress,
    stayEmail,
    stayPhone,
    countryVisited1,
    countryVisited2,
    countryVisited3,
    ebolaContact,
    covidContact,
    animalContact,
    signsSymptoms,
    signsSymptomsSelected,
  } = state;

 const labelCheck = (data) => {
   if(data!==undefined) return (data.label ? data.label : data);
 }
  return (
    <React.Fragment>
      <div className="vaccine-card-herader-sub-container text-center">
        <h2>International Arrivals Health Form (IHR 2005)</h2>
      </div>
      <div className="row mt-4">
      
        <div className="col">
          <div className="vaccine-card-bio-info ">
            <h6 className="vaccine-card-dose-table-header text-dark bg-light">
              Traveller Bio
            </h6>
            <TableRow>
              <TableCell>
                Name: <strong>{firstName} {lastName} </strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Passport Number: <strong> {passportId} </strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nationality: <strong> {labelCheck(nationality)}</strong> </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Date of Birth <strong> {dateOfBirth.getDate()}/
                {dateOfBirth.getMonth() + 1}/{dateOfBirth.getFullYear()}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender <strong>{gender}</strong></TableCell>
            </TableRow>
          </div>
        </div>
        <div className="col">
          <div className="vaccine-card-bio-info">
            <h6 className="vaccine-card-dose-table-header text-dark bg-light">
              Traveller Travel
            </h6>
            <TableRow>
              <TableCell>Departure Airport: <strong>{departureAirport}</strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Departure Country: <strong>{labelCheck(departureCountry)}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Flight Number: <strong>{flightNo} </strong></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Countries Visited in the last 21 days:
                <p>
                  <span> {labelCheck(countryVisited1)} </span> ,
                  <span> {labelCheck(countryVisited2)}</span> ,
                  <span> {labelCheck(countryVisited3)}</span>
                </p>
              </TableCell>
            </TableRow>
          </div>
        </div>

        <div className="col">
          <div className="vaccine-card-bio-info">
            <h6 className="vaccine-card-dose-table-header text-dark bg-light">
              Health Check
            </h6>
            <TableRow>
              <TableCell>
                Ebola contact?{' '}
                <strong>{ebolaContact}</strong>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>
                Covid19 Contact?{' '}
                <strong>{covidContact}</strong>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell >
                Dead/sick Contact? <strong>{animalContact}</strong>
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell>
                Signs and Symptoms:
                {(signsSymptomsSelected===undefined || signsSymptomsSelected.length === 0)? (
                  <span> {signsSymptoms} </span>
                ) : (
                  signsSymptomsSelected.map(({value, label }) => (
                    <span key={value}>{label} ,</span>
                  ))
                )}
              </TableCell>
            </TableRow>
          </div>
        </div>
      
      </div>
      <div className="row">
        <div className="col">
          <div className="vaccine-card-dose-container">
            <Table className="table-responsive table-borderless table-hover">
              <h6 className="vaccine-card-dose-table-header text-center text-dark bg-light">
                Contacts
              </h6>

              <TableBody>
                <TableHead>
                  <TableRow className="">
                    <TableCell> Phone </TableCell>
                    <TableCell> Email </TableCell>
                    <TableCell> Address </TableCell>
                    <TableCell> Stay duration </TableCell>
                    <TableCell> QRCode </TableCell>
                  </TableRow>
                </TableHead>
                <TableRow className="">
                  <TableCell> {stayPhone} </TableCell>
                  <TableCell> {stayEmail} </TableCell>
                  <TableCell> {stayAddress} </TableCell>
                  <TableCell> {stayDuration} </TableCell>
                  <TableCell> 
                  <CertificateQrcode
        state={{
          visitorId,
          firstName,
          lastName,
          nationality,
          passportId,
          gender,
          stayAddress,
          stayEmail,
          stayPhone,
        }}
      />  
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      {/* <CertificateQrcode
        state={{
          visitorId,
          firstName,
          lastName,
          nationality,
          passportId,
          gender,
          stayAddress,
          stayEmail,
          stayPhone,
        }}
      /> */}
    </React.Fragment>
  );
};
