import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from './Comonent/Auth'
import Books from './Comonent/Books'
import Dashboard from './Comonent/Dashboard';
import MyCart from './Comonent/Mycart';

const RoutingModule = () => {
    const routes = createBrowserRouter([
        {
            path: "/signup",
            element: <Auth />,
        },
        

        {
            path:"/",
            element:<Dashboard/>,
            children:[
                
                {
                    path:"",
                    element:<Books/>
                },
                {
                    path:"/mycart",
                    element:<MyCart/>
                }
            ]
        }
        
    ]);

    return (
        <RouterProvider router={routes} />
    );
};

export default RoutingModule;
