import React, {Component} from 'react'
import {Text, View, StyleSheet, Image, FlatList} from 'react-native'
import {Card, FAB} from 'react-native-paper'

const Home = (props) => {

    const data = [
        {
            id: "1",
            name: "ramu",
            email:"abc@abc.com",
            salary:"10 lpa",
            phone:"12365",
            picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=521&q=80",
            position: "web dev",
        }, {
            id: "2",
            name: "shyam",
            email:"absdfdc@absdfc.com",
            salary:"15 lpa",
            phone:"123555",
            picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=521&q=80",
            position: "mob dev"
        }, {
            id: "3",
            name: "babu rao",
            email:"abcccsc@abcscsc.com",
            salary:"20 lpa",
            phone:"123644445",
            picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=521&q=80",
            position: "network sec"
        }, {
            id: "4",
            name: "ghamshyam",
            email:"accbc@abccc.com",
            salary:"5 lpa",
            phone:"123ff65",
            picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=521&q=80",
            position: "marketing"
        }
    ]

    const renderlist = ((item) => {
        return (
            <Card style={styles.mycard} key={item.id}
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
                        {{uri:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=521&q=80"}}
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
                data={data}
                renderItem={({item}) => {
                return renderlist(item)
            }}
                keyExtractor={(item => `${item.id}`)}/>
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