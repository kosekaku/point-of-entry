import React from 'react';

const TravellerGuide = () => {
  return (
    <div
      className="card border-info mb-3 mx-auto"
      style={{ 'maxWidth': '50rem',margin:"50px",boxShadow: "5px 10px 18px lightblue", backgroundColorh:'lightblue',
    }}
    >
      <div className="card-header d-flex justify-content-center align-content-center">
        {' '}
        <h1>Welcome to South Sudan</h1>
      </div>
      <div className="card-body " >
        <h6 className="card-title d-flex justify-content-center align-content-center">
          The ministry of health warmly welcomes you to the Republic of South Sudan, 
          For your safety and health stay in South Sudan,
          we require you to fill this form prior to arrival in the designated port of entry and avail the same to the desk officer at the point of entry.......
        </h6>
        <ol className="card-text  list-group list-group-numbered text-center">
          <li className="list-group-item">
            Select your Nationality country
          </li>
          <li className="list-group-item ">
          Enter the valid passport/ nationality number
          </li>
          <li className="list-group-item ">
            Select mode of travel, and fill out the form in the next page
          </li>
        </ol>

        <p className="card-text">
          <small className="text-muted d-flex justify-content-center align-content-center">
            For further assistance, Contact the Ministry of Health
          </small>
        </p>
      </div>
    </div>
  );
};

export default TravellerGuide;
