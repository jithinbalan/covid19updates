import React, { Suspense } from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { HashRouter} from "react-router-dom";
import './assets/style.css'
//import {History} from './History'
import Spinner from "./views/Spinner/Spinner";

import reducer from "./store/reducers/reducer";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(

		<Suspense fallback={<Spinner />}>
		 <HashRouter>
		   <Provider store={store}>
		     <App />
		   </Provider>
		 </HashRouter>
		</Suspense>
	,
	document.getElementById('root')
);

