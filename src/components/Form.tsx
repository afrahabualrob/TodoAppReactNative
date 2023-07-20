import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Task from '../interfaces/Task';
import {useAddTask} from '../customHook/addTask';

interface formProps {
  closeModal: () => void;
}

const Form: React.FC<formProps> = ({closeModal}) => {
  const {addTask} = useAddTask();
  const [task, setTask] = useState({title: '', description: ''});

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const IsUserAddTask: boolean =
    task.title.length !== 0 && task.description.length !== 0;

  const handleAddTask = (): void => {
    //check input field
    if (!IsUserAddTask) return;

    //add Task to array
    const id: number = +generateUniqueId(); // create uniqe id
    // dispatch(addTask({id: id, ...task, completed: false} as Task));
    let a: Task = {id: id, title: task.title, description: task.description};
    addTask(a);

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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#9BCDD2',
    width: '70%',
    marginTop: 30,
    backgroundColor: '#fff',
    color: '#FF8551',
    fontSize: 16,
    paddingLeft: 4,
  },
  description: {
    marginVertical: 30,
  },
  btnContainer: {
    backgroundColor: '#FF8551',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignSelf: 'center',
    marginVertical: 10,
  },
  btn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
