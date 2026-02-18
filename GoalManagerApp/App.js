import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim().length === 0) return;
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {
        id: Math.random().toString(),
        text: enteredGoalText,
        completed: false,
      },
    ]);
    setEnteredGoalText('');
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  }

  function markAsDoneHandler(id) {
    setCourseGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your goal here"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>

      <View style={styles.goalsContainer}>
        <ScrollView>
          {courseGoals.map((goal) => (
            <View key={goal.id} style={styles.goalItem}>
              <Text
                style={[
                  styles.goalText,
                  goal.completed && styles.completedGoal,
                ]}
              >
                {goal.text}
              </Text>

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
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
  },
  inputContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  textInput:{
    borderWidth: 2,
    borderColor: '#cccccc',
    width: '80%',
    marginRight: 8,
    padding: 8,
  },
  goalsContainer:{
    flex: 5,
  },  
  goalItem:{
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText:{
    color: 'white',
  },
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 8,
},

completedGoal: {
  textDecorationLine: 'line-through',
  opacity: 0.6,
},

});
