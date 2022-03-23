import React from 'react';
import { Divider } from '@dhis2/ui';
//import POELand from './POELand/main';
const POELand = () => {
  return (
    <>
      <div className="container">
        <div style={{ background: 'rgba(250,255,255,0.6)' }}>
          <p className="d-flex justify-content-center">
            <img
              className="icon img-responsive"
              src="/icons/ministry.png"
              alt="Ministry of Health-Juba"
            />
          </p>
          <p className="d-flex justify-content-center">Ministry of Health</p>
          <p className="d-flex justify-content-center">
            Republic of South Sudan
          </p>
          <h1 className="d-flex text-secondary justify-content-center">
            Covid-19 health arrival form
          </h1>
          <Divider dense />
          <div
            class=" mx-auto"
            style={{
              maxWidth: '65rem',
              boxShadow: '0px 1px 0px cyan',
            }}
          >
            <div class="card text-left">
              <h3 className="text-center mt-5 mb-5">
                POE Land and River is still <strong> Under development </strong>
              </h3>
            </div>{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default POELand;
