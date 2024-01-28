import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from "../../services/userService"
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';
class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerifty: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            // truyen  len  server  de xac  thuc 
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerifty: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerifty: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })

            }
        }



        if (this.props.match && this.props.match.params && this.props.match.params.id) {

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }

    }

    render() {

        let { statusVerifty, errCode } = this.state;

        console.log('check stare', this.state);
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">


                    {statusVerifty === false ?
                        <div>
                            loading data...
                        </div>
                        :
                        <div>
                            {errCode === 0 ?
                                <div className="infor-booking">Xác nhận lịch hẹn thành công </div> :
                                <div className="infor-booking">Lịch hẹn không tồn tại hoặc đã được xác nhận </div>
                            }
                        </div>

                    }
                </div>

            </>


        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

