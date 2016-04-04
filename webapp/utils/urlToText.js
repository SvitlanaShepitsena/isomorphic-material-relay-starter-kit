import _ from 'lodash';

export default (text)=> {
    if (text) {

        text = _.startCase(text.trim().replace(/-+/g, ' '));

        if (text.toLowerCase() == 'condominium units') {
            text = "Condos";
        }
        if (text.toLowerCase() == 'multi family homes') {
            text = "Multi-Family Homes";
        }
        if (text.toLowerCase() == 'co op units') {
            text = "Co-ops";
        }
        if (text.toLowerCase() == 'townhouse townhomes') {
            text = "Townhomes";
        }
        if (text.toLowerCase() == 'raw lands') {
            text = "Raw Land";
        }

        return text;
    }
}

