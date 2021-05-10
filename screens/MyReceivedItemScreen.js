import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class MyReceivedItemScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      receivedItemList : []
    }
  this.requestRef= null
  }

  getReceivedItemList =()=>{
    this.requestRef = db.collection("requested_items")
    .where('user_id','==',this.state.userId)
    .where("item_status", '==','received')
    .onSnapshot((snapshot)=>{
      var receiveItemList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        receivedItemList : receivedItemList
      });
    })
  }

  componentDidMount(){
    this.getReceivedItemList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    console.log(item.book_name);
    return (
      
        <ListItem key={i} bottomDivider>
        <List.Icon color={Colors.orange500}  icon="book" />
        <ListItem.Content>
        
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {item.item_name}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "green" }}>
            {item.ItemStatus}
          </ListItem.Subtitle>
                    
        </ListItem.Content>
      </ListItem>
      
      
      
      
      
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Received Items" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.receivedItemList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Received Items</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.receivedItemList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})