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
            nextPageData: [],
            sort: '',
            adsRandom: Math.floor(Math.random()*1000)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("sort", nextState.sort)
        if(this.state.sort != nextState.sort) {
            this._loadMoreProducts(true, nextState.sort);
        }

        if(this.state.page_num != nextState.page_num && nextState.page_num != 1 ) {
            console.log("page number", nextState.page_num)
            this.setState({
                loading: false,
            })
            this._getNextPageData(nextState.page_num)
        }

    }

    componentWillMount() {
        this._loadMoreProducts(true)
    }

    _getNextPageData = async (page_num) => {
        let url = `http://192.168.2.12:3000/api/products?_page=${page_num}&_limit=${this.state.limit}`
        if(this.state.sort !== '') {
            url = url + `&_sort=${this.state.sort}`
        }

        let products = axios.get(url)
        let ad = axios.get(`http://192.168.2.12:3000/api/ads?r=${this.state.adsRandom}`)
        let results = await Promise.all([products, ad])

        this.setState({
            extraLoaded: [...results[0].data, ...({'ad': results[1]})],
            loading: false
        })
    }

    _loadMoreProducts = async (sortChange = false, sort = '') => {
        let newRandomAd
        do {
            newRandomAd = Math.floor(Math.random() * 1000)
        } while (this.state.adsRandom == newRandomAd)

        if(sortChange) {
            let url = `http://192.168.2.12:3000/api/products?_page=${1}&_limit=${this.state.limit}`
            if(sort !== '') {
                url = url + `&_sort=${sort}`
            }
            let products = axios.get(url)
            let ad = axios.get(`http://192.168.2.12:3000/api/ads?r=${this.state.adsRandom}`)
            let results = await Promise.all([products, ad])

            console.log("advertisement is ", results)

            this.setState({
                products: [...results[0].data, ...({'ad': results[1]})],
                page_num: this.state.page_num + 1,
                adsRandom: newRandomAd
            })

        } else {
            this.setState({
                products: [...this.state.products, ...this.state.extraLoaded],
                page_num: this.state.page_num + 1,
                adsRandom: newRandomAd,
                loading: true
            })
        }
    }
  
    render() {

    return (
        <View style={styles.container}>
            <View style={[{flex: 0.1, marginTop: 15}]}>
                <Text style={{color: 'white'}}>Filter by</Text>
                <View style={styles.row}>
                    <Button
                        onPress={() => (
                            this.setState({
                                sort: 'size',
                                page_num: 1
                            })
                        )}
                        title="Size"
                        accessibilityLabel="Filter by size"
                        style={styles.button}
                    />

                    <Button
                        onPress={() => (
                            this.setState({
                                sort: 'date',
                                page_num: 1
                            })
                        )}
                        title="Date"
                        accessibilityLabel="Filter by size"
                        style={styles.button}
                    />

                    <Button
                        onPress={() => (
                            this.setState({
                                sort: 'price',
                                page_num: 1
                            })
                        )}
                        title="Price"
                        accessibilityLabel="Filter by size"
                        style={styles.button}
                    />
                </View>

            </View>
            <FlatList
                data={this.state.products}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => <ListItem product={item} />}
                numColumns={1}
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
