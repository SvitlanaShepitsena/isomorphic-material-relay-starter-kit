import React from 'react'
import Colors from '../../node_modules/material-ui/lib/styles/colors';
import ColorManipulator from '../../node_modules/material-ui/lib/utils/color-manipulator';
import Spacing from '../../node_modules/material-ui/lib/styles/spacing';
import zIndex from '../../node_modules/material-ui/lib/styles/zIndex';

export default {
    spacing: Spacing,
    zIndex: zIndex,
    fontFamily: 'Roboto, sans-serif, Helvetica, Arial, sans-serif',
    palette: {


        textColor: 'rgba(0, 0, 0, 0.87)',
        additionalTextColor: "rgba(0, 0, 0, 0.67)",
        secondaryTextColor: "rgba(0, 0, 0, 0.54)",
        hintTextColor: "rgba(0, 0, 0, 0.26)",
        dividerColor: "rgba(0, 0, 0, 0.12)",
        backgroundColor: "#eaeaea",
        cardsColor: "#ffffff",

        footerColor: '#343434',
        footerText: '#9a9a9a',
        footerHeaderText: '#cdcdcd',

        greenApp: Colors.green500,
        pinkApp: Colors.pink500,
        redApp: Colors.red500,
        purpleApp: Colors.purple500,
        indigoApp: Colors.indigo500,
        blueApp: Colors.blue500,
        tealApp: Colors.teal500,
        cyanApp: Colors.cyan500,
        limeApp: Colors.lime500,
        amberApp: Colors.amber500,
        yellowApp: Colors.yellow500,
        orangeApp: Colors.orange500,
        brownApp: Colors.brown500,
        greyApp: Colors.grey500,
    }
};