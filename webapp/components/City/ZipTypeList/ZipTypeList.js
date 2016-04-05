import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';
import _ from 'lodash';

/*=materialUi*/
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import Divider from 'material-ui/lib/divider';
/*=styles*/
import styles from './ZipTypeList.less';
import seoType from '../../../utils/seoType.js';
import typePlural from '../../../utils/typePlural.js';

/*=Components*/
import ButtonWithBadge from '../../Common/ButtonWithBadge/ButtonWithBadge.js';
/*=*/
class ZipTypeList extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        itemId: PropTypes.string.isRequired,
        sectionTitle: PropTypes.string,
        children: PropTypes.string
    };
    oneZip = (edge) => {
        let item = edge.node;
        let {itemId, children} = this.props;

        let itemValue = item[itemId];
        let itemValueFormatted = urlToText(itemValue);
        console.log(itemValue);

        if (!itemValue.match(/^\d+$/g)) {
            itemValue = typePlural(itemValue);
            itemValueFormatted = typePlural(itemValueFormatted);
            itemValueFormatted = seoType(itemValueFormatted);
            var removePage = true;
        }

        let urlValue = `${itemValue}`;
        urlValue = urlValue.match(/\/1^/) ? urlValue : urlValue + '/1';

        let badgeValue = item[`${children}_Count`];

        if (badgeValue) {

            return (
                <li className={this.props.itemClass} key={itemValue}>
                    <ButtonWithBadge
                        btnLabel={itemValueFormatted}
                        btnUrl={urlValue}
                        badgeValue={badgeValue}
                        removePage={removePage}
                    />
                </li>
            )
        }
    };

    render() {
        let {list, sectionTitle} = this.props;
        return (
            <Card className={styles.card}>
                <CardTitle title={<h2 className={styles.sectionTitle}>{sectionTitle}</h2> }/>
                <Divider />
                <CardActions>
                    <ul className={this.props.listClass} style={{lineHeight: 3.8, paddingTop:8}}>
                        {list.map(this.oneZip)}
                    </ul>
                </CardActions>
            </Card>
        );
    }
}

export default ZipTypeList;
