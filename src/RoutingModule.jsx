import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from './Comonent/Auth'
import Books from './Comonent/Books'
import Dashboard from './Comonent/Dashboard';
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
                }
            ]
        }
        
    ]);

    return (
        <RouterProvider router={routes} />
    );
};

export default RoutingModule;
