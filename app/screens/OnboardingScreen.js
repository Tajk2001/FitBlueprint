import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [weight, setWeight] = useState('');

  const handleContinue = () => {
    if (!age || !sex || !weight) return;
    navigation.navigate('TestInput', {
      age: parseInt(age, 10),
      sex,
      weight_kg: parseFloat(weight),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Age</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
      <Text style={styles.label}>Sex (male/female)</Text>
      <TextInput style={styles.input} value={sex} onChangeText={setSex} />
      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 4,
  },
});
