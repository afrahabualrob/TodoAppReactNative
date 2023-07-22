import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTask} from '../store/tasksSlice';
import {Pressable, Text, TextInput, View} from 'react-native';
import Task from '../interfaces/Task';
import styles from '../styles/component/From.style';
interface formProps {
  closeModal: () => void;
}

const Form: React.FC<formProps> = ({closeModal}) => {
  const [task, setTask] = useState({title: '', description: ''});

  const dispatch = useDispatch();
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const IsUserAddTask: boolean =
    task.title.length !== 0 && task.description.length !== 0;

  const handleAddTask = (): void => {
    //check input field
    if (!IsUserAddTask) return;

    //add Task to array
    const id: number = Number(generateUniqueId()); // create uniqe id
    dispatch(addTask({id: id, ...task, completed: false} as Task));

    //clear input content
    setTask({title: '', description: ''});
    console.log('added....');
    closeModal();
  };
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="Task"
          style={styles.input}
          placeholderTextColor="#D9BBAD"
          value={task.title}
          onChangeText={text => setTask({...task, title: text})}
        />
        <TextInput
          multiline
          placeholder="Description"
          style={[styles.input, styles.description]}
          placeholderTextColor="#D9BBAD"
          value={task.description}
          onChangeText={text => setTask({...task, description: text})}
        />
        {IsUserAddTask ? (
          <Pressable style={styles.btnContainer} onPress={handleAddTask}>
            <Text style={styles.btn}>Add Task</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.btnContainer, {backgroundColor: '#999'}]}
            onPress={handleAddTask}>
            <Text style={styles.btn}>Add Task</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Form;
