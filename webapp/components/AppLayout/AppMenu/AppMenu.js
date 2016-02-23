import React from 'react';
import {Link} from 'react-router';

/*=materialUi*/
import MenuItem from 'material-ui/lib/menus/menu-item';
/*=styles*/
import styles from './AppMenu.css';

class AppMenu extends React.Component {

    render() {
        return (
            <ul style={{textAlign:'right',margin:8}}>
                <li style={{display:'inline-block'}}>
                    <MenuItem>
                        <Link
                            style={{textDecoration:'none',padding:'16px 8px',margin:5, fontSize:15,color:"#ffffff"}}
                            to="/houses-for-sale">Houses For Sale
                        </Link>
                    </MenuItem>
                </li>
                {/*                <li style={{display:'inline-block'}}>
                 <MenuItem>
                 <Link
                 style={{textDecoration:'none',padding:'16px 8px',margin:5, fontSize:15,color:"#ffffff"}}
                 to="/houses-for-rent">Houses For Rent
                 </Link>
                 </MenuItem>
                 </li>*/}
                <li style={{display:'inline-block'}}>
                    <MenuItem>
                        <Link
                            style={{color:"#ffffff",textDecoration:'none',padding:'16px 8px',margin:5, fontSize:15}}
                            to="/about">About
                        </Link>
                    </MenuItem>
                </li>
                <li style={{display:'inline-block'}}>
                    <MenuItem>
                        <Link
                            style={{color:"#ffffff",textDecoration:'none',padding:'16px 8px',margin:5, fontSize:15}}
                            to="/contact">Contact
                        </Link>
                    </MenuItem>
                </li>
            </ul>

        );
    }
}
export default  AppMenu;
