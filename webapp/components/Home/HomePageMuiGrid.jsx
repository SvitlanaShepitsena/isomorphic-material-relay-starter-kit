import React from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

//import Checkbox from 'material-ui/lib/checkbox';
import List from '../../../node_modules/material-ui/lib/lists/list';
//import Tabs from 'material-ui/lib/tabs/tabs';
//import Tab from 'material-ui/lib/tabs/tab';

export default class House_List extends React.Component {

    render() {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            }
        };

        const tilesData = [
            {
                img: 'http://res.cloudinary.com/svitlana/image/upload/v1454622622/skokie_rzluio.jpg',
                title: 'Skokie',
                author: 'jill111',
                featured: true,
            },
            {
                img: 'http://res.cloudinary.com/svitlana/image/upload/v1455168518/northbrook_yasan1.jpg',
                title: 'New Listings',
                author: 'pashminu',
            },
            {
                img: 'http://res.cloudinary.com/svitlana/image/upload/v1453658589/Skokie-Fountain_infazt.jpg',
                title: 'Popular',
                author: 'Danson67',
            },
            {
                img: 'http://res.cloudinary.com/svitlana/image/upload/v1454621648/evanston_nqfjkr.jpg',
                title: 'Neighbourhood',
                author: 'fancycrave1',
                featured: true,
            },
            {
                img: 'http://res.cloudinary.com/svitlana/image/upload/v1453658589/Skokie-Fountain_infazt.jpg',
                title: 'Foreclosure',
                author: 'Hans',
            },
            {
                img: 'http://res.cloudinary.com/svitlana/image/upload/v1454622622/skokie_rzluio.jpg',
                title: 'Bank Owned',
                author: 'fancycravel',
            },
            {
                img: 'http://res.cloudinary.com/svitlana/image/upload/v1454622622/skokie_rzluio.jpg',
                title: 'Price Educed',
                author: 'jill111',
            },
            {
                img: 'http://res.cloudinary.com/svitlana/image/upload/v1454622622/skokie_rzluio.jpg',
                title: 'Short Sale',
                author: 'BkrmadtyaKarki',
            },
        ];
        return (
            <div style={styles.root}>
                <GridList
                    cols={2}
                    cellHeight={200}
                    padding={1}
                    className="HomePageGrid__GridList"
                >
                    {tilesData.map((tile,index) => (
                        <GridTile
                            key={index}
                            title={tile.title}
                            actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
                            actionPosition="left"
                            titlePosition="top"
                            titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                            cols={tile.featured ? 2 : 1}
                            rows={tile.featured ? 2 : 1}
                        >
                            <img src={tile.img}/>
                        </GridTile>
                    ))}
                </GridList>
            </div>
        );
    }

}


