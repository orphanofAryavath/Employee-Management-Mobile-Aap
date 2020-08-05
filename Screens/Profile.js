import React from 'react'
import {StyleSheet, Text, View, Image, Linking, Platform, Alert} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';
import {Title, Card, Button} from 'react-native-paper';
import {MaterialIcons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
const Profile = (props) => {
   const {_id,name,picture,phone,salary,email,position} = props.route.params.item

   const deleteEmp = () => {
        fetch("http://d153e8b565c7.ngrok.io/delete",
             {
                method:"post",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id:_id
     
                })
             }).then(res=>res.json(),
                  Alert.alert("deleted successfully"),
                  props.navigation.navigate("Home")
                ).catch(err=>{
                    Alert.alert(err,"Something went wrong")
                })
        
   }

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={['#094491', '#4298e3']}
                style={{
                height: "20%"
            }}/>
            <View style={{
                alignItems: "center"
            }}>
                <Image
                    style={{
                    width: 140,
                    height: 140,
                    borderRadius: 70,
                    marginTop: -50
                }}
                    source={{
                    uri: picture
                }}/>

            </View>
            <View
                style={{
                alignItems: "center",
                margin: 15
            }}>

                <Title>{name}</Title>
                <Text style={{
                    fontSize: 15
                }}>{position}</Text>
            </View>
            <Card
                style={styles.mycard}
                onPress={() => {
                Linking.openURL("mailto:abc@abc.com")
            }}>
                <View style={styles.cardcon}>
                    <MaterialIcons name="email" size={24} color="#006aff"/>
        <Text style={styles.mytext}>{email}</Text>

                </View>
            </Card>
            <Card style={styles.mycard} onPress={()=>{
                if(Platform.OS === "android"){
                    Linking.openURL("tel:12345")
                }
                else{
                     Linking.openURL("telpromt:12345")   
                }
            }}>
                <View style={styles.cardcon}>
                    <Entypo name="phone" size={24} color="#006aff"/>
        <Text style={styles.mytext}>{phone}</Text>

                </View>
            </Card>
            <Card style={styles.mycard}>
                <View style={styles.cardcon}>
                    <MaterialIcons name="attach-money" size={24} color="#006aff"/>
        <Text style={styles.mytext}>{salary}</Text>

                </View>
            </Card>

            <View
                style={{
                flexDirection: 'row',
                justifyContent: "space-around",
                padding: 10
            }}>
                <Button
                    icon="account-edit"
                    mode="contained"
                    theme={theme}
                    onPress={() => {
                        props.navigation.navigate('Create',
                        {_id,name,picture,phone,salary,email,position} )           
                    }}>
                    Edit
                </Button>
                <Button
                    icon="delete"
                    mode="contained"
                    theme={theme}
                    onPress={() => deleteEmp()}>
                    Delete
                </Button>
            </View>
        </View>
    )
}
const theme = {
    colors: {
        primary: "#006aff"
    }
}
export default Profile

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    mycard: {
        margin: 3
    },
    cardcon: {
        flexDirection: "row",
        padding: 8
    },
    mytext: {
        fontSize: 18,
        marginLeft: 10
    }
})
