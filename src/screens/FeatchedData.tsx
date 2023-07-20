import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

interface Feature {
  id: number;
  title: string;
  description: string;
  isSelected: boolean;
}

const FeatchedData = () => {
  const queryClient = useQueryClient();

  const getData = async (): Promise<Feature[]> => {
    const response = await axios.get(
      'https://64494d24e7eb3378ca459179.mockapi.io/Features',
    );

    return response.data;
  };
  const {data, isLoading, isError} = useQuery<Feature[]>('features', getData);

  console.log(isLoading);

  //useMutation
  const addFeature = async () => {
    const newFeature: Feature = {
      id: 123,
      title: 'New Feature',
      description: 'this is a description...',
      isSelected: false,
    };

    const response = await axios.post(
      'https://64494d24e7eb3378ca459179.mockapi.io/Features',
      newFeature,
    );
    return response.data;
  };

  const addFeatureMutation = useMutation(addFeature, {
    onSuccess: () => {
      queryClient.invalidateQueries('features');
    },
  });

  const handleAddFeature = () => {
    // const newFeature: Feature = {
    //   id: 123,
    //   title: 'New Feature',
    //   description: 'this is a description...',
    //   isSelected: false,
    // };
    // console.log('newFeature : ', newFeature);

    // console.log('All Feature : ', data);

    addFeatureMutation.mutate();
  };

  // onSuccess: (data) => {
  //   console.log('User created:', data);
  //   // Invalidate the 'users' query to trigger a refetch
  //   queryClient.invalidateQueries('users');
  // },

  //   --------------------------

  const renderItem = ({item}: {item: Feature}) => {
    return (
      <View style={styles.featureContainer}>
        <View style={styles.featureContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Features</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: Feature) => item.id.toString()}
      />
      <Pressable onPress={handleAddFeature} style={{backgroundColor: 'red'}}>
        <Text>Add</Text>
      </Pressable>
    </View>
  );
};

export default FeatchedData;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },

  header: {
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
    color: '#00c',
    marginTop: 16,
  },

  featureContainer: {
    margin: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },

  featureContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  description: {
    paddingVertical: 8,
    fontSize: 16,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
});
