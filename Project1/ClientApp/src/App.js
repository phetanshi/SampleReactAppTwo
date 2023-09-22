import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MsalProvider } from "@azure/msal-react";
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    </MsalProvider>
  )
}

export default App;