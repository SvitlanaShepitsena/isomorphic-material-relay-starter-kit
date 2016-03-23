import React from 'react';
import styles from './AboutContent.less';
import H1Header from '../../../components/Common/H1Header/H1Header.js';

class AboutContent extends React.Component {

    render() {
        return (
            <div>
                <H1Header>
                    Why Re/Max 1st Class Realty is worth to work with:
                </H1Header>
                <hr/>
                <article className={styles.content}>
                    <p>
                        Re/Max 1st Class Realty offers one stop service for home selling or purchase. We have long term
                        partnerships with major banks and can negotiate the best possible deal. We can help you find the
                        right specialist to get the lowest mortgage rate and move you to your new home as fast as
                        possible. Our clients always have all papers signed on time with all details covered.
                    </p>

                    <p>
                        Re/Max 1st Class Realty has no hidden fees and as a Remax Representative is very flexible in
                        commissions. We always prioritize the client interest and trying to find the best possible deal
                        for our client. Our main mission is client satisfaction and long term partnership.
                    </p>

                    <p>
                        Re/Max 1st Class offers comprehensive service in real estate - we can help you avoid foreclosure
                        without any influence on your credit score.
                    </p>

                    <p>
                        We also can sell your residential property in the shortest time as we have a wide network of
                        real estate partnerships in the area. We have a great experience in pre-sell preparation when
                        small investments could bring the highest return.
                    </p>

                    <p>
                        We always have the best options for investment opportunities in the area.
                    </p>

                    <p>
                        In 2014 we sold more than 100 residential properties for middle-class families and 40 of them
                        directly from banks.
                    </p>
                </article>
            </div>
        );
    }
}
export default  AboutContent;
