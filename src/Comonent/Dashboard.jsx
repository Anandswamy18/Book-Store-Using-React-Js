import React from 'react';
import Header from './Header';
import Footer from './Fotter';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './../store/appStore';

const Dashboard = () => {
  return (

    <Provider store={appStore}>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
    </Provider>
  );
}

export default Dashboard;
