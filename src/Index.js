import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View, TextInput, ActivityIndicator, Alert} from 'react-native'
import React, { Component,useState, useCallback } from 'react'
import axios from 'axios';

export default function Index(){
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [forecast, setForecast] = useState(null)
  const api = {
    key: "15e3bc7d1e4e25d727ce19cc3932fa09",
    baseUrl: "https://api.openweathermap.org/data/2.5"
  }

  const fetchDataHandler = useCallback(()=>{
    setLoading(true)
    setInput("")
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api.key}`
    }).then(res =>{
      console.log(res.data)
      setData(res.data)
    })
    .catch(e => console.dir(e))
    .finally(()=> setLoading(false))
  }, [api.key, input]);
  
    return (
      <View>
        <View>
          <TextInput 
          placeholder='Enter city name...'
          onChangeText={text => setInput(text)}
          value={input}
          placeholderTextColor={'#000'}
          style={styles.input}
          onSubmitEditing={fetchDataHandler}
          ></TextInput>
        </View>
        {loading && (<View><ActivityIndicator size={'large'} color='#000' /></View>)}
        {data && (<View style={styles.infoView}> 
      <Text style={styles.countryAndCity}>{`${data?.name}, ${data?.sys?.country}`}</Text>
      <Text style={styles.dateInfo}>{new Date().toLocaleString()}</Text>
      <Text style={styles.tempText}>{`${Math.round(data?.main?.temp)} °C`}</Text>
      {/* <Text style={styles.weatherStatus}>{`${data?.weather[0]?.description}`}</Text> */}
      <Text style={styles.minTemp}>{`Min ${Math.round(data?.main?.temp_min)} °C / Max ${Math.round(data?.main?.temp_max)} °C`}</Text>
      </View>)}
      </View>
    )
}

const styles = StyleSheet.create({
  
  input: {
    padding: 15,
    borderWidth: 2,
    borderBottomWidth: 3,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    fontSize: 19,
    borderRadius:16,
    color: "#fff"
  },
  infoView:{
    alignItems: "center",
  },
  countryAndCity:{
    color: "#000",
    fontSize: 40,
    fontWeight: "bold",
  },
  dateInfo:{
    color: "#000",
    fontSize: 22,
    marginVertical: 10,
  },
  tempText: {
    color: '#fff',
    fontSize: 45,
    fontWeight: "500",
    marginVertical: 10,
  },
  weatherStatus:{
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
    marginVertical: 6,
  },
  minTemp:{
    color: "#000",
    fontSize: 22,
    fontWeight: "500",
  },
})