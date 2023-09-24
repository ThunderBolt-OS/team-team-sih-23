import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {Modal, View, TextInput, Button, StyleSheet} from 'react-native';
import SosCard from './SosCard';
import CustButton from './CustButton';
import {NearbySosData} from '../lib/interfaces/SosApiInterface';
import {sos_called} from '../lib/api/Functions';

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({visible, onClose}) => {
  const [Nearby, setNearby] = useState<NearbySosData[]>([]);
  useEffect(() => {
    if (visible) {
      sos_called().then(setNearby);
    }
  }, [visible]);
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <SosCard NearbyApiRes={Nearby} />
          <View style={styles.buttonContainer}>
            <CustButton
              text="OKAY"
              onButtonPress={onClose}
              container_style={{
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: 80,
                borderRadius: 4,
              }}
              text_style={{fontFamily: 'rb', letterSpacing: 1.08}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f9e4f9',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default AlertModal;
