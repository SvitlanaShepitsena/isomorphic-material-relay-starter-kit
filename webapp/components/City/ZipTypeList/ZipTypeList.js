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
        urlValue = urlValue.match(/\/1^/) ? urlValue : urlValue + '/1';

        let badgeValue = item[`${children}_Count`];

        if (itemValueFormatted.toLowerCase() == 'condominium units') {
            itemValueFormatted = "Condominiums / Condos";
        }
        if (itemValueFormatted.toLowerCase() == 'co op units') {
            itemValueFormatted = "Cooperatives / Co-ops";
        }
        if (itemValueFormatted.toLowerCase() == 'townhouse townhomes') {
            itemValueFormatted = "Townhouses / Townhomes";
        }
        if (itemValueFormatted.toLowerCase() == 'duplexs') {
            itemValueFormatted = "Duplexes";
        }

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
