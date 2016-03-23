import React, {PropTypes} from 'react';
import urlToText from '../../../utils/urlToText.js';

/*=materialUi*/
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import Divider from 'material-ui/lib/divider';
/*=styles*/
import styles from './ZipTypeList.less';

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
        let itemValueFormatted = urlToText(itemValue)

        if (!itemValue.match(/^\d+$/g)) {
            itemValue += 's';
            itemValueFormatted += 's';
            var removePage = true;
        }

        let urlValue = `${itemValue}`;
        let badgeValue = item[`${children}_Count`];
        if (badgeValue) {

            return (
                <li className={styles.item} key={itemValue}>
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
                <CardTitle title={<span className={styles.sectionTitle}>{sectionTitle}</span> }/>
                <Divider />
                <CardActions>
                    <ul style={{lineHeight: 3.8, paddingTop:8}}>
                        {list.map(this.oneZip)}
                    </ul>
                </CardActions>
            </Card>
        );
    }
}

export default ZipTypeList;
