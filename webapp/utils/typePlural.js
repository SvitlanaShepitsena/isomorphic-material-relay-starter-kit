import _ from 'lodash';

export default (text)=> {
    if (text) {
        var last = _.last(text).toLowerCase();
        if (last == 'x' || last === 's' || last === 'z') {
            text += "es";
        }
        else {
            if (last === 'd') {
                text += "";
            }
            else {
                text += "s";
            }
        }
        return text;
    }
}

