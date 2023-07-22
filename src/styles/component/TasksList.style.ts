import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  table: {
    flex: 1,
    marginHorizontal: 32,
    marginVertical: 24,
  },

  header: {marginTop: 24, borderBottomColor: '#FF8551'},

  flatListContent: {
    flexGrow: 1,
  },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#999',
    marginBottom: 8,
    paddingVertical: 10,
  },

  title: {
    fontWeight: 'bold',
    color: '#FF8551',
    fontSize: 18,
  },

  titleInput: {
    fontWeight: 'bold',
    color: '#FF8551',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 5,
    marginBottom: 5,
  },

  description: {
    paddingTop: 5,
  },

  descriptionInput: {
    paddingTop: 5,
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 4,
    padding: 5,
  },

  rowContent: {
    marginLeft: 8,
    flex: 1,
  },
  trashIcon: {
    borderWidth: 0.8,
    borderColor: '#888',
    borderRadius: 30,
    padding: 5,
    paddingHorizontal: 10,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
