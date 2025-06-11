import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DashboardScreen({ route }) {
  const { results, plan } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {results.map((r, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.title}>{r['Test Name']}</Text>
          <Text>Category: {r['Score Category']}</Text>
          <Text>Risk: {r['Risk Flag'] ? 'Yes' : 'No'}</Text>
          <Text>{r['Message']}</Text>
          {r['VO2max'] && <Text>VO2max: {r['VO2max']}</Text>}
        </View>
      ))}
      <View style={styles.plan}>
        <Text style={styles.title}>Weekly Plan</Text>
        {Object.entries(plan).map(([day, activity]) => (
          <Text key={day}>{day}: {activity}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  plan: {
    marginTop: 20,
  },
});
