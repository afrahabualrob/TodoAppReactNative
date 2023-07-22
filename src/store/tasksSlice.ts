import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Task from '../interfaces/Task';

const tasksList: Task[] = [
  {
    id: 1,
    title: 'Implement User Authentication',
    completed: false,
    description: 'Set up user authentication and login functionality.',
  },
  {
    id: 2,
    title: 'Create Dashboard Components',
    completed: false,
    description: 'Design and develop components for the dashboard.',
  },
  {
    id: 3,
    title: 'Optimize Performance',
    completed: false,
    description:
      'Identify and optimize performance bottlenecks in the application.',
  },
  {
    id: 4,
    title: 'Add Data Visualization',
    completed: false,
    description: 'Integrate data visualization charts and graphs.',
  },
  {
    id: 5,
    title: 'Write End-to-End Tests',
    completed: false,
    description:
      'Create end-to-end tests to ensure overall application functionality.',
  },
];

// const saveData = async data => {
//   try {
//     const jsonValue = JSON.stringify(data);
//     await AsyncStorage.setItem('myArray', jsonValue);
//     console.log('Array of objects saved to local storage successfully.');
//   } catch (error) {
//     console.log('Error saving array of objects to local storage:', error);
//   }
// };

// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('myArray');
//     const data = jsonValue != null ? JSON.parse(jsonValue) : [];
//     console.log('Retrieved array of objects from local storage:', data);
//     return data;
//   } catch (error) {
//     console.log('Error retrieving array of objects from local storage:', error);
//     return [];
//   }
// };

// saveData(tasksList);
interface TasksState extends Task {}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksList,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },

    deleteTask: (state, action) => {
      const id = action.payload.id;
      const updatedState = state.filter(task => task.id !== id);
      return updatedState;
    },

    updateTask: (state, action) => {
      const {id, newTitle, newDescription} = action.payload;
      const taskIndex = state.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state[taskIndex].title = newTitle;
        state[taskIndex].description = newDescription;
      }
    },
    toggleCompleted: (state, action) => {
      const id: string = action.payload;
      return state.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      );
    },
  },
});

export type RootState = {
  tasks: Task[];
};

export const {addTask, deleteTask, updateTask, toggleCompleted} =
  tasksSlice.actions;

export default tasksSlice;
