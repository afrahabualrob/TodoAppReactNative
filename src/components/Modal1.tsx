import React from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import Form from './Form';
import CloseButton from './CloseButton';

interface modalProps {
  isModalVisible: boolean;
  closeModal: () => void;
}

const Modal1: React.FC<modalProps> = ({isModalVisible, closeModal}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View style={styles.modal}>
        <View style={styles.inner}>
          <CloseButton closeModal={closeModal} />
          <Form closeModal={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default Modal1;

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(100,100,100,0.7)',
  },
  inner: {
    backgroundColor: '#FAF0E4',
    padding: 24,
    borderRadius: 8,
    width: '80%',
  },
});
