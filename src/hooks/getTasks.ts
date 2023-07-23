import Task from '../interfaces/Task';
import {useQuery} from 'react-query';
import axios from 'axios';

export const getTasks = () => {
  const getData = async (): Promise<Task[]> => {
    try {
      const response = await axios.get(
        'https://64494d24e7eb3378ca459179.mockapi.io/Features',
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  };

  const {data, isLoading, isError} = useQuery<Task[]>('tasks', getData);

  return {
    data,
    isLoading,
    isError,
  };
};
