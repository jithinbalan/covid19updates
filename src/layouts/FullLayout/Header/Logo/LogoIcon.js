import React from 'react';
// import logoicn from '../../../../assets/images/logo-light-icon.png'
import logoicn from '../../../../assets/images/covid-icon.png'


const LogoIcon = (props) => {
    return ( 
        <img
            alt="Logo"
            src={logoicn}
            {...props}
            className="logo-icon"
        />
    );
}
 
export default LogoIcon;