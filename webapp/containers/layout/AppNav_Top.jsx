import React from 'react';
import Relay from 'react-relay';

import IconMenu from '../../../node_modules/material-ui/lib/menus/icon-menu';
import MenuItem from '../../../node_modules/material-ui/lib/menus/menu-item';

import {Link} from 'react-router';

export default class AppNav_Top extends React.Component {

    render() {
        return (
            <ul style={{textAlign:'right',margin:8}}>
                <li style={{display:'inline-block'}}>
                    <MenuItem>
                        <Link
                            style={{color:"#ffffff",textDecoration:'none',padding:'16px 8px',margin:5, fontSize:15}}
                            to="/">Home
                        </Link>
                    </MenuItem>
                </li>
                <li style={{display:'inline-block'}}>
                    <MenuItem>
                        <Link
                            style={{textDecoration:'none',padding:'16px 8px',margin:5, fontSize:15,color:"#ffffff"}}
                            to="houses-for-sale">Houses For Sale
                        </Link>
                    </MenuItem>
                </li>
                <li style={{display:'inline-block'}}>
                    <MenuItem>
                        <Link
                            style={{textDecoration:'none',padding:'16px 8px',margin:5, fontSize:15,color:"#ffffff"}}
                            to="houses-for-rent">Houses For Rent
                        </Link>
                    </MenuItem>
                </li>
            </ul>

        );
    }
}
