import React, {useState} from 'react'
import {StyleSheet, Text, View, Modal, Alert,KeyboardAvoidingView} from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmp = ({navigation,route}) => {
    
  const getDetails = (type) =>{
    if(route.params){
        switch(type){
            case "name":
                return  route.params.name
                case "phone":
                    return  route.params.phone
                case "email" :
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture" :
                    return route.params.picture
                case "position" :
                    return route.params.position            
        }
    }
    return ""
  } 

   
    const [Name,
        setName] = useState(getDetails("name"))
    const [phone,
        setPhone] = useState(getDetails('phone'))
    const [email,
        setEmail] = useState(getDetails('email'))
    const [salary,
        setSalary] = useState(getDetails('salary'))
    const [picture,
        setPicture] = useState(getDetails('picture'))
    const [position,
        setPosition] = useState(getDetails('position'))    
    const [modal,
        setModal] = useState(false)
    const [enableShit, setenableShit] = useState(false)    

    const submitData = () => {
       fetch("http://d153e8b565c7.ngrok.io/send-data",{
           method:"post",
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify({
               name:Name,
               email,
               salary,
               phone,
               picture,
               position

           })
       })
       .then(res=>res.json(),
             Alert.alert('Saved successfuly'),
             navigation.navigate("Home") 
           )
        .catch(err=>{
        Alert.alert("Something went wrong")
    })
    }    
    const updateDetails = () =>{
        fetch("http://d153e8b565c7.ngrok.io/update",{
           method:"post",
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify({
               id:route.params._id,
               name:Name,
               email,
               salary,
               phone,
               picture,
               position

           })
       })
       .then(res=>res.json(),
             Alert.alert('Updated successfuly'),
             navigation.navigate("Home") 
           )
        .catch(err=>{
        Alert.alert("Something went wrong")
    })
}
  
    const pickFromGallery = async() => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [
                    1, 1
                ],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri:data.uri,
                    type: `test/${data
                        .uri
                        .split(".")[1]}`,
                    name: `test\${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        } else {
            Alert.alert("You need to give permission for image access")
        }
    }
    const pickFromCamer = async() => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [
                    1, 1
                ],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri:data.uri,
                    type: `test/${data
                        .uri
                        .split(".")[1]}`,
                    name: `test\${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        } else {
            Alert.alert("You need to give permission for image access")
        }
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeeAap')
        data.append('cloud_name', 'dfsfmgvqk')
        fetch("https://api.cloudinary.com/v1_1/dfsfmgvqk/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
        .then(data => {
            setPicture(data.url)
            setModal(false)
        })
    }

    return (
         <KeyboardAvoidingView behavior="position " style={styles.root} enabled={enableShit}>
            <View >
            <TextInput
                style={styles.input}
                theme={theme}
                label="Name"
                value={Name}
                onFocus = {()=>setenableShit(false)}
                mode="outlined"
                onChangeText={text => setName(text)}/>
            <TextInput
                style={styles.input}
                theme={theme}
                label="Email"
                value={email}
                onFocus = {()=>setenableShit(false)}
                mode="outlined"
                onChangeText={text => setEmail(text)}/>
            <TextInput
                style={styles.input}
                theme={theme}
                label="Phone"
                onFocus = {()=>setenableShit(false)}
                keyboardType="number-pad"
                value={phone}
                mode="outlined"
                onChangeText={text => setPhone(text)}/>
            <TextInput
                style={styles.input}
                theme={theme}
                label="Salary"
                onFocus = {()=>setenableShit(true)}
                value={salary}
                mode="outlined"
                onChangeText={text => setSalary(text)}/>
                <TextInput
                style={styles.input}
                theme={theme}
                onFocus = {()=>setenableShit(true)}
                label="Position"
                value={position}
                mode="outlined"
                onChangeText={text => setPosition(text)}/>
            <Button
                icon={picture ===" "?"upload":"check"}
                theme={theme}
                style={styles.input}
                mode="contained"
                onPress={() => setModal(true)}>
                Upload Image
            </Button>
            {route.params?
             <Button
             icon="content-save"
             theme={theme}
             style={styles.input}
             mode="contained"
             onPress={() => updateDetails()}>
             Update
         </Button>
         :
         <Button
                icon="content-save"
                theme={theme}
                style={styles.input}
                mode="contained"
                onPress={() => submitData()}>
                Save
            </Button>

            }
            

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                setModal(false)
            }}>
                <View style={styles.modalv}>
                    <View style={styles.modalbut}>
                        <Button
                            icon="camera"
                            theme={theme}
                            mode="contained"
                            onPress={() => pickFromCamer()}>
                            Camera
                        </Button>
                        <Button
                            icon="image-area"
                            theme={theme}
                            mode="contained"
                            onPress={() => pickFromGallery()}>
                            Gallery
                        </Button>
                    </View>

                    <Button onPress={() => setModal(false)}>
                        cancel
                    </Button>

                </View>
            </Modal>
        </View>
             </KeyboardAvoidingView>

    )
}

export default CreateEmp

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    input: {
        margin: 5
    },
    modalbut: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    modalv: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white"
    }
})
