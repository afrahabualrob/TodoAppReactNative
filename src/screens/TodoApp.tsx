import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import TasksList from '../components/TasksList';
import AddButton from '../components/AddButton';
import ModalContent from '../components/ModalContent';
import Task from '../interfaces/Task';
import {getTasks} from '../customHook/getTasks';
import styles from '../styles/screens/TodoApp';

const TodoApp = () => {
  let categories: string[] = ['All', 'Completed', 'UnCompleted'];
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const {data} = getTasks();
  const tasksList = data ? data : [];

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

  //fiteration according category
  let shownTask: Task[];

  const handleSelectCategory = () => {
    switch (selectedCategory) {
      case 'All':
        shownTask = tasksList;
        break;

      case 'Completed':
        shownTask = tasksList.filter((task: Task) => task.completed);
        break;

      case 'UnCompleted':
        shownTask = tasksList.filter((task: Task) => !task.completed);
        break;
      default:
        console.log('Invalid Category');
    }
    return shownTask;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My TodoList..</Text>
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
