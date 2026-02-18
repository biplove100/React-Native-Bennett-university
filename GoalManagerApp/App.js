import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  // Enable LayoutAnimation on Android
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim().length === 0) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setCourseGoals((currentGoals) => [
      ...currentGoals,
      {
        id: Math.random().toString(),
        text: enteredGoalText,
        completed: false,
      },
    ]);

    setEnteredGoalText('');
  }

  function deleteGoalHandler(id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  }

  function markAsDoneHandler(id) {
    LayoutAnimation.configureNext({
      duration: 400,
      create: {
        type: 'easeInEaseOut',
        property: 'opacity',
      },
      update: {
        type: 'spring',
        springDamping: 0.7,
      },
      delete: {
        type: 'easeInEaseOut',
        property: 'opacity',
      },
    });

    setCourseGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  }

  const pendingGoals = courseGoals.filter((goal) => !goal.completed);
  const completedGoals = courseGoals.filter((goal) => goal.completed);

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your goal here"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="Add" onPress={addGoalHandler} />
      </View>

      <ScrollView style={styles.goalsContainer}>

        {/* 🔵 Pending Section */}
        <Text style={styles.sectionTitle}>Pending Goals</Text>
        {pendingGoals.length === 0 && (
          <Text style={styles.emptyText}>No pending goals</Text>
        )}

        {pendingGoals.map((goal) => (
          <View key={goal.id} style={styles.goalItem}>
            <Text style={styles.goalText}>{goal.text}</Text>

            <View style={styles.buttonContainer}>
              <Button
                title="Done"
                onPress={() => markAsDoneHandler(goal.id)}
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => deleteGoalHandler(goal.id)}
              />
            </View>
          </View>
        ))}

        {/* 🟢 Completed Section */}
        <Text style={styles.sectionTitle}>Completed Goals</Text>
        {completedGoals.length === 0 && (
          <Text style={styles.emptyText}>No completed goals</Text>
        )}

        {completedGoals.map((goal) => (
          <View key={goal.id} style={[styles.goalItem, styles.completedItem]}>
            <Text style={[styles.goalText, styles.completedGoal]}>
              {goal.text}
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                title="Undo"
                onPress={() => markAsDoneHandler(goal.id)}
              />
              <Button
                title="Delete"
                color="red"
                onPress={() => deleteGoalHandler(goal.id)}
              />
            </View>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },

  goalsContainer: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  emptyText: {
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: 10,
  },

  goalItem: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#5e0acc',
  },

  completedItem: {
    backgroundColor: '#2e8b57',
  },

  goalText: {
    color: 'white',
    fontSize: 16,
  },

  completedGoal: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
