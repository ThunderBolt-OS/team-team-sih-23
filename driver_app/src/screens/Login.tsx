import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useAppContext} from '../lib/Context';
import SafeArea from '../components/SafeArea';
import FormInput from '../components/FormInput';
import {Formik} from 'formik';
import CustButton from '../components/CustButton';
import Navbar from '../components/Navbar';
import * as yup from 'yup';
import OtpInputs from 'react-native-otp-inputs';
import {requestOTP_Api} from '../lib/api/Functions';

const Login = () => {
  const context = useAppContext();
  const loginValidationSchema = yup.object().shape({
    phone: yup.string().required('Your username is Required'),
  });
  const [IsOTPvisible, setIsOTPvisible] = useState(false);
  return (
    <SafeArea>
      <>
        <Navbar title="Login Screen" />
        <Formik
          initialValues={{
            phone: '',
            otp: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={async values => {
            // context?.login(values.username, values.password);
            if (values.otp == '') {
              const res = await requestOTP_Api(values.phone);
              setIsOTPvisible(res);
            } else if (values.otp && values.otp.length == 4) {
              context?.verifyOTP(values.phone, values.otp);
            }
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={{marginTop: 35, flex: 1}}>
              <FormInput
                textProps={{
                  placeholder: 'Your phone',
                  value: values.phone,
                  onChangeText: handleChange('phone'),
                  placeholderTextColor: 'grey',
                  autoCapitalize: 'none',
                }}
              />
              {errors.phone && (
                <Text style={{fontSize: 10, color: 'red', fontFamily: 'c'}}>
                  {errors.phone}
                </Text>
              )}

              {IsOTPvisible && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <OtpInputs
                    clearTextOnFocus
                    handleChange={val => {
                      handleChange('otp')(val);
                    }}
                    keyboardType="phone-pad"
                    numberOfInputs={4}
                    // ref={otpRef}
                    autofillFromClipboard
                    inputContainerStyles={{
                      padding: 3,
                      borderColor: 'white',
                      borderWidth: 1,
                      marginHorizontal: 1,
                      flex: 0.22,
                      position: 'relative',
                    }}
                    inputStyles={{color: 'white'}}
                  />

                  {errors.otp && (
                    <Text style={{fontSize: 10, color: 'red', fontFamily: 'c'}}>
                      {errors.otp}
                    </Text>
                  )}
                </View>
              )}

              <CustButton
                onButtonPress={handleSubmit}
                text={IsOTPvisible ? 'Submit' : 'GET OTP'}
                container_style={{alignSelf: 'center'}}
              />
            </View>
          )}
        </Formik>
      </>
    </SafeArea>
  );
};

export default Login;

const styles = StyleSheet.create({});
