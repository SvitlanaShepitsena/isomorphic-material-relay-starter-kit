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
                img: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg',
                title: 'Breakfast',
                author: 'jill111',
                featured: true,
            },
            {
                img: 'http://www.material-ui.com/images/grid-list/burger-827309_640.jpg',
                title: 'Tasty burger',
                author: 'pashminu',
            },
            {
                img: 'http://www.material-ui.com/images/grid-list/camera-813814_640.jpg',
                title: 'Camera',
                author: 'Danson67',
            },
            {
                img: 'http://www.material-ui.com/images/grid-list/morning-819362_640.jpg',
                title: 'Morning',
                author: 'fancycrave1',
                featured: true,
            },
            {
                img: 'http://www.material-ui.com/images/grid-list/hats-829509_640.jpg',
                title: 'Hats',
                author: 'Hans',
            },
            {
                img: 'http://www.material-ui.com/images/grid-list/honey-823614_640.jpg',
                title: 'Honey',
                author: 'fancycravel',
            },
            {
                img: 'http://www.material-ui.com/images/grid-list/vegetables-790022_640.jpg',
                title: 'Vegetables',
                author: 'jill111',
            },
            {
                img: 'http://www.material-ui.com/images/grid-list/water-plant-821293_640.jpg',
                title: 'Water plant',
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
                    {tilesData.map(tile => (
                        <GridTile
                            key={tile.img}
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


