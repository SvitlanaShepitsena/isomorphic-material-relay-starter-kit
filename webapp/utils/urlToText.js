import _ from 'lodash';

export default (text)=> {
    if (text) {

        return _.startCase(text.trim().replace(/-+/g, ' '));
    }
}

