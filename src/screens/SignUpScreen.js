import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import {SplitFundContext} from '../context/context';
import {Icon, Root, Toast, Button} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
const gmailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function LoginScreen(props) {
  const {state, setState} = useContext(SplitFundContext);
  console.log(state);
  const [signInState, setSignInState] = useState({
    name: '',
    emailId: '',
    password: '',
    image: '',
    confirmPassword: '',
  });
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
    });
  }, [props.navigation]);
  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSignInState({
          ...signInState,
          image: image.path,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    if (
      !signInState.name ||
      !signInState.emailId ||
      !signInState.password ||
      !signInState.confirmPassword
    ) {
      Toast.show({
        text: 'Please fill all details',
        buttonText: 'Okay',
        position: 'bottom',
        type: 'danger',
      });
    } else if (signInState.password !== signInState.confirmPassword) {
      Toast.show({
        text: "Passwords doesn't matched!",
        buttonText: 'Okay',
        position: 'bottom',
        type: 'warning',
      });
    } else if (
      state.registeredUsers.length &&
      state.registeredUsers.find(e => e.emailId === signInState.emailId)
    ) {
      Toast.show({
        text: 'Email already exists',
        buttonText: 'Okay',
        position: 'bottom',
        type: 'danger',
      });
    } else if (!gmailValidation.test(signInState.emailId)) {
      Toast.show({
        text: 'Not a valid email',
        buttonText: 'Okay',
        position: 'bottom',
        type: 'danger',
      });
    } else {
      setState({
        ...state,
        registeredUsers: [
          ...state.registeredUsers,
          {
            ...signInState,
            id: Date.now(),
            createdAt: moment(new Date()).format('DD-MM-YYYY HH:mm:ss'),
          },
        ],
        loginUser: {
          name: signInState.name,
          emailId: signInState.emailId,
          image: signInState.image,
        },
      });
      Toast.show({
        text: 'Successfully Registered',
        buttonText: 'Okay',
        position: 'bottom',
        type: 'success',
      });
    }
  };
  return (
    <Root>
      <KeyboardAwareScrollView>
        <ImageBackground
          source={require('../assets/bg1.jpg')}
          style={{width: width, height: height * 0.9}}>
          <View style={{width, height: height * 0.9}}>
            <View
              style={{
                height: height * 0.15,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => pickImage()}
                style={{
                  height: height * 0.1,
                  width: height * 0.1,
                  borderRadius: 12,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {signInState.image ? (
                  <Image
                    source={{uri: signInState.image}}
                    style={{
                      height: height * 0.1,
                      width: height * 0.1,
                      borderRadius: 12,
                    }}
                  />
                ) : (
                  <Icon type="Entypo" name="image" style={{fontSize: 50}} />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: height * 0.5,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: width * 0.7,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  borderWidth: 4,
                }}>
                <View style={{width: width * 0.67, backgroundColor: '#000'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: height * 0.023,
                      color: '#fff',
                    }}>
                    Name
                  </Text>
                </View>
                <TextInput
                  onChangeText={text =>
                    setSignInState({
                      ...signInState,
                      name: text,
                    })
                  }
                />
              </View>
              <View
                style={{
                  width: width * 0.7,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  borderWidth: 4,
                }}>
                <View style={{width: width * 0.67, backgroundColor: '#000'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: height * 0.023,
                      color: '#fff',
                    }}>
                    Email
                  </Text>
                </View>
                <TextInput
                  onChangeText={text =>
                    setSignInState({
                      ...signInState,
                      emailId: text,
                    })
                  }
                />
              </View>
              <View
                style={{
                  width: width * 0.7,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  borderWidth: 4,
                }}>
                <View style={{width: width * 0.67, backgroundColor: '#000'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: height * 0.023,
                      color: '#fff',
                    }}>
                    Password
                  </Text>
                </View>
                <TextInput
                  onChangeText={text =>
                    setSignInState({
                      ...signInState,
                      password: text,
                    })
                  }
                />
              </View>
              <View
                style={{
                  width: width * 0.7,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  borderWidth: 4,
                }}>
                <View style={{width: width * 0.67, backgroundColor: '#000'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: height * 0.023,
                      color: '#fff',
                    }}>
                    Confirm Password
                  </Text>
                </View>
                <TextInput
                  onChangeText={text =>
                    setSignInState({
                      ...signInState,
                      confirmPassword: text,
                    })
                  }
                />
              </View>
            </View>
            <View
              style={{
                height: height * 0.2,
                justifyContent: 'space-around',
                width: width,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // props.navigation.navigate('MainRoutes')
                  handleSubmit();
                }}
                style={{
                  backgroundColor: '#012',
                  height: height * 0.05,
                  width: width * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: height * 0.024,
                    color: '#fff',
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}
                style={{
                  backgroundColor: '#012',
                  height: height * 0.05,
                  width: width * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: height * 0.024,
                    color: '#fff',
                  }}>
                  Back to Signin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </Root>
  );
}
