import React from 'react';
import PropTypes from 'prop-types';


const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
          <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        day
          </h1>
      <h5 className="tagline"><span>{props.tagline}</span></h5>
    </header>
  )
}

Header.propTypes = {
  tagline: PropTypes.string.isRequired
}

export default Header;