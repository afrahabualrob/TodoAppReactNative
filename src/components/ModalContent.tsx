import React from 'react';
import {View, Modal} from 'react-native';
import Form from './Form';
import CloseButton from './CloseButton';
import styles from '../styles/component/ModalContant.style';

interface modalProps {
  isModalVisible: boolean;
  closeModal: () => void;
}

const ModalContent: React.FC<modalProps> = ({isModalVisible, closeModal}) => {
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

export default ModalContent;
