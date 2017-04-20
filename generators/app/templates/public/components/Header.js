import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';

const Header = props => (
    <div>
        <AppBar
            showMenuIconButton={false}
            title={props.title}
        />
    </div>
)

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;