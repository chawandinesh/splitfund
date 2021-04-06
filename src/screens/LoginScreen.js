import React, {useEffect, useState, useContext, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TextInput,
} from 'react-native';
import {Root, Toast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SplitFundContext} from '../context/context';
const {height, width} = Dimensions.get('window');
export default function LoginScreen(props) {
  const {state, setState} = useContext(SplitFundContext);
  const [signInState, setSignInState] = useState({
    emailId: '',
    password: '',
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerShown: false,
    });
  }, [props.navigation]);

  const handleLogin = () => {
    // console.log(signInState, 'signin state');
    if (state.registeredUsers.find(e => e.emailId === signInState.emailId)) {
      if (
        state.registeredUsers.find(
          e =>
            e.emailId === signInState.emailId &&
            e.password === signInState.password,
        )
      ) {
        console.log('matched');
        Toast.show({
          text: 'Successfully signed in',
          buttonText: 'Okay',
          position: 'bottom',
          type: 'success',
        });

        props.navigation.navigate('profile');
      } else {
        console.log('not matched');
        Toast.show({
          text: 'Wrong password',
          buttonText: 'Okay',
          position: 'bottom',
          type: 'danger',
        });
      }
    } else {
      Toast.show({
        text: 'User not found',
        buttonText: 'Okay',
        position: 'bottom',
        type: 'danger',
      });
    }
  };
  return (
    <Root>
      <KeyboardAwareScrollView>
        <ImageBackground
          source={require('../assets/bg1.jpg')}
          style={{width: width, height: height}}>
          <View style={{width, height}}>
            <View
              style={{
                height: height * 0.2,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}></View>
            <View
              style={{
                height: height * 0.35,
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
            </View>
            <View
              style={{
                height: height * 0.2,
                justifyContent: 'space-around',
                width: width,
              }}>
              <TouchableOpacity
                onPress={() => handleLogin()}
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
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Signup')}
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
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </Root>
  );
}
