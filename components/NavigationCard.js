import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';

const NavigationCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
    <SafeAreaView style={tw`bg-white flex-1`}> 
      <Text style={tw`text-center py-5 text-xl`}>Hello! Welcome to Akshay's Uber</Text>
      <View style={tw `border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete 
            placeholder="Where to?"
            styles={toInoutBoxStyles}
            fetchDetails={true}
            returnKeyType={"search"}
            onPress={(data, details = null) => {
              dispatch(setDestination({
                location: details.geometry.location,
                description: data.description,
              }));
                navigation.navigate('RideOptionsCard');
              }}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            rednerScrollView={(props) => <ScrollView {...props}/>}

            />
        </View>
      </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default NavigationCard

const toInoutBoxStyles= StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})