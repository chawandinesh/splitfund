import React, {useEffect, useLayoutEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import {Icon} from 'native-base';
import {SplitFundContext} from '../context/context';
const {height, width} = Dimensions.get('window');
export default function Profile(props) {
  const {state, setState} = useContext(SplitFundContext);
  const renderItem = ({item, index}) => {
    // <View
    //   style={{
    //     backgroundColor: '#fff',
    //     height: height * 0.1,
    //     width: height * 0.1,
    //     borderRadius: 1,
    //     borderWidth: 2,
    //   }}>
    // <Text style={{backgroundColor:'#fff', padding: 12}}>{item}</Text>
    // <View style={{padding: 10, backgroundColor: '#fff', marginRight: 5}}>
    //   <Text>{item}</Text>
    // </View>
    // </View>;
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#888',
      },
    });
  }, [props.navigation]);
  return (
    <ImageBackground
      blurRadius={1}
      source={require('../assets/bg4.jpg')}
      style={{height, width}}>
      <View
        style={{
          height: height * 0.2,
          alignItems:'center',
          width: width,
          backgroundColor: 'rgba(233,233,233,0.5)',
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            height: height * 0.14,
            width: height * 0.14,
            borderRadius: height * 0.07,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {state.loginUser.image ? (
            <Image
              source={{uri: state.loginUser.image}}
              style={{height: height * 0.135, width: height * 0.135}}
            />
          ) : (
            <Icon name="user" type="FontAwesome" />
          )}
        </View>
        <View style={{height: height * 0.15, justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: height * 0.03}}>
            Alexa abc
          </Text>
          <Text>alexaabc@gmail.com</Text>
        </View>
      </View>
      <View style={{height: height * 0.8, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            height: height * 0.1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: height * 0.03,
              fontWeight: 'bold',
              color: '#ffa',
            }}>
            Wallet : $548 USD
          </Text>
        </View>
        <Text
          style={{
            padding: height * 0.01,
            color: '#198',
            backgroundColor:'#ff7',
            borderRadius: height * 0.02,
            marginBottom: 3,
            width: width * 0.2,
            fontSize: height * 0.023,
            fontWeight: 'bold',
          }}>
          Plans :
        </Text>
        {/* <View style={{flexDirection:'row', overflow: 'scroll', width: width}}>
          {[1,2,4,6,3,3,6,2,6,1,6,0,5].map((e,idx) => <View key={idx} style={{padding: 10, backgroundColor:'#fff', marginRight: 5}}><Text>{e}</Text></View> )}
        </View> */}
        <View style={{height: height * 0.1}}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 0, 12, 45, 345, 8, 34, 54]}
            // style={{backgroundColor:'#d67'}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    // padding: 10,
                    backgroundColor: '#fff',
                    marginRight: 5,
                    height: height * 0.08,
                    width: height * 0.08,
                    borderRadius: height * 0.04,
                    alignItems:'center',
                    justifyContent:'center'
                  }}>
                  {/* <Text>{item}</Text> */}
                  <Image
                    source={require('../assets/bg1.jpg')}
                    style={{width: height * 0.075, height: height * 0.075, borderRadius: height * 0.04}}
                  />
                </View>
              );
            }}
          />
        </View>
        <View style={{height: height * 0.5, backgroundColor: '#ddf'}}>
          <Text
            style={{
              fontSize: height * 0.03,
              fontWeight: 'bold',
              color: '#914',
              textDecorationLine: 'underline',
            }}>
            Transaction History
          </Text>
          <FlatList
            data={[1, 2, 4, 4,5,6,7,8,5, 6, 7]}
            style={{marginBottom: 55}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    height: height * 0.05,
                    borderBottomWidth: 2,
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    borderBottomRightRadius: 100,
                  }}>
                  <View>
                    <Text style={{fontSize: height * 0.023}}>
                      {item}sdklsjfljk
                    </Text>
                  </View>
                  <View>
                    <Text style={{color:'green', fontWeight:'bold', fontSize: height * 0.023}}>6565</Text>
                    {/* <Icon name="user" type="AntDesign" /> */}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
