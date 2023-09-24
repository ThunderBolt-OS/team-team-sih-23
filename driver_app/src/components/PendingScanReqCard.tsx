import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PendingScanRequest } from '../lib/interfaces/ScanInterface'

const PendingScanReqCard = (props: PendingScanRequest) => {
  return (
    <View
      style={{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white',
        padding: 8,
        marginBottom:8
      }}>
      <Text>Bandobast id :{props.id}</Text>
      <Text>Created by : {props.network_admin}</Text>
      <Text>{props.police}</Text>
      <Text>{props.status}</Text>
      <Text>{new Date(props.request_time).toLocaleString()}</Text>
      <Text>{new Date(props.police_scan_timestamp).toLocaleString()}</Text>
      <Text>{new Date(props.expiry).toLocaleString()}</Text>
    </View>
  )
}

export default PendingScanReqCard

const styles = StyleSheet.create({})