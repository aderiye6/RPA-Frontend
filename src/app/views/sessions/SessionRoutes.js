import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
import UserConsole from '../UserConsole/UserConsole';
import FlowDesigner from '../FlowDesigner/FlowDesigner';
import RoboConsole from '../RoboConsole/RoboConsole';
// import AccountSetUp from '../AccountSetUp/AccountSetUp';
// import VerifyOTP from '../VerifyOTP/VerifyOTP';

const NotFound = Loadable(lazy(() => import("./NotFound")));
const ForgotPassword = Loadable(lazy(() => import("./ForgotPassword")));
const JwtLogin = Loadable(lazy(() => import("./login/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./register/JwtRegister")));
const VerifyOTP = Loadable(lazy(() => import("../VerifyOTP/VerifyOTP")));
const AccountSetUp = Loadable(lazy(() => import("../AccountSetUp/AccountSetUp")));

const sessionRoutes = [
    {
        path: '/session/signup',
        element: <JwtRegister />,
    },
    {
        path: '/session/signin',
        element: <JwtLogin />,
    },
    {
        path: '/verify-otp',
        element: <VerifyOTP />,
    },
    {
        path: '/account-setup',
        element: <AccountSetUp />,
    },
    {
        path: '/session/forgot-password',
        element: <ForgotPassword />,
    },
  
    // {
    //     path: '/console/robo_console/:id',
    //     element: <RoboConsole />,
    // },
    {
        path: '/user/console',
        element: <UserConsole />,
    },
    {
        path: '/session/404',
        element: <NotFound />,
    },
]

export default sessionRoutes
