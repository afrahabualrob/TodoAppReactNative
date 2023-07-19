import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const deleteTaskMutation = async (taskId: number) => {
    try {
      const response = await axios.delete(
        `https://64494d24e7eb3378ca459179.mockapi.io/Features/${taskId}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const delete1 = useMutation(deleteTaskMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const deleteTask = (id: number) => {
    delete1.mutate(id);
  };

  return {deleteTask};
};
