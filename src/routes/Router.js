import { lazy } from "react";

import { Navigate } from 'react-router-dom';
import { HomeTwoTone, LockOpenTwoTone, ErrorTwoTone, AccountCircleTwoTone, BallotTwoTone} from '@material-ui/icons';
//import {History} from '../History'
//import { createBrowserHistory } from "history";


/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
const BlankLayout = lazy(() => import("../layouts/BlankLayout/BlankLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Home = lazy(() => import("../views/Home"));

const Error = lazy(() => import("../views/error/error"));
const Login = lazy(() => import("../views/Login"));
const DataTable = lazy(() => import("../views/Table"));
const ProfilePage = lazy(() => import("../views/Profile"));
const ChartPage = lazy(() => import("../views/Chart"));
const NewsPage = lazy(() => import("../views/News.js"));
const CountryPage = lazy(() => import("../views/Country.js"));


/*****Routes******/
const ThemeRoutes = [
	{
	  path: "/",
	  element: <FullLayout />,

	  children: [
		{ path: "/",  element: <Navigate to="home" /> },
		{ path: "home", icon: HomeTwoTone, exact: true, element:<Home/>},
		{ path: "table", icon: BallotTwoTone, element:<DataTable/>}, 
		{ path: "profile", icon: AccountCircleTwoTone, element:<ProfilePage/>},
		{ path: "chart", icon: ErrorTwoTone, element:<ChartPage/>}, 
		{ path: "news", icon: ErrorTwoTone, element:<NewsPage/>}, 
		{ path: "country", icon: ErrorTwoTone, element:<CountryPage/>}, 
		{ path: '*', element: <Navigate to="/auth/404/" />} 
	  ]
	},
	{
	  path: "/auth",
	  element: <BlankLayout />,
	  children: [
		  { path: "404", icon: ErrorTwoTone, element: <Error /> },
		  { path: "login", icon: LockOpenTwoTone, element: <Login /> },
	  ]
	}
  ];

export default ThemeRoutes;