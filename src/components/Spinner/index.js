import React from 'react';
import { createPortal } from 'react-dom';

import Styles from './styles.scss';

// Usual Spinner

// const Spinner =  ({ spinnerVisible }) => spinnerVisible
//     ? <div id = 'spinner'><section className = {Styles.spinner} /></div>
//     : null;
//
// export default Spinner;

// ---------------------------------------


// Spinner using portal

const portal = document.getElementById('spinner');

const Spinner = ({ spinnerVisible }) =>
    createPortal(
        spinnerVisible
            ? <div className = { Styles.spinner } />
            : null,
        portal
    );

export default Spinner;

// ---------------------------------------
