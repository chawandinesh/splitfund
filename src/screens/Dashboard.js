import React, {useLayoutEffect, useRef} from 'react';
import {Icon} from 'native-base';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SplitFundContext} from '../context/context';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
const {height, width} = Dimensions.get('window');
export default function Dashboard(props) {
  const {state, setState} = React.useContext(SplitFundContext);
  console.log(state, 'state');
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerRight: () => {
        return (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Menu
              ref={menu}
              button={
                <Icon
                  name="more-vertical"
                  type="Feather"
                  onPress={() => showMenu()}
                />
              }>
              <MenuItem
                onPress={() => {
                  props.navigation.navigate('profile');
                }}>
                Profile
              </MenuItem>
              <MenuItem
                onPress={() => {
                  props.navigation.navigate('CreatePlan');
                  hideMenu();
                }}>
                Create Plan
              </MenuItem>
              <MenuDivider />
              <MenuItem onPress={hideMenu}>Logout</MenuItem>
            </Menu>
          </View>
        );
        // return <Icon name="more-vertical" type="Feather" onPress={() => showMenu()} />
      },
    });
  }, []);
  const menu = useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();
  const renderItem = ({item, index}) => {
    return (
      <ImageBackground
        source={{uri: item.image}}
        imageStyle={{
          borderRadius: height * 0.05,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        style={{
          height: height * 0.2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          flexDirection: 'row',
          borderRadius: height * 0.05,
          marginBottom: 10,
          width: width * 0.9,
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: width * 0.9,
            borderRadius: height * 0.05,
            height: height * 0.2,
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
          <View style={{width: width * 0.9, alignItems:'center', justifyContent:'center'}}>
            <Text
              style={{
                fontSize: height * 0.03,
                fontWeight: 'bold',
              }}>
              {item.groupTitle}
            </Text>
          </View>

          <Text style={{textAlign: 'center', fontSize: height * 0.03}}>
            {item.date}
          </Text>
        </View>
      </ImageBackground>
    );
  };
  return (
    <ImageBackground
      source={require('../assets/bg4.jpg')}
      style={{height: height * 0.9, width}}>
      <View
        style={{
          height: height * 0.9,
          width: width,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <FlatList
          data={state.plans}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
}
