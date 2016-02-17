'use strict';
import React, {Component, PropTypes} from 'react';
import Button      from 'material-ui';

import IconButton from 'material-ui';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';

export default class SearchForm extends Component {
    render() {
        return (
            <div>
                <br/>
                <div
                    className='SearchForm__box'
                >
                    <input
                        className='SearchForm__input'
                        type='text'
                        placeholder='Address, City, Zip, #MLS'
                    />
                </div>
            </div>
        );
    }
}
