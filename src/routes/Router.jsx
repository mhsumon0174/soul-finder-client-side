import { createBrowserRouter } from "react-router";
import Error from "../pages/Error";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router=createBrowserRouter(
    [
        {
            path:'/',
            Component:HomeLayout,
            children:[
                {
                    index:true,
                    Component:Home
                },
                {
                    path:'/login',
                    Component:Login
                },
                {
                    
                    path:'/register',
                    Component:Register
                
                }

            ]

        },
        {
            path:'/*',
            Component:Error
        }
    ]
)
export default router