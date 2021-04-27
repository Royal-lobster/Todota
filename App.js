import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TodoView = ({ task, handleTaskDelete }) => {
  const [isCompleted, setIsCompleted] = React.useState(false);
  return (
    <>
      <TouchableOpacity
        style={Style.todoView}
        onPress={() => setIsCompleted(!isCompleted)}
      >
        <Text
          style={
            isCompleted ? Style.todoView__Completedtask : Style.todoView__task
          }
        >
          {task.todo}
        </Text>
        <TouchableOpacity
          style={Style.todoView__delete}
          onPress={() => handleTaskDelete(task.id)}
        >
          <Ionicons name="close-sharp" size={22} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};

const App = () => {
  const width = Dimensions.get("window").width;
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("");

  const handleAddTaskPress = (input) => {
    const task = input.trim();
    if (task != "") {
      setTodos([...todos, { todo: task, id: Math.random() }]);
    }
  };

  const handleTaskDelete = (id) => {
    Alert.alert(
      "Delete Task",
      "The task will be permemently deleted from todo list",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => setTodos(todos.filter((todo) => todo.id != id)),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#26282b"
        translucent={true}
      />
      <View style={Style.header}>
        <Text style={Style.header__text}>Todota</Text>
      </View>
      <View style={Style.container}>
        <Text style={Style.taskinput__title}>Add Task</Text>
        <TextInput
          style={Style.taskinput__input}
          placeholder="Eg: Complete Assignment"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity
          style={Style.taskinput__addBtn}
          onPress={() => {
            handleAddTaskPress(input);
            setInput("");
          }}
        >
          <Ionicons name="add-sharp" size={22} color="#5f85db" />
          <Text style={Style.taskinput__addBtnText}>Add Task</Text>
        </TouchableOpacity>
        <ScrollView>
          {todos.length ? (
            todos.map((todo) => (
              <TodoView
                task={todo}
                key={todo.id}
                handleTaskDelete={handleTaskDelete}
              />
            ))
          ) : (
            <View style={Style.container__noItemsFound}>
              <Image
                source={require("./assets/completed.png")}
                style={{ width: width - 30, height: width - 30 }}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <View style={Style.container__footer}>
        <Text style={Style.container__footerText}>Made by Srujan</Text>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  header: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#26282b",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#5f85db",
  },
  header__text: {
    color: "#353941",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
  container: {
    flex: 10,
    backgroundColor: "#353941",
  },
  taskinput__title: {
    margin: 20,
    color: "#5f85db",
    fontWeight: "bold",
    fontSize: 20,
  },
  taskinput__input: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 2,
    borderColor: "#90b8f8",
    padding: 10,
    color: "#90b8f8",
  },
  taskinput__addBtn: {
    margin: 20,
    backgroundColor: "#90b8f8",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  taskinput__addBtnText: {
    color: "#5f85db",
  },
  container__noItemsFound: {
    alignItems: "center",
  },
  todoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#26282b",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  todoView__task: {
    color: "#90b8f8",
    fontWeight: "600",
    padding: 15,
  },
  todoView__Completedtask: {
    color: "#353941",
    fontWeight: "600",
    textDecorationLine: "line-through",
    padding: 15,
  },
  todoView__delete: {
    backgroundColor: "#fb3640",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  container__footer: {
    flex: 0.5,
    backgroundColor: "#90b8f8",
    alignItems: "center",
    justifyContent: "center",
  },
  container__footerText: {
    color: "#5f85db",
    fontWeight: "bold",
  },
});
export default App;
