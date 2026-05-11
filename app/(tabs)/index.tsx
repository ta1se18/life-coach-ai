import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const STORAGE_KEY = 'life_todo_items';

export default function HomeScreen() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: '🔥 起業する', done: false },
    { id: '2', text: '🌍 海外で働く', done: false },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!todo.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: todo.trim(),
      done: false,
    };

    setTodos([...todos, newTodo]);
    setTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>人生TODO</Text>
      <Text style={styles.subtitle}>閉じても、夢は残る。</Text>

      <View style={styles.inputArea}>
        <TextInput
          placeholder="夢や目標を入力"
          placeholderTextColor="#777"
          value={todo}
          onChangeText={setTodo}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>追加</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTodo(item.id)}>
            <Text style={[styles.todo, item.done && styles.doneTodo]}>
              {item.done ? '✅ ' : '⬜️ '}
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 90,
    paddingHorizontal: 24,
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#999',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 36,
  },
  inputArea: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    backgroundColor: '#111',
    color: 'white',
    padding: 14,
    borderRadius: 12,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todo: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  doneTodo: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
});