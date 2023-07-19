import React, {useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deleteTask, updateTask, toggleCompleted} from '../store/tasksSlice';
import Task from '../model/Task';
import {RootState} from '../store/tasksSlice';
interface taskListProps {
  tasks: Task[];
}

const TasksList: React.FC<taskListProps> = ({tasks}) => {
  // const tasksList = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState<Task>({
    id: '',
    title: '',
    description: '',
  });

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask({id: id}));
  };

  const handleUpdateTask = (id: string, title: string, description: string) => {
    setEditingTask({id, title, description});
  };

  const handleSaveTask = () => {
    const {id, title, description} = editingTask;

    dispatch(
      updateTask({id: id, newTitle: title, newDescription: description}),
    );
    setEditingTask({id: '', title: '', description: ''}); // Exit editing mode
  };

  const handleCompleted = (id: string) => {
    console.log(id);
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
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

export default TasksList;

const styles = StyleSheet.create({
  table: {
    flex: 1,
    marginHorizontal: 32,
    marginVertical: 24,
  },

  header: {marginTop: 24, borderBottomColor: '#FF8551'},

  flatListContent: {
    flexGrow: 1,
  },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#999',
    marginBottom: 8,
    paddingVertical: 10,
  },

  title: {
    fontWeight: 'bold',
    color: '#FF8551',
    fontSize: 18,
  },

  titleInput: {
    fontWeight: 'bold',
    color: '#FF8551',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 5,
    marginBottom: 5,
  },

  description: {
    paddingTop: 5,
  },

  descriptionInput: {
    paddingTop: 5,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 4,
    padding: 5,
  },

  rowContent: {
    marginLeft: 8,
    flex: 1,
  },
  trashIcon: {
    borderWidth: 0.8,
    borderColor: '#888',
    borderRadius: 30, // Adjust the value as per your requirement
    padding: 5,
    paddingHorizontal: 10,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
