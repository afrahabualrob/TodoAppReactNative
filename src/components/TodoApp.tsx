import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import TasksList from './TasksList';
import {useSelector} from 'react-redux';
import AddButton from './AddButton';
import Modal1 from './Modal1';
import Task from '../model/Task';
import { RootState } from '../store/tasksSlice';

const TodoApp = () => {
  let categories: string[] = ['All', 'Completed', 'UnCompleted'];
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const tasksList:Task[] = useSelector((state: RootState) => state.tasks);

  const openModal = (): void => {
    setModalVisible(true);
    console.log('opened....');
  };

  const closeModal = (): void => {
    console.log('closed');
    setTimeout(() => {
      setModalVisible(false);
    }, 200);
  };

  //choose category-----------------------

  let shownTask: Task[];

  const handleSelectCategory = () => {
    switch (selectedCategory) {
      case 'All':
        shownTask = tasksList;
        break;

      case 'Completed':
        shownTask = tasksList.filter((task: Task) => task.completed === true);
        break;

      case 'UnCompleted':
        shownTask = tasksList.filter((task: Task) => task.completed === false);
        break;
      default:
        console.log('Invalid Category');
    }
    return shownTask;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My TodoList</Text>
      <AddButton openModal={openModal} />
      <Modal1 isModalVisible={isModalVisible} closeModal={closeModal} />
      {/* Categories */}

      <View style={styles.categories}>
        {categories.map((item: string, index: number) => {
          return (
            <Text
              key={index}
              style={[
                styles.category,
                item === selectedCategory ? styles.selected : undefined,
              ]}
              onPress={() => {
                setSelectedCategory(item);
              }}>
              {item}
            </Text>
          );
        })}
      </View>
      <TasksList tasks={handleSelectCategory()} />
    </SafeAreaView>
  );
};

export default TodoApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E4',
    paddingVertical: 24,
  },
  addButton: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  icon: {
    width: 40,
    height: 40,
  },

  title: {
    fontSize: 32,
    textAlign: 'center',
    color: '#FF8551',
    fontWeight: 'bold',
    marginBottom: 16,
  },

  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  category: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexGrow: 1,
    marginHorizontal: 8,
    textAlign: 'center',
    paddingBottom: 8,
    width: '30%',
  },
  selected: {
    borderBottomWidth: 3,
    borderBottomColor: '#64CCC5',
  },
});
