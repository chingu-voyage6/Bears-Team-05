// root component, can handle authentication here
import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children }) => (
  <div>
    { children }
  </div>
);

Main.defaultProps = {
  children: <div>defaultProps to satisfy ESLint Airbnb rules</div>,
};

Main.propTypes = {
  children: PropTypes.element,
};

export default Main;
