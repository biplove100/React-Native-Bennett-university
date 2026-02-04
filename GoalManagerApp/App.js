import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [goalsList, setGoalsList] = useState([]);

  function handleTextInput(textEntered) {
    setEnteredGoalText(textEntered);
  }

  function handleButtonPress() {
    if (enteredGoalText.trim() === '') return;

    setGoalsList(currentGoals => [
      ...currentGoals,
      {
        id: Math.random().toString(),
        text: enteredGoalText,
        completed: false,
      },
    ]);

    setEnteredGoalText('');
  }

  function toggleComplete(id) {
    setGoalsList(currentGoals =>
      currentGoals.map(goal =>
        goal.id === id
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  }

  function deleteGoal(id) {
    setGoalsList(currentGoals =>
      currentGoals.filter(goal => goal.id !== id)
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write your goal here"
          onChangeText={handleTextInput}
          value={enteredGoalText}
        />
        <Button title="Add" onPress={handleButtonPress} />
      </View>

      <View style={styles.goalsContainer}>
        {goalsList.map(goal => (
          <View key={goal.id} style={styles.goalCard}>
            <Text
              style={[
                styles.goalText,
                goal.completed && styles.completedText,
              ]}
            >
              {goal.text}
            </Text>

            <View style={styles.buttonsContainer}>
              <Pressable
                style={styles.completeButton}
                onPress={() => toggleComplete(goal.id)}
              >
                <Text style={styles.buttonText}>
                  {goal.completed ? 'Undo' : 'Complete'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteGoal(goal.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  goalsContainer: {
    flex: 1,
  },
  goalCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 