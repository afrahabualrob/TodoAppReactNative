import React, {useState} from 'react';
import {View, FlatList, Text, Pressable, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deleteTask, updateTask, toggleCompleted} from '../store/tasksSlice';
import Task from '../interfaces/Task';
import styles from '../styles/component/TasksList.style';

interface taskListProps {
  tasks: Task[];
}

const TasksList: React.FC<taskListProps> = ({tasks}) => {
  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState<Task>({
    id: 0,
    title: '',
    description: '',
  });

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask({id: id}));
  };

  const handleUpdateTask = (id: number, title: string, description: string) => {
    setEditingTask({id, title, description});
  };

  const handleSaveTask = () => {
    const {id, title, description} = editingTask;

    dispatch(
      updateTask({id: id, newTitle: title, newDescription: description}),
    );
    setEditingTask({id: id, title: '', description: ''}); // Exit editing mode
  };

  const handleCompleted = (id: number) => {
    console.log('completed id', id);
    dispatch(toggleCompleted(id));
  };

  const renderRow = ({item}: {item: Task}) => (
    <Pressable
      style={styles.row}
      onPress={() => handleUpdateTask(item.id, item.title, item.description)}>
      <Icon
        name="circle"
        size={24}
        color={item.completed ? '#379237' : '#888'}
        onPress={() => handleCompleted(item.id)}
      />

      <View style={styles.rowContent}>
        {editingTask.id === item.id ? (
          <TextInput
            value={editingTask.title}
            onChangeText={text => setEditingTask({...editingTask, title: text})}
            style={[styles.titleInput, {borderWidth: 0}]}
          />
        ) : (
          <Text style={[styles.title]}>{item.title}</Text>
        )}
        {editingTask.id === item.id ? (
          <>
            <TextInput
              value={editingTask.description}
              onChangeText={text =>
                setEditingTask({...editingTask, description: text})
              }
              style={[styles.descriptionInput, {borderWidth: 0}]}
            />
          </>
        ) : (
          <Text style={styles.description}>{item.description}</Text>
        )}
      </View>
      {editingTask.id === item.id && (
        <Icon name="check" size={20} color="#FF8551" onPress={handleSaveTask} />
      )}
      {editingTask.id !== item.id && (
        <View style={styles.iconWrapper}>
          <Icon
            name="trash"
            size={23}
            color="#888"
            onPress={() => handleDeleteTask(item.id)}
            style={styles.trashIcon}
          />
        </View>
      )}
    </Pressable>
  );

  return (
    <View style={styles.table}>
      <View>
        <FlatList
          data={tasks}
          renderItem={renderRow}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

export default TasksList;
