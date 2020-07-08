import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <div>
      <button onClick={() => props.display_form('login')}>login</button>
   </div>
  );

  const logged_in_nav = (
    <div>
      <button onClick={props.handle_logout}>logout</button>
      <a href='/home/'><button>Proceed to Home</button></a>
    </div>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};