import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API_HOST = 'numbersapi.p.rapidapi.com';
const API_KEY = '0822b56b40msh467f4b3cf1561aap1b1153jsn2689aea02a72';

const App: React.FC = () => {
    const [month, setMonth] = useState<string>('');
    const [day, setDay] = useState<string>('');
    const [fact, setFact] = useState<string>('');

    useEffect(() => {
        if (month && day) {
            fetchFact();
        }
    }, [month, day]);

    const fetchFact = async () => {
        try {
            const url = `https://${API_HOST}/${month}/${day}/date`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': API_HOST,
                },
            });
            const text = await response.text();
            setFact(text);
        } catch (error) {
            console.error('Error fetching fact:', error);
            setFact('Failed to fetch fact');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select Month:</Text>
            <Picker
                selectedValue={month}
                onValueChange={(itemValue) => setMonth(itemValue)}
                style={{ height: 50, width: 150 }}
            >
                {Array.from({ length: 12 }, (_, i) => (
                    <Picker.Item
                        key={i}
                        label={new Date(2025, i, 1).toLocaleString('default', { month: 'long' })}
                        value={(i + 1).toString()}
                    />
                ))}
            </Picker>

            <Text style={styles.label}>Enter Day:</Text>
            <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={day}
                onChangeText={(text) => setDay(text.replace(/[^0-9]/g, ''))}
                maxLength={2}
            />

            {fact ? <Text style={styles.fact}>{fact}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        width: 100,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 8,
        textAlign: 'center',
        marginTop: 5,
    },
    fact: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 10,
        color: 'black'
    },
});

export default App;
