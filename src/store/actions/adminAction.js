import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUsers, getAllUsers, deleteUserService,
    editUserService, getTopDoctorHomeService, getAllDoctors,
    saveDetailDoctorService, getAllSpecialty, getAllClinic
} from "../../services/userService"
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {

            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e);
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})
// start doing end 

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {

            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed error', e);

        }
    }

}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {

            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed  error', e);
        }
    }

}


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUsers(data);
            console.log('hoi dan it check redux', res)
            if (res && res.errCode === 0) {
                toast.success("Create a new user success");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed  error', e);
        }
    }
}


export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("ALL");

            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSucess(res.users.reverse()));
            } else {
                toast.error("delete  user error");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("delete  user error");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed  error', e);
        }
    }

}
export const fetchAllUsersSucess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("delete  user success!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("delete  user error!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log('saveUserFailed  error', e);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update  user success!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Update the user error!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(editUserFailed());
            console.log('EditUserFailed  error', e);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})
// let res1 = await getTopDoctorHomeService(3)

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILDED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILDED
            })

        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })

            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
                })
            }

        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILDED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILDED
            })

        }
    }
}

export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {

                toast.success("Save Infor Detail Doctor  success!");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

                })

            } else {
                toast.error("Save Infor Detail Doctor error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
                })
            }

        } catch (e) {
            toast.error("Save Infor Detail Doctor  error!");

            console.log('SAVE_DETAIL_DOCTOR_FAILDED: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
            })

        }
    }
}


export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })

            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED,
                })
            }

        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILDED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
            })

        }
    }
}


export const getRequireDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
            ) {

                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequireDoctorInforSuccess(data));

            } else {
                dispatch(fetchRequireDoctorInforFailed());
            }
        } catch (e) {

            dispatch(fetchRequireDoctorInforFailed());
            console.log('fetchRequireDoctorInfor error', e);
        }
    }

}

export const fetchRequireDoctorInforSuccess = (allRequireData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequireData

})

export const fetchRequireDoctorInforFailed = () => ({

    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED



})