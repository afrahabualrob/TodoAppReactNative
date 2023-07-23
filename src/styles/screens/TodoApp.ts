import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF0E4',
    paddingVertical: 24,
  },
  addButton: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },

  icon: {
    width: 40,
    height: 40,
  },

  title: {
    fontSize: 32,
    textAlign: 'center',
    color: '#FF8551',
    fontWeight: 'bold',
    marginBottom: 16,
  },

  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  category: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexGrow: 1,
    marginHorizontal: 8,
    textAlign: 'center',
    paddingBottom: 8,
    width: '30%',
  },
  selected: {
    borderBottomWidth: 3,
    borderBottomColor: '#64CCC5',
  },
});

export default styles;
