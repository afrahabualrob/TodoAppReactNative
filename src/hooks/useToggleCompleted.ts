import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';
import Task from '../interfaces/Task';

export const useToggle = () => {
  const updateTaskMutation = async (updatedTaskData: Partial<Task>) => {
    try {
      const response = await axios.put<Task>(
        `https://64494d24e7eb3378ca459179.mockapi.io/Features/${updatedTaskData.id}`,
        updatedTaskData,
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.error('Task not found with ID:', updatedTaskData.id);
      } else {
        console.error('Error when updating task:', error);
      }
      throw error;
    }
  };

  const queryClient = useQueryClient();

  const update = useMutation<Task, unknown, Partial<Task>>(updateTaskMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const toggleTask = (updatedTaskData: Task) => {
    update.mutate({...updatedTaskData, completed: !updatedTaskData.completed});
  };

  return {toggleTask};
};
