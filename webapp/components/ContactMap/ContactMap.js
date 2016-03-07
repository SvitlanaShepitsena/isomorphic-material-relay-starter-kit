import React, {PropTypes} from 'react';
import Card from 'material-ui/lib/card/card';

class ContactCard extends React.Component {
    static propTypes = {};

    render() {

        return (
            <div >
                <iframe style={{display:"block",margin:"0 auto"}}
                        src="https://www.google.com/maps/d/embed?mid=zdTHzl0THQeM.kIf77Vwre964" width="640"
                        height="480"></iframe>
            </div>
        );
    }
}
export default ContactCard;
