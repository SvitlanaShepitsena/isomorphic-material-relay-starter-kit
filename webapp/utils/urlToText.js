import _ from 'lodash';

export default (text)=> _.startCase(text.trim().replace(/-+/g,' '));

