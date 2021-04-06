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
import {Button, Icon,Textarea, Thumbnail} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
export default function CreatePlan(props) {
  const [groupState, setGroupState] = useState({
    selected: [],
    image: '',
    groupTitle: '',
  });
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerLeft: null
      
    });
  }, [props.navigation]);
  console.log(groupState);

  const renderItem = ({item, index}) => {
    console.log(index === groupState.selected, 'item...');
    return (
      <TouchableOpacity
        onPress={() => {
          if (groupState.selected.includes(index)) {
            setGroupState({
              ...groupState,
              selected: groupState.selected.filter(e => e !== index),
            });
          } else {
            setGroupState({
              ...groupState,
              selected: [...groupState.selected, index],
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
          backgroundColor: groupState.selected.includes(index)
            ? '#fff'
            : '#aaa',
        }}>
        <View
          style={{
            height: height * 0.03,
            width: height * 0.03,
            borderRadius: height * 0.02,
            backgroundColor: '#766',
          }}></View>
        <Text style={{fontWeight: 'bold', fontSize: height * 0.02}}>
          {item.name}
        </Text>
        <Text style={{fontSize: height * 0.01}}>{item.emailId}</Text>
      </TouchableOpacity>
    );
  };

  const userData = [
    {
      image: require('../assets/bg1.jpg'),
      name: 'rozi',
      emailId: 'rozi@gmail.com',
    },
    {
      image: require('../assets/bg2.jpeg'),
      name: 'siamk',
      emailId: 'siamk@gmail.com',
    },
    {
      image: require('../assets/bg3.jpeg'),
      name: 'johny',
      emailId: 'johny@gmail.com',
    },
    {
      image: require('../assets/bg4.jpg'),
      name: 'alexa',
      emailId: 'alexa@gmail.com',
    },
    {
      image: require('../assets/bg4.jpg'),
      name: 'alexa',
      emailId: 'alexa@gmail.com',
    },
    {
      image: require('../assets/bg4.jpg'),
      name: 'alexa',
      emailId: 'alexa@gmail.com',
    },
  ];
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
                <View style={{alignItems:'center', justifyContent:'center'}}>
                  <Icon type="FontAwesome" name="file-picture-o" />
                  <Text>select image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{height: height * 0.08, alignSelf: 'center'}}>
            <View
              style={{
                width: width * 0.9,
                backgroundColor: '#fff',
                borderRadius: height * 0.02,
              }}>
              <TextInput placeholder="Title" />
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
              data={userData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View>
          <Textarea rowSpan={5}  bordered placeholder="notes" style={{width: width * 0.9, alignSelf:'center', backgroundColor:'#fff', borderRadius: height * 0.05}} />
          </View>
          {/* <View
            style={{
              height: height * 0.1,
              backgroundColor: '#fff',
              borderRadius: height * 0.01,
              width: width * 0.9,
              alignSelf: 'center',
              marginTop: height * 0.02,
            }}>
            <View style={{width: width * 0.9, height: height * 0.05, backgroundColor:'#000'}}>
              <Text>Notes</Text>
            </View>
            <TextInput numberOfLines={4} multiline />
          </View> */}
          <View
            style={{
              height: height * 0.1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
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
