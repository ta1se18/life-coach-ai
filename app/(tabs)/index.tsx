import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
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

const STORAGE_KEY = 'life_todo_items_v2';

export default function HomeScreen() {
  const [todo, setTodo] = useState('');

  const [freeTime, setFreeTime] = useState('');
  const [condition, setCondition] = useState('');
  const [mood, setMood] = useState('');
  const [dream, setDream] = useState('');

  const [todos, setTodos] = useState<Todo[]>([]);

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
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const completedCount = todos.filter((t) => t.done).length;

  const achievementRate =
    todos.length === 0
      ? 0
      : Math.round((completedCount / todos.length) * 100);

  const aiSuggestions = useMemo(() => {
    const result: string[] = [];

    if (dream.includes('起業')) {
      result.push('🔥 競合サービスを1つ分析する');
      result.push('📱 アプリ改善点を3つ考える');
    }

    if (dream.includes('英語')) {
      result.push('🌍 英単語を20個覚える');
    }

    if (condition.includes('疲')) {
      result.push('🛌 今日は早めに寝る');
    }

    if (mood.includes('不安')) {
      result.push('🧠 不安を書き出して整理する');
    }

    if (mood.includes('やる気MAX')) {
      result.push('🚀 一番難しいタスクに挑戦する');
    }

    if (freeTime.includes('30分')) {
      result.push('⏰ 30分だけ集中して動く');
    }

    if (result.length === 0) {
      result.push('📘 理想の人生について10分考える');
      result.push('🔥 小さくても1歩進む');
    }

    return result;
  }, [freeTime, condition, mood, dream]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>LIFE COACH AI</Text>

      <Text style={styles.subtitle}>
        理想の人生と、今日の行動をつなぐ
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>今日の状態</Text>

        <TextInput
          placeholder="自由時間（例：30分、2時間）"
          placeholderTextColor="#777"
          value={freeTime}
          onChangeText={setFreeTime}
          style={styles.input}
        />

        <TextInput
          placeholder="体調（例：元気、疲れてる）"
          placeholderTextColor="#777"
          value={condition}
          onChangeText={setCondition}
          style={styles.input}
        />

        <TextInput
          placeholder="気分（例：やる気MAX、不安）"
          placeholderTextColor="#777"
          value={mood}
          onChangeText={setMood}
          style={styles.input}
        />

        <TextInput
          placeholder="夢・目標（例：起業、英語）"
          placeholderTextColor="#777"
          value={dream}
          onChangeText={setDream}
          style={styles.input}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          AI提案TODO
        </Text>

        {aiSuggestions.map((item, index) => (
          <Text key={index} style={styles.aiTodo}>
            {item}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          達成率 {achievementRate}%
        </Text>

        <Text style={styles.rateText}>
          {completedCount} / {todos.length} 完了
        </Text>
      </View>

      <View style={styles.inputArea}>
        <TextInput
          placeholder="夢や目標を追加"
          placeholderTextColor="#777"
          value={todo}
          onChangeText={setTodo}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={addTodo}
        >
          <Text style={styles.buttonText}>
            追加
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        scrollEnabled={false}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <TouchableOpacity
              style={styles.todoTextArea}
              onPress={() => toggleTodo(item.id)}
            >
              <Text
                style={[
                  styles.todo,
                  item.done && styles.doneTodo,
                ]}
              >
                {item.done ? '✅ ' : '⬜️ '}
                {item.text}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteTodo(item.id)}
            >
              <Text style={styles.delete}>
                ❌
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#999',
    marginTop: 8,
    marginBottom: 30,
    fontSize: 15,
  },

  card: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },

  cardTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  input: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
  },

  aiTodo: {
    color: '#60a5fa',
    fontSize: 18,
    marginBottom: 12,
  },

  rateText: {
    color: '#aaa',
    fontSize: 16,
  },

  inputArea: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 12,
    marginLeft: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  todoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  todoTextArea: {
    flex: 1,
  },

  todo: {
    color: 'white',
    fontSize: 22,
  },

  doneTodo: {
    textDecorationLine: 'line-through',
    color: '#666',
  },

  delete: {
    color: 'red',
    fontSize: 20,
    marginLeft: 10,
  },
});