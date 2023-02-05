import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapView , { Marker , Circle}  from 'react-native-maps'


const CMap = ({route}) => {
      
      const [mapRegion , setMapRegoin] = useState({
        latitude: route?.params?.let, longitude: route?.params?.log ,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

      })
   
  return (
    <View style={styles.container}>
    
      <MapView style={styles.map} region={mapRegion}>
      <Marker coordinate={mapRegion} title="I am here" draggable={true}  />
  
      
      </MapView>
      
    </View>
  )
}

export default CMap

const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      map: {
        width: '100%',
        height: '100%',
      },
    });