import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Task from '../model/Task';

const tasksList: Task[] = [
  {id: '1', title: 'Task #11', description: 'This is task 1 ', completed: true},
  {
    id: '2',
    title: 'Task 2',
    description: 'departmental seminars by calling individual',
    completed: true,
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'Plan and prepare the annual budget by',
    completed: false,
  },
  {
    id: '4',
    title: 'Task 4',
    description:
      'Initiate personnel actions including selecting new employees, conducting performance',
    completed: true,
  },
  {
    id: '5',
    title: 'Task 5',
    description:
      'Follow up on all delinquent accounts within specified patient alpha ',
    completed: false,
  },
  {id: '01', title: 'Task #1', description: 'description', completed: false},
  {
    id: '2d',
    title: 'Task 2',
    description: 'Correction of billing errors',
    completed: true,
  },
  {
    id: '3fd',
    title: 'Task 3',
    description: 'specified patient alpha',
    completed: true,
  },
  {id: '445', title: 'Task 4', description: 'description', completed: false},
  {
    id: '553',
    title: 'Follow up on delinquent accounts',
    description:
      'Follow up on all delinquent accounts within specified patient alpha,,Follow up on all delinquent accounts within specified patient alpha,  ',
    completed: true,
  },
  {
    id: '131',
    title: 'Task #1',
    description: 'Correction of billing errors',
    completed: false,
  },
  {
    id: '211',
    title: 'Task 2',
    description: 'Writing off of unpaid accounts',
    completed: false,
  },
  {
    id: '35',
    title: 'Task 3',
    description:
      'Plan and prepare the annual budget by integrating departmental goals and program plans',
    completed: true,
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
      const id: number = action.payload;
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
