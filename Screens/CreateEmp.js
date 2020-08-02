import React, {useState} from 'react'
import {StyleSheet, Text, View, Modal, Alert} from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmp = () => {
    const [Name,
        setName] = useState("")
    const [phone,
        setPhone] = useState("")
    const [email,
        setEmail] = useState("")
    const [salary,
        setSalary] = useState("")
    const [picture,
        setPicture] = useState("")
    const [modal,
        setModal] = useState(false)

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
        <View style={styles.root}>

            <TextInput
                style={styles.input}
                theme={theme}
                label="Name"
                value={Name}
                mode="outlined"
                onChangeText={text => setName(text)}/>
            <TextInput
                style={styles.input}
                theme={theme}
                label="Email"
                value={email}
                mode="outlined"
                onChangeText={text => setEmail(text)}/>
            <TextInput
                style={styles.input}
                theme={theme}
                label="Phone"
                keyboardType="number-pad"
                value={Name}
                mode="outlined"
                onChangeText={text => setPhone(text)}/>
            <TextInput
                style={styles.input}
                theme={theme}
                label="Salary"
                value={Name}
                mode="outlined"
                onChangeText={text => setSalary(text)}/>
            <Button
                icon={picture ===" "?"upload":"check"}
                theme={theme}
                style={styles.input}
                mode="contained"
                onPress={() => setModal(true)}>
                Upload Image
            </Button>
            <Button
                icon="content-save"
                theme={theme}
                style={styles.input}
                mode="contained"
                onPress={() => console.log("Saved")}>
                Save
            </Button>

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
