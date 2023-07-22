import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import TasksList from '../components/TasksList';
import {useSelector} from 'react-redux';
import AddButton from '../components/AddButton';
import ModalContent from '../components/ModalContent';
import Task from '../interfaces/Task';
import {RootState} from '../store/tasksSlice';
import styles from '../styles/pages/TodoApp';

const TodoApp = () => {
  let categories: string[] = ['All', 'Completed', 'UnCompleted'];
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const tasksList: Task[] = useSelector((state: RootState) => state.tasks);

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
      <ModalContent isModalVisible={isModalVisible} closeModal={closeModal} />
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
