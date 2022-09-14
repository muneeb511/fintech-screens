import React, { Component } from 'react'
import { Text, View ,Image,StyleSheet} from 'react-native'

const Imagelogo =({ImageUrl})=> {
  
    return (
      <View>
       <Image style={style.image} source={require('../../assets/Frame.png')}/>
      </View>
    )
  
}
const style=StyleSheet.create({
    image:{
        position:"absolute",
        left:110,
        top:110,
      width:188,
      height:135
    }
})
export default Imagelogo
