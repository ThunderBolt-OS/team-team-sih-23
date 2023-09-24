import {Button, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import SafeArea from '../components/SafeArea';
import {useAppContext} from '../lib/Context';

const Profile = () => {
  const context = useAppContext();
  if (context && context.OfficerData[0])
    return (
      <SafeArea>
        <>
          <Image
            source={{uri: context.OfficerData[0].police_user.image_url}}
            style={{height: 64, width: 64, resizeMode: 'contain'}}
          />
          <Text>{context.OfficerData[0].police_user.name}</Text>
          <Text>{context.OfficerData[0].police_user.phone}</Text>
          <Text>{context.OfficerData[0].police_user.email}</Text>
          <Text>{context.OfficerData[0].police_user.department}</Text>
          <Text>{context.OfficerData[0].police_user.rank}</Text>
          <Button title="logout" onPress={() => context?.logout()}></Button>
        </>
      </SafeArea>
    );
  return <></>;
};

export default Profile;

const styles = StyleSheet.create({});
