import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { languages } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService'
import { toast } from "react-toastify";
import _ from 'lodash';
import moment from 'moment';



class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',


        }
    }

    async componentDidMount() {

        this.props.getGenders()

    }
    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === languages.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }


    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });
    }

    buildTimeBooking = (dataTime) => {

        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === languages.VI ?

                moment.unix(+dataTime.date / 1000).format(' dddd - DD/MM/YYYY')

                : moment.unix(+dataTime.date / 1000).locale('en').format(' ddd - MM/DD/YYYY')
            return `${time} - ${date}`

        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === languages.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName} `
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName} `

            return name;

        }
        return ''
    }

    handleConfirmBooking = async () => {
        // validate input 
        // !data.email || !data.doctorId || !data.timeType || !data.date
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment error!')
        }
        console.log('check confirm', this.state)

    }

    render() {

        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }

        return (
            <Modal isOpen={isOpenModal}

                className={'booking-modal-container'}
                size="lg"
                centered
                backdrop={true}
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left" >
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span className="right"
                            onClick={closeBookingClose}><i className="fas fa-times"></i></span>
                    </div>

                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor">
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime} />
                        </div>

                        <div className="row">
                            <div className="form-group col-6">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullname" />
                                </label>
                                <input className="form-control"
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>

                            <div className="form-group col-6">
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                </label>
                                <input className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label> <FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className="form-control"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className="form-group col-6">
                                <label> <FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                />
                            </div>
                            <div className="form-group col-12">
                                <label> <FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                />

                            </div>
                            <div className="form-group col-6">
                                <label> <FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker
                                    onChange={this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}

                                />
                            </div>

                            <div className="form-group col-6">
                                <label> <FormattedMessage id="patient.booking-modal.genders" /></label>

                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-confirm"
                            onClick={() => this.handleConfirmBooking()}
                        > <FormattedMessage id="patient.booking-modal.btnConfirm" /></button>
                        <button className="btn-booking-cancel"
                            onClick={closeBookingClose}
                        ><FormattedMessage id="patient.booking-modal.btnCancel" /></button>
                    </div>
                </div>

            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

