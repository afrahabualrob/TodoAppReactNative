import React, {useState} from 'react';
import {View, FlatList, Text, Pressable, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Task from '../interfaces/Task';
import {useDeleteTask} from '../hooks/useDeleteTask';
import {useUpdateTask} from '../hooks/useUpdateTask';
import {useToggle} from '../hooks/useToggleCompleted';
import styles from '../styles/component/TasksList.style';
interface taskListProps {
  tasks: Task[];
}

const TasksList: React.FC<taskListProps> = ({tasks}) => {
  const {deleteTask} = useDeleteTask();
  const {updateTask} = useUpdateTask();
  const {toggleTask} = useToggle();

  const [editingTask, setEditingTask] = useState<Task>({
    id: 0,
    title: '',
    description: '',
  });

  const handleUpdateTask = (id: number, title: string, description: string) => {
    setEditingTask({id, title, description});
  };

  const handleSaveTask = () => {
    updateTask(editingTask);

    setEditingTask({id: 0, title: '', description: ''}); // Exit editing mode
  };

  const renderRow = ({item}: {item: Task}) => (
    <Pressable
      style={styles.row}
      onPress={() => handleUpdateTask(item.id, item.title, item.description)}>
      <Icon
        name="circle"
        size={24}
        color={item.completed ? '#379237' : '#888'}
        onPress={() => toggleTask(item)}
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
            onPress={() => deleteTask(item.id)}
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
          keyExtractor={item => '' + item.id}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

export default TasksList;
