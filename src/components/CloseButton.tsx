import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface closeButtonProps {
  closeModal: () => void;
}

const CloseButton: React.FC<closeButtonProps> = ({closeModal}) => {
  return (
    <Pressable style={styles.closeButton} onPress={closeModal}>
      <Text style={styles.closeButtonText}>
        <Icon name="times" size={20} color="#000" />
      </Text>
    </Pressable>
  );
};

export default CloseButton;
const styles = StyleSheet.create({
  closeButtonText: {
    fontSize: 18,
    color: '#FFF',
  },

  closeButton: {
    alignItems: 'flex-end',
  },
});
