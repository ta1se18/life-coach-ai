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

type Category =
  | '事業'
  | '健康'
  | '勉強'
  | '恋愛'
  | 'お金'
  | '人間関係'
  | 'その他';

type Todo = {
  id: string;
  text: string;
  done: boolean;
  category: Category;
};

const STORAGE_KEY = 'life_todo_items_v3';

const categories: Category[] = [
  '事業',
  '健康',
  '勉強',
  '恋愛',
  'お金',
  '人間関係',
  'その他',
];

export default function HomeScreen() {
  const [todo, setTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('事業');

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
      category: selectedCategory,
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

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  const completedCount = todos.filter((t) => t.done).length;

  const achievementRate =
    todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  const aiSuggestions = useMemo(() => {
    const result: { text: string; category: Category }[] = [];

    if (dream.includes('起業')) {
      result.push({ text: '🔥 競合サービスを1つ分析する', category: '事業' });
      result.push({ text: '📱 アプリ改善点を3つ考える', category: '事業' });
    }

    if (dream.includes('英語')) {
      result.push({ text: '🌍 英単語を20個覚える', category: '勉強' });
    }

    if (condition.includes('疲')) {
      result.push({ text: '🛌 今日は早めに寝る', category: '健康' });
    }

    if (mood.includes('不安')) {
      result.push({ text: '🧠 不安を書き出して整理する', category: '健康' });
    }

    if (mood.includes('やる気MAX')) {
      result.push({ text: '🚀 一番難しいタスクに挑戦する', category: '事業' });
    }

    if (freeTime.includes('30分')) {
      result.push({ text: '⏰ 30分だけ集中して動く', category: 'その他' });
    }

    if (result.length === 0) {
      result.push({ text: '📘 理想の人生について10分考える', category: 'その他' });
      result.push({ text: '🔥 小さくても1歩進む', category: 'その他' });
    }

    return result;
  }, [freeTime, condition, mood, dream]);

  const addSuggestion = (suggestion: { text: string; category: Category }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: suggestion.text,
      done: false,
      category: suggestion.category,
    };

    setTodos([...todos, newTodo]);
  };

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
        <Text style={styles.cardTitle}>AI提案TODO</Text>

        {aiSuggestions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionRow}
            onPress={() => addSuggestion(item)}
          >
            <View>
              <Text style={styles.aiTodo}>{item.text}</Text>
              <Text style={styles.categorySmall}>{item.category}</Text>
            </View>

            <Text style={styles.addSmall}>＋</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.helpText}>
          タップするとTODOに追加されます。
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>達成率 {achievementRate}%</Text>
        <Text style={styles.rateText}>
          {completedCount} / {todos.length} 完了
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>TODOを追加</Text>

        <TextInput
          placeholder="夢や目標を追加"
          placeholderTextColor="#777"
          value={todo}
          onChangeText={setTodo}
          style={styles.input}
        />

        <Text style={styles.categoryTitle}>カテゴリ</Text>

        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>追加</Text>
        </TouchableOpacity>
      </View>

      {categories.map((category) => {
        const categoryTodos = todos.filter((item) => item.category === category);

        if (categoryTodos.length === 0) return null;

        return (
          <View key={category} style={styles.card}>
            <Text style={styles.cardTitle}>{category}</Text>

            <FlatList
              scrollEnabled={false}
              data={categoryTodos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.todoRow}>
                  <TouchableOpacity
                    style={styles.todoTextArea}
                    onPress={() => toggleTodo(item.id)}
                  >
                    <Text style={[styles.todo, item.done && styles.doneTodo]}>
                      {item.done ? '✅ ' : '⬜️ '}
                      {item.text}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                    <Text style={styles.delete}>❌</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        );
      })}
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
  },
  suggestionRow: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addSmall: {
    color: '#60a5fa',
    fontSize: 28,
    fontWeight: 'bold',
  },
  helpText: {
    color: '#777',
    fontSize: 13,
    marginTop: 4,
  },
  categorySmall: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  rateText: {
    color: '#aaa',
    fontSize: 16,
  },
  categoryTitle: {
    color: '#aaa',
    fontSize: 15,
    marginBottom: 10,
    marginTop: 6,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryButton: {
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedCategoryButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  categoryText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    color: 'white',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  todoTextArea: {
    flex: 1,
  },
  todo: {
    color: 'white',
    fontSize: 20,
  },
  doneTodo: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  delete: {
    color: 'red',
    fontSize: 18,
    marginLeft: 10,
  },
});