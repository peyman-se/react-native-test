import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios'
import ListItem from './components/ListItem'

export default class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      
    }
  }
  
  componentWillMount() {
      axios.get('http://192.168.2.12:3000/api/products?_page=10&_limit=8').then(
          (response) => {
              //todo error catching
              this.setState({
                  products: response.data
              })
          }
      )
  }


  
  render() {
      // console.log(this.state.products)
    return (
        <FlatList
            data={this.state.products}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => <ListItem product={item} />}
            numColumns={2}
            style={styles.container}
        />
    );
  }

    _keyExtractor = (item, index) => item.id;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 10
  },
    box: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: 'blue',
        borderRadius: 4,
        padding: 5,
        margin: 5,
        height: 150
    }
});
