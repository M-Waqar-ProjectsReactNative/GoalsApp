import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  FlatList,
  Modal,
} from "react-native";

export default function App() {
  const [goals, setGoals] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  const [goalList, setGoalList] = useState([]);

  const inputChange = (text) => {
    setGoals(text);
  };

  const addGoal = () => {
    setGoalList((prevgoal) => [
      { id: Math.random().toString(), goal: goals },
      ...prevgoal,
    ]);
    setIsAddMode(false);
    setGoals("");
  };

  const cancleGoal = () => {
    setGoals("");
    setIsAddMode(false);
  };

  const deleteGoal = (goalId) => {
    setGoalList((prevList) => {
      return prevList.filter((item) => item.id !== goalId);
    });
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Task" onPress={() => setIsAddMode(true)} />
      <Modal visible={isAddMode} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Goals"
            style={styles.textInput}
            onChangeText={inputChange}
            value={goals}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="ADD" onPress={addGoal} />
            </View>
            <View style={styles.button}>
              <Button title="CANCLE" onPress={cancleGoal} />
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={goalList}
        renderItem={(itemData) => (
          <TouchableOpacity onPress={() => deleteGoal(itemData.item.id)}>
            <View style={styles.listItem}>
              <Text>{itemData.item.goal}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* <ScrollView>
        {goalList.map((goal) => (
          <View key={goal} style={styles.listItem}>
            <Text>{goal}</Text>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 40,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    width: "45%",
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#ccc",
  },
});
