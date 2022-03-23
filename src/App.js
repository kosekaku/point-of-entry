import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import MainContent from './components/mainContent';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import styles from './App.module.css';

// monitering tool- sentry TODO- enable once app ready for production

const appConfig = {
  baseUrl: 'https://southsudanhis.org/covid19southsudan/api/organisationUnits.json?fields=id,name,level,displayName,ancestors[id,name,level,displayName]&paging=false&=',
  apiVersion: 33,
};

const queryClient = new QueryClient();

export default function App() {
  return (
    // <Provider config={appConfig}>
    <QueryClientProvider client={queryClient}>
      <MainContent/>   
    </QueryClientProvider>
  //  </Provider>
  );
}