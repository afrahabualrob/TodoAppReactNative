import {useMutation, useQueryClient} from 'react-query';
import Task from '../interfaces/Task';
import axios from 'axios';

export const useAddTask = () => {
  const queryClient = useQueryClient();

  const addTaskMutation = async (newTask: Task) => {
    try {
      const response = await axios.post(
        'https://64494d24e7eb3378ca459179.mockapi.io/Features',
        newTask,
      );
      console.log('New Task:', newTask);
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const add = useMutation(addTaskMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const addTask = (newTask: Task) => {
    add.mutate(newTask);
  };

  return {addTask};
};
