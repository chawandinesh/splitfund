import React, {useEffect, useLayoutEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import moment from 'moment';
import {Button, Icon, Textarea, Thumbnail} from 'native-base';
import {SplitFundContext} from '../context/context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
export default function CreatePlan(props) {
  const {state, setState} = React.useContext(SplitFundContext);
  console.log(state, 'state');
  const indexOfUser = state.registeredUsers.findIndex(
    e => e.emailId === state.loginUser.emailId,
  );
  console.log(indexOfUser);
  const [groupState, setGroupState] = useState({
    selected: [state.loginUser.emailId],
    image: '',
    groupTitle: '',
    notes: '',
    fund:0,
    date: moment(new Date()).format('DD-MM-YYYY'),
    id: Date.now()
  });
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      // headerLeft: null,
    });
  }, [props.navigation]);
  // console.log(groupState);

  const renderItem = ({item, index}) => {
    // console.log(item.emailId)
    return (
      <TouchableOpacity
        onPress={() => {
          if (groupState.selected.includes(item.emailId)) {
            setGroupState({
              ...groupState,
              selected: groupState.selected.filter(e => e !== item.emailId),
            });
          } else {
            setGroupState({
              ...groupState,
              selected: [...groupState.selected, item.emailId],
            });
          }
        }}
        style={{
          height: height * 0.1,
          width: width * 0.21,
          borderRadius: height * 0.045,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          borderWidth: 3,
          backgroundColor: groupState.selected.includes(item.emailId)
            ? '#fff'
            : '#aaa',
        }}>
        {item.image ? (
          <Image source={{uri: item.image}} />
        ) : (
          <View
            style={{
              height: height * 0.03,
              width: height * 0.03,
              borderRadius: height * 0.02,
              backgroundColor: '#766',
            }}></View>
        )}
        <Text style={{fontWeight: 'bold', fontSize: height * 0.02}}>
          {item.name}
        </Text>
        <Text style={{fontSize: height * 0.01}}>{item.emailId}</Text>
      </TouchableOpacity>
    );
  };

  const getIndex = () => {
    return state.registeredUsers.findIndex(
      e => e.emailId === state.loginUser.emailId,
    );
  };
  const handleSubmit = () => {
    state.registeredUsers[getIndex()].plans.push(groupState);
    props.navigation.goBack()
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setGroupState({
          ...groupState,
          image: image.path,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        style={{height: height * 0.9, width}}
        blurRadius={0.5}
        source={require('../assets/bg2.jpeg')}>
        <View
          style={{
            height: height * 0.9,
            width,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              height: height * 0.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => pickImage()}
              style={{
                height: height * 0.16,
                width: height * 0.16,
                borderRadius: height * 0.1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {groupState.image ? (
                <Image
                  source={{uri: groupState.image}}
                  style={{
                    height: height * 0.15,
                    width: height * 0.15,
                    borderRadius: height * 0.09,
                  }}
                />
              ) : (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Icon type="FontAwesome" name="file-picture-o" />
                  <Text>select image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: height * 0.04, color: '#fa0'}}>
              {state.registeredUsers[indexOfUser].wallet} USD
            </Text>
          </View>
          <View style={{height: height * 0.08, alignSelf: 'center'}}>
            <View
              style={{
                width: width * 0.9,
                backgroundColor: '#fff',
                borderRadius: height * 0.02,
              }}>
              <TextInput
                placeholder="Title"
                onChangeText={text =>
                  setGroupState({...groupState, groupTitle: text})
                }
              />
            </View>
          </View>
          <View
            style={{
              width: width,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: height * 0.03, color: '#fff'}}>
              Select Persons {groupState.selected.length}
            </Text>
          </View>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.9,
              alignSelf: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <FlatList
              horizontal
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              showsHorizontalScrollIndicator={false}
              data={state.registeredUsers.filter(
                e => e.emailId !== state.loginUser.emailId,
              )}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{height: height * 0.08, alignSelf: 'center'}}>
            <View
              style={{
                width: width * 0.9,
                backgroundColor: '#fff',
                borderRadius: height * 0.02,
              }}>
              <TextInput
                placeholder="Expected Fund"
                keyboardType="numeric"
                onChangeText={text =>
                  setGroupState({...groupState, fund: parseInt(text)})
                }
              />
            </View>
          </View>
          <View>
            <Textarea
              rowSpan={5}
              value={groupState.notes}
              onChangeText={text => setGroupState({...groupState, notes: text})}
              bordered
              placeholder="notes"
              style={{
                width: width * 0.9,
                alignSelf: 'center',
                backgroundColor: '#fff',
                borderRadius: height * 0.05,
              }}
            />
          </View>
          <View
            style={{
              height: height * 0.1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                height: height * 0.05,
                alignItems: 'center',
                justifyContent: 'center',
                width: width * 0.5,
                backgroundColor: '#ffa',
                borderRadius: height * 0.01,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#228',
                  fontSize: height * 0.023,
                }}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
