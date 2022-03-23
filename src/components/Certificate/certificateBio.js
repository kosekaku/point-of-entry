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

  return (
    <React.Fragment>
      <div className="row mt-4">
        <div className="col">
          <div className="vaccine-card-bio-info ">
            <h5 className="vaccine-card-dose-table-header text-center text-dark bg-light">
              Traveller Bio
            </h5>
            <TableRow>
              <TableCell>
                Name: {firstName} {lastName}{' '}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Passport Number: {passportId} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nationality: {nationality.label} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Date of Birth {dateOfBirth.getDate()}/
                {dateOfBirth.getMonth() + 1}/{dateOfBirth.getFullYear()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender {gender}</TableCell>
            </TableRow>
          </div>
        </div>
        <div className="col">
          <div className="vaccine-card-bio-info">
            <h5 className="vaccine-card-dose-table-header text-center text-dark bg-light">
              Traveller Travel
            </h5>
            <TableRow>
              <TableCell>Departure Airport: {departureAirport}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Departure Country: {departureCountry.label}{' '}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Flight Number: {flightNo} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Countries Visited in the last 21 days:
                <p>
                  <span> {countryVisited1.label} </span> ,
                  <span> {countryVisited2.label}</span> ,
                  <span> {countryVisited3.label}</span>
                </p>
              </TableCell>
            </TableRow>
          </div>
        </div>

        <div className="col">
          <div className="vaccine-card-bio-info">
            <h5 className="vaccine-card-dose-table-header text-center text-dark bg-light">
              Health Check
            </h5>
            <TableRow>
              <TableCell>
                Being in contact with Ebola suspect/confirmed case?{' '}
                {ebolaContact}
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>
                Being in contact with Covid19 suspect/confirmed case?{' '}
                {covidContact}
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell >
                Being in contact with dead/sick Animal? {animalContact}
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell>
                Signs and Symptoms:
                {signsSymptomsSelected.length === 0 ? (
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
              <h5 className="vaccine-card-dose-table-header text-center text-dark bg-light">
                Contacts
              </h5>

              <TableBody>
                <TableHead>
                  <TableRow className="">
                    <TableCell> Phone </TableCell>
                    <TableCell> Email </TableCell>
                    <TableCell> Address </TableCell>
                    <TableCell> Stay duration </TableCell>
                  </TableRow>
                </TableHead>
                <TableRow className="">
                  <TableCell> {stayPhone} </TableCell>
                  <TableCell> {stayEmail} </TableCell>
                  <TableCell> {stayAddress} </TableCell>
                  <TableCell> {stayDuration} </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
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
    </React.Fragment>
  );
};
