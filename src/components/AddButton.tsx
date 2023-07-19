import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface addButtonProps {
  openModal: () => void;
}

const AddButton: React.FC<addButtonProps> = ({openModal}) => {
  return (
    <Pressable style={styles.buttonContent} onPress={openModal}>
      <Icon name="plus-circle" size={30} color="#64CCC5" />
      <Text style={styles.buttonText}>add new Task</Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#aaa',
  },
});
