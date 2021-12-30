import axiosClient from "./axiosClient";

const signupAPI = {
  checkPhone(phoneNumber) {
    const url = "/auth/checkPhone";
    return axiosClient.post(url, phoneNumber);
  },
  checkPhoneAlready(phoneNumber) {
    const url = "/auth/checkPhoneAlready";
    return axiosClient.post(url, phoneNumber);
  },
  signUp(data) {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },
  sendOTP(phoneNumber) {
    const url = "/auth/sendOtp";
    return axiosClient.post(url, phoneNumber);
  },
  verifyOTPSignUp(phoneNumber, code) {
    const url = "/auth/verifyOTPSignUp";
    return axiosClient.post(url, phoneNumber,code);
  },
  forgotPassword(phoneNumber) {
    const url = "/auth/forgotPassword";
    return axiosClient.post(url, phoneNumber);
  },
};

export default signupAPI;
