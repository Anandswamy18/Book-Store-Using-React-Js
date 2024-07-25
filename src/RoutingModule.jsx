import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from './Comonent/Auth'
import Books from './Comonent/Books'
import Dashboard from './Comonent/Dashboard';
import MyCart from './Comonent/Mycart';
import WishListContainer from './Comonent/WishListContainer';
import MyOrdersContainer from './Comonent/MyOrdersContainer';
import OrderPlaced from './Comonent/OrderPlaced';
import ProfilePage from './Comonent/PofilePage';




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
                },
                {
                    path:"/mywishlist",
                    element:<WishListContainer/>
                },
                {
                    path:"/myoders",
                    element:<MyOrdersContainer/>
                },
                {
                    path:"/OrderPlaced",
                    element:<OrderPlaced/>
                },
                {
                    path:"/profile",
                    element:<ProfilePage/>
                }
            ]
        }
        
    ]);

    return (
        <RouterProvider router={routes} />
    );
};

export default RoutingModule;
