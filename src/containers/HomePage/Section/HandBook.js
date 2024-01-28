import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';


class HandBook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        return (
            <div className=" section-share section-HandBook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm nang</span>
                        <button className="btn-section">xem thêm </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customise">
                                <div className="bg-image section-HandBook" />
                                <div>cơ xương khớp 1</div>
                            </div>
                            <div className="section-customise">
                                <div className="bg-image section-HandBook" />
                                <div>cơ xương khớp 2</div>
                            </div>
                            <div className="section-customise">
                                <div className="bg-image section-HandBook" />
                                <div>cơ xương khớp 3</div>
                            </div>
                            <div className="section-customise">
                                <div className="bg-image section-HandBook" />
                                <div>cơ xương khớp 4</div>
                            </div>
                            <div className="section-customise">
                                <div className="bg-image section-HandBook" />
                                <div>cơ xương khớp 5</div>
                            </div>
                            <div className="section-customise">
                                <div className="bg-image section-HandBook" />
                                <div>cơ xương khớp 6</div>
                            </div>

                        </Slider>
                    </div>

                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
