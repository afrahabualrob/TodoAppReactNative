import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#9BCDD2',
    width: '70%',
    marginTop: 30,
    backgroundColor: '#fff',
    color: '#FF8551',
    fontSize: 16,
    paddingLeft: 4,
  },
  description: {
    marginVertical: 30,
  },
  btnContainer: {
    backgroundColor: '#FF8551',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignSelf: 'center',
    marginVertical: 10,
  },
  btn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;