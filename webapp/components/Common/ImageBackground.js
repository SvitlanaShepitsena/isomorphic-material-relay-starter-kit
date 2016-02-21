import React, {PropTypes} from 'react';

class SvLink extends React.Component {
    render() {
        return (
            <div
                className={this.props.wrapperClass}
                style={{
                width:this.props.imgWidth,
                 height:this.props.imgHeight,
                  overflow:"hidden",
                   position:"relative"
                   }}>
                <i style={{
                backgroundImage: "url(" +'"'+ this.props.backgroundImage +'"'+")",
                backgroundSize:'cover',
                backgroundPosition:'50% 25%',
                height: "100%",
                display:"block"
                }}/>
            </div>
        );
    }
}
export default  SvLink;
