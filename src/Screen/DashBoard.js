import React, { Component } from 'react';
import { View, Text,StyleSheet,ScrollView,ImageBackground,StatusBar,Button ,TextInput, TouchableOpacity, LayoutAnimation, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker'

export default class Signup extends Component {

    static navigationOptions={
        headerShown:false
    }
    constructor(props){
      super(props);
      this.state = {
        textInput : [],
        inputData : [],
      }
    }
    state = {
      user: {
        name: '',
        email: '',
        mobile:'',
        location:'',
        avatar: null
      },
      errorMessage: null
    };
    //function to add TextInput dynamically
    addTextInput = (index) => {
      let textInput = this.state.textInput;
      textInput.push(<TextInput style={styles.input}
        onChangeText={(text) => this.addValues(text, index)} />);
      this.setState({ textInput });
    }
    //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput,inputData });
  }

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool){
    this.setState({
      inputData: dataArray
    });
  }
  else {
    dataArray.push({'text':text,'index':index});
    this.setState({
      inputData: dataArray
    });
  }
  }

  //function to console the output
  getValues = () => {
    console.log('Data',this.state.inputData);
    

  }

  handlePickAvatar=async()=>{
     // UserPermissions.getPhotoPermissions()
      let result=await ImagePicker.launchImageLibraryAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          aspect:[4,3]
      })
      if(!result.cancelled){
          console.log(result.uri)
          this.setState({ user: { ...this.state.user, avatar: result.uri } });
      }
  }

                                                                                                                                                                                                                                                                                                                                                                                                                                            
  render() {
    LayoutAnimation.easeInEaseOut()

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <ImageBackground
          source={require('../../image/background.jpg')}
          style={{flex: 1,
            width: null,
            height: null,
            justifyContent:'center'}}>
        
        <TouchableOpacity style={styles.back} onPress={()=>this.props.navigation.navigate('Login')}>
            <Ionicons name='ios-arrow-round-back' size={32} color="#FFF"></Ionicons>
        </TouchableOpacity>
        <ScrollView>
      

       
     
      <View style={styles.form}>
        <View>
            <Text style={styles.inputTitle}>Full name</Text>
            <TextInput style={styles.input} autoCapitalize="none"
            onChangeText={name=> this.setState({ user: { ...this.state.user, name } })}
            value={this.state.name}></TextInput>
        </View>
        <View  style={{marginTop:16}}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput style={styles.input} autoCapitalize="none"
            onChangeText={email=>this.setState({ user: { ...this.state.user, email } })
        }
            value={this.state.email}></TextInput>
        </View>
        <View  style={{marginTop:16}}>
            <Text style={styles.inputTitle}>Address</Text>
            <TextInput style={styles.input} autoCapitalize="none"
            onChangeText={location=>this.setState({ user: { ...this.state.user, location } })
        }
            value={this.state.location}></TextInput>
        </View>

        <View style={{marginTop:16}}>
          <View style= {styles.row}>
              <View style={{margin: 10}}>
                <Button title='Add' onPress={() => this.addTextInput(this.state.textInput.length)} />
            </View>
            <View style={{margin: 10}}>
              <Button title='Remove' onPress={() => this.removeTextInput()} />
            </View>
          </View>
          {this.state.textInput.map((value) => {
            return value
          })}
          <Button title='Get Values' onPress={() => this.getValues()} />
        </View>

      </View>
      <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
          <Text style={{color:'#FFF',fontWeight:'500'}}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={{alignSelf:'center',marginTop:32}}
      onPress={()=>this.props.navigation.navigate('Login')}>

      </TouchableOpacity>
      </ScrollView>
      </ImageBackground>
      </ScrollView>
      
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
   
  },
  greeting:{
      marginTop:12,
      fontSize:16,
      fontWeight:'400',
      textAlign:'center',
      color:'#FFF'
  },
  errorMessage:{
      marginTop:6,
      alignItems:'center',
      justifyContent:'center',
      marginHorizontal:30
  },
  form:{
    marginTop:210,
    marginHorizontal:30
  },
  inputTitle:{
      color:'#8A89FE',
      fontSize:10,
      textTransform:'uppercase'
  },
  input:{
      borderBottomColor:'#8A8F9E',
      borderBottomWidth:StyleSheet.hairlineWidth,
      height:40,
      fontSize:15,
      color:"#FFF"
  },
  button:{
      marginHorizontal:30,
      backgroundColor:"#E9446A",
      borderRadius:4,
      height:52,
      alignItems:'center',
      justifyContent:'center',
      marginTop:16

  },
  error:{
      color:'#E9446A',
      fontSize:13,
      fontWeight:'600',
      textAlign:'center',
      marginTop:16

  },
  back:{
      position: 'absolute',
      top:16,
      left:16,
      width:32,
      height:32,
      borderRadius:16,
      backgroundColor:'rgba(21,22,48,0.1)',
      alignItems:'center',
      justifyContent:'center'
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e1e2e6',
    borderRadius: 50,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50
  }

})
