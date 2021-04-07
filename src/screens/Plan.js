import React, {useLayoutEffect} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function Plan(props) {
  const {data} = props.route.params;
  console.log(data);
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
    <View style={{height: width}}>
      <View style={{height: height * 0.4, width: width}}>
        {data.image ? (
          <Image
            source={{uri: data.image}}
            style={{height: height * 0.4, width: width}}
          />
        ) : null}
      </View>
      <View
        style={{
          height: height * 0.5,
          width: width,
          backgroundColor: 'rgba(0,0,0, 0.3)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <View
            style={{
              height: height * 0.2,
              width: width * 0.8,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 3,
            }}>
            <Text
              style={{
                padding: 5,
                width: width * 0.7,
                textAlign: 'center',
                borderRadius: 10,
                backgroundColor: '#ffa',
                fontWeight: 'bold',
                fontSize: height * 0.03,
              }}>
              {data.groupTitle}
            </Text>

            <Text style={{fontSize: height * 0.022, padding: 2, fontWeight:'bold'}}>USD {data.fund}</Text>
            <Text style={{fontSize: height * 0.02, padding: 5}}>{data.date}</Text>
            <Text>{data.notes}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
