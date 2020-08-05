import React, {Component,useState,useEffect} from 'react'
import {Text, View, StyleSheet, Image, FlatList,ActivityIndicator, Alert} from 'react-native'
import {Card, FAB} from 'react-native-paper'

const Home = (props) => {

    const [Data, setData] = useState([])
    const [loading, setloading] = useState(true)
   
    const fetchdata = () => {
        fetch("http://d153e8b565c7.ngrok.io/")
          .then(res=>res.json())
          .then(results=>{
                 setData(results)
                 setloading(false)
          }).catch(err=>{
              Alert.alert("Something went wrong")
          })
    }



    useEffect(() => {
       fetchdata()
    }, [])

    const renderlist = ((item) => {
        return (
            <Card style={styles.mycard} key={item._id}
            onPress={()=>{
                props.navigation.navigate('Profile',{item})
            }}
            >
                <View style={styles.cardview}>

                    <Image
                        style={{
                        width: 60,
                        height: 60,
                        borderRadius: 60 / 2
                    }}
                        source=
                        {{uri:item.picture}}
                        resizeMode={'cover'}/>
                    <View style={styles.cardtext}>

                        <Text style={styles.text}>
                            {item.name}
                        </Text >
                        <Text style={styles.text}>
                            {item.position}
                        </Text>
                    </View>
                </View>
            </Card>

        )
    })

    return (
        <View style={{
            flex: 1
        }}>
            
             <FlatList
             data={Data}
             renderItem={({item}) => {
             return renderlist(item)
         }}
             
             keyExtractor={(item => `${item._id}`)}
             onRefresh = {()=>fetchdata()}
             refreshing={loading}
             />         
        
           
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{
                colors: {
                    accent: "#006aff"
                }
            }}
                onPress={() => props.navigation.navigate("Create")}/>
        </View>
    )

}

export default Home

const styles = StyleSheet.create({
    mycard: {
        margin: 5
    },
    cardview: {
        flexDirection: "row",
        padding: 6

    },
    text: {
        fontSize: 20,
        marginLeft: 20
    },
    cardtext: {
        marginLeft: 10
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }

})