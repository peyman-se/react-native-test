import React, {PureComponent} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class ListItem extends PureComponent {

    _reformatDate = (dateString) => {
        var date = new Date(dateString),
            diff = (((new Date()).getTime() - date.getTime()) / 1000),
            day_diff = Math.floor(diff / 86400)

        if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

        return day_diff == 0 && (
            diff < 60 && "just now"
            || diff < 120 && "1 minute ago"
            || diff < 3600 && Math.floor(diff / 60) + " minutes ago"
            || diff < 7200 && "1 hour ago"
            || diff < 86400 && Math.floor(diff / 3600) + " hours ago")
            || day_diff == 1 && "Yesterday"
            || day_diff < 7 && day_diff + " days ago"
            || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago"
            || day_diff > 31 && "More than a month"
            || day_diff > 60 && Math.floor

    }
    
    render() {
        var itemView
        if(this.props.product.ad) {
            itemView = <View>
                            <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
                                   style={{width: 320, height: 200}} />
                        </View>
        } else {
            itemView = <View style={styles.box}>

                            <View style={{ flex: 1 }}>
                                <View style={styles.row}>
                                    <Text style={styles.columnOne}>
                                        Price:
                                    </Text>
                                    <Text style={styles.columnTwo}>
                                        ${this.props.product.price/100}
                                    </Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.columnOne}>
                                        Size:
                                    </Text>
                                    <Text style={styles.columnTwo}>
                                        {this.props.product.size}
                                    </Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.columnOne}>
                                        Date:
                                    </Text>
                                    <Text style={styles.columnTwo}>
                                        {this._reformatDate(this.props.product.date)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.faceView}>
                                <Text style={[styles.face, {fontSize: this.props.product.size}]}>
                                    {this.props.product.face}
                                </Text>
                            </View>
                        </View>
        }
        return (
            itemView
        )
    }
}


const styles = StyleSheet.create({
    box: {
        flex: 1,
        flexDirection: 'row',
        borderWidth:2,
        borderRadius: 4,
        borderColor: '#fff',
        padding: 5,
        margin: 5,
        height: 150,
        // alignItems: 'center',
    },
    faceView: {
        alignItems: 'center',
        flex: 1
    },
    face: {
        color: '#fff',
        marginTop:5,
        marginBottom: 5,
    },
    columnOne: {
        flex: 1,
        color: '#fff',
        alignItems: 'flex-start'
    },
    columnTwo: {
        flex: 2,
        color: '#fff',
        alignItems: 'flex-start'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 2,
        marginRight: 2
    },
});