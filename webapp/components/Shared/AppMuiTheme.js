import React from 'react'
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
    spacing: Spacing,
    zIndex: zIndex,
    fontFamily: 'Roboto, sans-serif, Helvetica, Arial, sans-serif',
    palette: {
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
        pickerHeaderColor: Colors.blue500,

        primary1Color: Colors.blue500,
        primary2Color: Colors.blue800,
        primary3Color: Colors.blue100,
        accent1Color: Colors.red600,
        accent2Color: Colors.red500,
        accent3Color: Colors.redA100,
        success1Color: Colors.green500,
        success2Color: Colors.green700,
        success3Color: Colors.green100,

        footerColor: '#343434',
        footerText: '#9a9a9a',
        footerHeaderText: '#cdcdcd',
        textColor: 'rgba(0, 0, 0, 0.87)',
        additionalTextColor: "rgba(0, 0, 0, 0.67)",
        secondaryTextColor: "rgba(0, 0, 0, 0.54)",
        hintTextColor: "rgba(0, 0, 0, 0.26)",
        dividerColor: "rgba(0, 0, 0, 0.12)",
        backgroundColor: "#eaeaea",
        cardsColor: "#ffffff",
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