import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SafeArea from '../components/SafeArea';
import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';
import CustButton from '../components/CustButton';
import * as FileSystem from 'expo-file-system';
import {getDownloadURL, uploadBytes, ref, uploadString} from 'firebase/storage';
import {storage} from '../lib/Firebase';
const KycScreen5 = ({navigation, route}: any) => {
  const signRef = useRef<SignatureViewRef>();
  const [signature, setSignature] = useState('');
  const [hasToSign, setHasToSign] = useState(false);
  const [image, setImage] = useState(null);
  const [AdharFileName, setAdharFileName] = useState('');
  const [aadharFile, setaadharFile] = useState('');
  const [signFile, setsignFile] = useState('');
  const [dematFile, setdematFile] = useState('');
  const [DematFileName, setDematFileName] = useState('');
  const uploadUriFirebase = async (uri: string) => {
    const response = await fetch(uri);
    const fileUrl = uri.split('/');
    const fileName = fileUrl[fileUrl.length - 1];
    const imageBuff = await response.blob();
    // console.log(imageBuff)
    var imageRef = ref(storage, 'files/' + fileName);
    const upload = await uploadBytes(imageRef, imageBuff);
    const url = await getDownloadURL(imageRef);
    return url;
  };
  function makeid(length: any) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  // const uploadStringFirebase = async (bob: any) => {
  //   // const response = await fetch(uri);
  //   // const fileUrl = uri.split("/");
  //   // const fileName = fileUrl[fileUrl.length - 1];
  //   // const imageBuff = await response.blob();
  //   // console.log(imageBuff)
  //   bob.replace("data:image/png;base64,", "");
  //   console.log(bob);
  //   var imageRef = ref(storage, "files/" + makeid(10) + ".png");
  //   const upload = await uploadBytes(imageRef, bob);
  //   const url = await getDownloadURL(imageRef);
  //   return url;
  // };

  const handleOK = (signature: any) => {
    setSignature(signature);
    const path = FileSystem.cacheDirectory + makeid(10) + 'sign.png';
    FileSystem.writeAsStringAsync(
      path,
      signature.replace('data:image/png;base64,', ''),
      {encoding: FileSystem.EncodingType.Base64},
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then(val => setsignFile(val.uri))
      .catch(console.error);
    // onOK(signature); // Callback from Component props
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log('Empty');
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log('clear success!');
  };

  // Called after end of stroke
  const handleEnd = () => {
    if (signRef && signRef.current) signRef.current.readSignature();
  };

  // Called after signRef.current.getData()
  const handleData = (data: any) => {
    console.log(data);
    setHasToSign(false);
  };
  const pickImage = async () => {};

  const uploadAll = async () => {
    const adLink = await uploadUriFirebase(aadharFile);
    const demLink = await uploadUriFirebase(dematFile);
    //@ts-ignore
    const imgLink = await uploadUriFirebase(image);
    const singLink = await uploadUriFirebase(signFile);
    console.log({adLink, demLink, imgLink, singLink, ...route.params});
    navigation.navigate('KycScreen6', {
      adLink,
      demLink,
      imgLink,
      singLink,
      ...route.params,
    });
    // console.log(image, aadharFile, dematFile, signature);
  };

  useEffect(() => {
    console.log(route.params);
    if (route.params && route.params.imageLink) {
      console.log('yes');
      setImage(route.params.imageLink);
      console.log(image);
    }
  }, [, route.params]);

  return (
    <SafeArea>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View
          style={{
            // flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: 'center',
            marginTop: 15,
          }}>
          {/* <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Your Photo :
          </Text> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BusPhotoScreen');
            }}
            style={{
              borderColor: '#4896f0',
              height: 48,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              alignSelf: 'center',
              borderWidth: 1.6,
            }}>
            <Text
              style={{
                color: '#fefefe',
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'm',
              }}>
              Upload Bus Photo
            </Text>
          </TouchableOpacity>
        </View>
        {image && (
          <Image
            source={{uri: image}}
            style={{width: 200, height: 200, alignSelf: 'center'}}
          />
        )}

        {AdharFileName && (
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}>
            {AdharFileName}
          </Text>
        )}
        {DematFileName && (
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}>
            {DematFileName}
          </Text>
        )}
        <View
          style={{
            // flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: 'center',
            marginTop: 15,
          }}>
          {/* <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Add Sign :
          </Text> */}
          {/* <CustButton
            text="cust"
            onButtonPress={() => {
              setHasToSign(true);
            }}
          /> */}
          <TouchableOpacity
            onPress={() => {
              setHasToSign(true);
            }}
            style={{
              borderColor: '#4896f0',
              height: 48,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              alignSelf: 'center',
              borderWidth: 1.6,
            }}>
            <Text
              style={{
                color: '#fefefe',
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'm',
              }}>
              Your Sign
            </Text>
          </TouchableOpacity>
        </View>
        {!hasToSign && signature ? (
          <View
            style={{
              backgroundColor: 'white',
              alignSelf: 'center',
              marginTop: 16,
            }}>
            <Image
              resizeMode={'contain'}
              style={{width: 335, height: 114}}
              source={{uri: signature}}
            />
          </View>
        ) : null}
        {hasToSign && (
          <View
            style={{
              height: 970,
              position: 'absolute',
              top: '20%',
              alignSelf: 'center',
              width: '100%',
              zIndex: 10,
            }}>
            <SignatureScreen
              ref={signRef}
              onEnd={handleEnd}
              onOK={handleOK}
              onEmpty={handleEmpty}
              onClear={handleClear}
              onGetData={handleData}
              //   autoClear={true}
              descriptionText={'text'}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={() => uploadAll()}
          style={{
            backgroundColor: '#4896f0',
            height: 48,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            alignSelf: 'center',
            position: 'absolute',
            bottom: 64,
          }}>
          <Text
            style={{
              color: '#fefefe',
              fontSize: 18,
              textAlign: 'center',
              fontFamily: 'mm',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeArea>
  );
};

export default KycScreen5;

const styles = StyleSheet.create({});
