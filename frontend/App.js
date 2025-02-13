import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import { WebSocket } from 'ws';

const App = () => {
const [stocks, setStocks] = useState([]);

useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (event) => {
    setStocks(JSON.parse(event.data));
    };

    return () => ws.close();
}, []);

return (
    <SafeAreaView style={styles.container}>
    <FlatList
        data={stocks}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
        <Text style={styles.item}>
            {item.symbol}: {item.price}
        </Text>
        )}
    />
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
},
item: {
    fontSize: 18,
    margin: 10,
},
});

export default App;
