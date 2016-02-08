import React from 'react';
import Relay from 'react-relay';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Determine error text, since we already have the errors in state
        return (
            <div>
                <h1>About Us</h1>
            </div>
        );
    }
}

