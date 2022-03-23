import React, { useRef } from 'react';
import { CertificateHeader } from './certificateHeader';
import { CertificateBio } from './certificateBio';
import { useLocation } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import './main.css';

export const ComponentToPrint = React.forwardRef((props, ref,) => {
  const componentRef = useRef();
  const {state} = useLocation();
  const {visitorId} = state;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `POE IHR 2005-${visitorId}}`,
    //onAfterPrint: printsTracking,
  });
  return (
    <div >
      <div style={{margin: '10px'}}>
                    
                          <button 
                           className="btn btn-secondary btn-lg"
                            style={{ margin: '10px 1px 1px 3px',
                          width: "10%"}}
                            onClick={handlePrint}
                          >
                            Print
                          </button>
                        </div>
      <div className="black-border" ref={componentRef}> {/* ref to print, */}
       
                    <div
                      style={{
                        width: 'calc(100% - 20px) !important',
                        backgroundImage: 'url(/icons/ministry.png)',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.9,
                        backgroundPosition: 'center 55%',
                        backgroundSize: '25%',
                      }}
                    >
                      <div
                        style={{
                          tableLayout: 'fixed !important',
                          width: '100% !important',
                          wordWrap: 'break-word !important',
                          wordBreak: 'break-all !important',
                          marginBottom: '0px !important',
                          backgroundColor: '#fff',
                          opacity: '0.9',
                        }}
                      >
                        <CertificateHeader  />
                        <CertificateBio state={state} visitorId={visitorId} />
                      </div>
                    </div>
                  </div>
             
    </div>
  );
});


