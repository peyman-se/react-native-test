import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import axios from 'axios'
import ListItem from './components/ListItem'

export default class App extends React.Component {
  
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            products: [],
            extraLoaded: [],
            page_num: 1,
            limit: 20,
            nextPageData: []
        }

    }
    componentWillUpdate(nextProps, nextState) {
        if(this.state.page_num != nextState.page_num) {
            this.setState({
                loading: false,
            })
            console.log(nextState.page_num)
            this._getNextPageData(nextState.page_num)
        }
    }

    componentWillMount() {
        this._loadMoreProducts()
    }

    _getNextPageData = async (page_num) => {
        let response = await axios.get(`http://192.168.2.12:3000/api/products?_page=${page_num}&_limit=${this.state.limit}`)
        this.setState({
            extraLoaded: response.data,
        })
    }

    _loadMoreProducts = async () => {
        if(this.state.page_num === 1) {
            this.setState({
                products: (await axios.get(`http://192.168.2.12:3000/api/products?_page=${this.state.page_num}&_limit=${this.state.limit}`)).data,
                page_num: this.state.page_num + 1
            })
        } else {
            this.setState({
                products: [...this.state.products, ...this.state.extraLoaded],
                page_num: this.state.page_num + 1
            })
        }
    }
  
    render() {
      // console.log(this.state.products)

    return (
        <View style={styles.container}>
            <View style={[{flex: 0.1, marginTop: 15}]}>
                <Text style={{color: 'white'}}>Filter by</Text>
                <View style={styles.row}>
                    <Button
                        onPress={() => console.log("size")}
                        title="Size"
                        accessibilityLabel="Filter by size"
                        style={styles.button}
                    />

                    <Button
                        onPress={() => console.log("date")}
                        title="date"
                        accessibilityLabel="Filter by size"
                        style={styles.button}
                    />

                    <Button
                        onPress={() => console.log("price")}
                        title="price"
                        accessibilityLabel="Filter by size"
                        style={styles.button}
                    />
                </View>

            </View>
            <FlatList
                data={this.state.products}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => <ListItem product={item} />}
                numColumns={2}
                shouldItemUpdate={false}
                onEndReachedThreshold={0}
                onEndReached={({ distanceFromEnd }) => {
                    this._loadMoreProducts()
                }
            }
            />
            {this.state.loading ?
                <View style={styles.loading}>
                    <Text style={styles.loadingText}>Loading ... </Text>
                </View>
                : null
            }
        </View>
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
    },
    button: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'white',
        color: 'white',
        margin: 3,
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 24,
        color: 'white',
    }
});
