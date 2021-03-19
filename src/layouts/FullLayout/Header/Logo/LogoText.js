import React from 'react';
import logotxt from "../../../../assets/images/covid-text.png";
const LogoText = (props) => {
    return ( 
        <img
            alt="Logo"
            src={logotxt}
            {...props}
            className="logo-text"
        />
    );
}
 
export default LogoText;