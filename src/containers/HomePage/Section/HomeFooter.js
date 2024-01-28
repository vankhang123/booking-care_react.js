import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        return (
            <div className="home-footer">
                <p>&copy; 2023 vankhang. <a href="#">more information,please visit my youtobe channel.
                    <a target="blank" href="https://www.youtube.com/watch?v=147SkAVXEqM&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI&index=62">&#8594; Click here &#8592; </a></a></p>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
