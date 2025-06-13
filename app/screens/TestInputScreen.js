import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { BACKEND_URL } from '../config';

export default function TestInputScreen({ navigation, route }) {
  const { age, sex, weight_kg } = route.params;
  const [chairStand, setChairStand] = useState('');
  const [pushUp, setPushUp] = useState('');
  const [stepHr, setStepHr] = useState('');
  const [walkTime, setWalkTime] = useState('');
  const [walkHr, setWalkHr] = useState('');

  const handleSubmit = async () => {
    const body = {
      age,
      sex,
      weight_kg,
      chair_stand: parseInt(chairStand, 10),
      push_up: parseInt(pushUp, 10),
      step_hr: parseInt(stepHr, 10),
      walk_time_min: parseFloat(walkTime),
      walk_hr: parseInt(walkHr, 10),
    };

    try {
      const evalRes = await fetch(`${BACKEND_URL}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await evalRes.json();
      navigation.navigate('Dashboard', {
        results: data.tests,
        plan: data.weekly_plan,
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to contact server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chair Stand Reps</Text>
      <TextInput style={styles.input} value={chairStand} onChangeText={setChairStand} keyboardType="numeric" />
      <Text style={styles.label}>Push-Up Reps</Text>
      <TextInput style={styles.input} value={pushUp} onChangeText={setPushUp} keyboardType="numeric" />
      <Text style={styles.label}>Step Test HR (1 min post)</Text>
      <TextInput style={styles.input} value={stepHr} onChangeText={setStepHr} keyboardType="numeric" />
      <Text style={styles.label}>Mile Walk Time (minutes)</Text>
      <TextInput style={styles.input} value={walkTime} onChangeText={setWalkTime} keyboardType="numeric" />
      <Text style={styles.label}>Mile Walk HR</Text>
      <TextInput style={styles.input} value={walkHr} onChangeText={setWalkHr} keyboardType="numeric" />
      <Button title="Submit" onPress={handleSubmit} />
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
