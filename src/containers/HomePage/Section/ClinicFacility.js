import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ClinicFacility.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService'
import { withRouter } from 'react-router';

class ClinicFacility extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataClinics: []
        }

    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }

    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {

        let { dataClinics } = this.state;

        return (
            <div className=" section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở nổi bật</span>
                        <button className="btn-section">xem thêm </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                            {dataClinics && dataClinics.length > 0 &&

                                dataClinics.map((item, index) => {

                                    return (
                                        <div className="section-customise clinic-child "
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <div className="bg-image  section-medical-facility"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="clinic-name">{item.name}</div>
                                        </div>
                                    )

                                })

                            }




                        </Slider>
                    </div>

                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClinicFacility));