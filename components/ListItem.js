import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class ListItem extends React.PureComponent {

    render() {
        console.log("product is ....", this.props.product)
        return (
            <View style={styles.box}>
                <View style={styles.faceView}>
                    <Text style={[styles.face, {fontSize: this.props.product.size}]}>
                        {this.props.product.face}
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <View style={styles.row}>
                        <Text style={styles.generalText}>
                            Price:
                        </Text>
                        <Text style={styles.generalText}>
                            {this.props.product.price}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.generalText}>
                            Size:
                        </Text>
                        <Text style={styles.generalText}>
                            {this.props.product.size}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    box: {
        flex: 1,
        borderWidth:2,
        borderRadius: 4,
        borderColor: '#fff',
        padding: 5,
        margin: 15,
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
    generalText: {
        flex: 1,
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