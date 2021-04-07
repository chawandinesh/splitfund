import React, {useEffect, useLayoutEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {useIsFocused} from '@react-navigation/native';

import {Icon} from 'native-base';
import {SplitFundContext} from '../context/context';
import moment from 'moment';
const {height, width} = Dimensions.get('window');
export default function Profile(props) {
  const isFocused = useIsFocused();
  const {state, setState} = useContext(SplitFundContext);
  const [walletText, setWalletText] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const getInitialData = async () => {};

  const filterAllPlans = () => {
    const allPlans = []
    state.registeredUsers.map((e) => {
      allPlans.push(e.plans)
      console.log(e.plans)
    })
    return allPlans
  }
  // console.log(filterAllPlans().flat().filter((e) => e.selected.includes(state.loginUser.emailId)), "allPlans")

  React.useEffect(() => {
    getInitialData();
  }, [props.navigation, isFocused]);


  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#888',
      },
      headerRight: () => {
        return (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Menu
              ref={menu}
              button={
                <Icon
                  name="more-vertical"
                  style={{color: '#fff'}}
                  type="Feather"
                  onPress={() => showMenu()}
                />
              }>
              {/* <MenuItem
                onPress={() => {
                  props.navigation.navigate('profile');
                }}>
                Profile
              </MenuItem> */}
              <MenuItem
                onPress={() => {
                  props.navigation.navigate('CreatePlan');
                  hideMenu();
                }}>
                Create Plan
              </MenuItem>
              <MenuDivider />
              {/* <MenuItem
                onPress={() => {
                  hideMenu();
                  setState({
                    ...state,
                    plans: state.plans,
                    loginUser: {},
                  });
                  props.navigation.navigate('Login');
                }}>
                Logout
              </MenuItem> */}
            </Menu>
          </View>
        );
        // return <Icon name="more-vertical" type="Feather" onPress={() => showMenu()} />
      },
    });
  }, [props.navigation]);
  const menu = React.useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  const getProfileInfo = () => {
    return state.registeredUsers.filter(
      e => e.emailId === state.loginUser.emailId,
    );
  };
  const getIndex = () => {
    return state.registeredUsers.findIndex(
      e => e.emailId === state.loginUser.emailId,
    );
  };

  useEffect(() => {
    console.log(getProfileInfo(), getIndex());
    filterAllPlans()
  }, []);
  return (
    <ImageBackground
      blurRadius={1}
      source={require('../assets/bg4.jpg')}
      style={{height, width}}>
      <View
        style={{
          height: height * 0.2,
          alignItems: 'center',
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
              style={{
                height: height * 0.135,
                width: height * 0.135,
                borderRadius: height * 0.07,
              }}
            />
          ) : (
            <Icon name="user" type="FontAwesome" />
          )}
        </View>
        {/* <View style={{height: height * 0.15, justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: height * 0.03}}>
            {state.loginUser.name}
          </Text>
          <Text>{state.loginUser.emailId}</Text>
        </View> */}
      </View>
      <View style={{height: height * 0.8, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            height: height * 0.1,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <View></View>
          <View>
            <Text
              style={{
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: '#ffa',
              }}>
              Wallet : ${state.loginUser.emailId && getProfileInfo()[0].wallet} USD
            </Text>
          </View>
          <View>
            <Icon
              name="plus"
              type="Entypo"
              style={{color: '#fff'}}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        <Text
          style={{
            padding: height * 0.01,
            color: '#198',
            backgroundColor: '#ff7',
            borderRadius: height * 0.02,
            marginBottom: 3,
            width: width * 0.2,
            fontSize: height * 0.023,
            fontWeight: 'bold',
          }}>
          Plans :
        </Text>
        <View style={{height: height * 0.1}}>
          <FlatList
            data={filterAllPlans().flat().filter((e) => e.selected.includes(state.loginUser.emailId))}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("plan", {data:item})}
                  style={{
                    // padding: 10,
                    backgroundColor: '#fff',
                    marginRight: 5,
                    height: height * 0.08,
                    width: height * 0.08,
                    borderRadius: height * 0.04,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={ item.image ? {uri: item.image} : null}
                    style={{
                      width: height * 0.075,
                      height: height * 0.075,
                      borderRadius: height * 0.04,
                    }}
                  />
                </TouchableOpacity>
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
          <View
            style={{
              height: height * 0.05,
              backgroundColor: '#888',
              alignItems: 'center',
              borderBottomWidth: 2,
              justifyContent: 'space-around',
              flexDirection: 'row',
              // borderBottomRightRadius: 100,
            }}>
            <View>
              <Text style={{fontSize: height * 0.023}}>Date</Text>
            </View>
            <View>
              <Text style={{fontSize: height * 0.023}}>type</Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: height * 0.023,
                }}>
                wallet
              </Text>
              {/* <Icon name="user" type="AntDesign" /> */}
            </View>
          </View>
          <FlatList
            data={state.loginUser.emailId && state.registeredUsers[getIndex()].transactions}
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
                    <Text style={{fontSize: height * 0.02}}>{item.date}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: height * 0.02}}>{item.type}</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                        fontSize: height * 0.02,
                      }}>
                      {item.text}
                    </Text>
                    {/* <Icon name="user" type="AntDesign" /> */}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add wallet!</Text>
              <View stylw={{width: width * 0.5}}>
                <TextInput
                  style={{borderBottomWidth: 1}}
                  keyboardType="numeric"
                  onChangeText={e => setWalletText(e)}
                />
              </View>
              <Pressable
                style={[
                  {...styles.button, ...styles.buttonClose, marginTop: 10},
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  state.registeredUsers[getIndex()].wallet += parseInt(
                    walletText,
                  );
                  state.registeredUsers[getIndex()].transactions.push({
                    type: 'added to wallet',
                    date: moment(new Date()).format('DD-MM-YYYY'),
                    text: parseInt(walletText),
                  });
                  setState(state);
                }}>
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
              <Pressable
                style={[
                  {...styles.button, ...styles.buttonClose, marginTop: 10},
                ]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
