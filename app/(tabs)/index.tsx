import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Tone = 'ai' | 'hot' | 'encourage' | 'sister';

export default function HomeScreen() {
  const [age, setAge] = useState('');
  const [worry, setWorry] = useState('');
  const [dream, setDream] = useState('');
  const [answer, setAnswer] = useState('');

  const [tone, setTone] = useState<Tone>('ai');

  const [step, setStep] = useState(0);

  const lifeDays = useMemo(() => {
    if (!age) return null;

    const currentAge = Number(age);

    if (isNaN(currentAge)) return null;

    const remaining = Math.max(84 - currentAge, 0);

    return Math.floor(remaining * 365);
  }, [age]);

  const questions = [
    '最近、何にモヤモヤしてる？',
    'それって、「認められたい」「自由が欲しい」「勝ちたい」のどれに近い？',
    '理想の人生って、どんな状態？',
    '逆に、絶対になりたくない人生は？',
    '今の自分に一番足りないものは何だと思う？',
  ];

  const currentQuestion =
    questions[Math.min(step, questions.length - 1)];

  const coachMessage = useMemo(() => {
    if (tone === 'hot') {
      return '止まるな。理想の人生は、今日の小さな行動でしか変わらない。';
    }

    if (tone === 'encourage') {
      return '焦らなくていい。でも、自分の人生から逃げないで。';
    }

    if (tone === 'sister') {
      return 'ちゃんと向き合ってて偉い。でも考えるだけじゃ変わらないよ？';
    }

    return '価値観分析を開始します。人生の方向性を探索中。';
  }, [tone]);

  const generatedAction = useMemo(() => {
    if (dream.includes('起業')) {
      return [
        '・競合サービスを1つ調べる',
        '・今日10分だけ事業アイデアを書く',
        '・営業について学ぶ',
      ];
    }

    if (dream.includes('英語')) {
      return [
        '・英単語20個',
        '・YouTubeを英語で見る',
        '・30分だけ学習する',
      ];
    }

    return [
      '・今日のモヤモヤを言語化する',
      '・理想の人生を10分考える',
      '・小さくても1歩進む',
    ];
  }, [dream]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>LIFE COARCH AI</Text>

      <Text style={styles.subtitle}>
        理想の人生と、今日の行動をつなぐ。
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          人生の残り時間
        </Text>

        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="年齢を入力"
          placeholderTextColor="#666"
          keyboardType="numeric"
          style={styles.input}
        />

        {lifeDays && (
          <>
            <Text style={styles.lifeMain}>
              あと {lifeDays.toLocaleString()} 日
            </Text>

            <Text style={styles.lifeSub}>
              時間は有限。だから今日を決める。
            </Text>
          </>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          AI人格
        </Text>

        <View style={styles.toneWrap}>
          {[
            ['ai', 'AIっぽさ全開'],
            ['hot', '熱血'],
            ['encourage', '励まし'],
            ['sister', 'お姉さん'],
          ].map(([value, label]) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.toneButton,
                tone === value && styles.selectedTone,
              ]}
              onPress={() => setTone(value as Tone)}
            >
              <Text
                style={[
                  styles.toneText,
                  tone === value && styles.selectedToneText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.coachMessage}>
          {coachMessage}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          AIヒアリング
        </Text>

        <TextInput
          value={worry}
          onChangeText={setWorry}
          placeholder="今の悩み・モヤモヤ"
          placeholderTextColor="#666"
          multiline
          style={styles.textarea}
        />

        <TextInput
          value={dream}
          onChangeText={setDream}
          placeholder="理想の人生・夢（曖昧でもOK）"
          placeholderTextColor="#666"
          multiline
          style={styles.textarea}
        />
      </View>

      <View style={styles.chatBox}>
        <Text style={styles.aiName}>
          AI COARCH
        </Text>

        <Text style={styles.question}>
          {currentQuestion}
        </Text>

        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder="今の気持ちをそのまま書く"
          placeholderTextColor="#666"
          multiline
          style={styles.textarea}
        />

        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => setStep(step + 1)}
        >
          <Text style={styles.mainButtonText}>
            深掘りする
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.planBox}>
        <Text style={styles.cardTitle}>
          今日の行動提案
        </Text>

        <Text style={styles.planText}>
          AI分析結果：
        </Text>

        <Text style={styles.analysis}>
          あなたは、
          「もっと成長したい」
          「今のままで終わりたくない」
          気持ちが強い。
        </Text>

        <Text style={styles.planText}>
          今日やるべきこと
        </Text>

        {generatedAction.map((item, index) => (
          <Text key={index} style={styles.todo}>
            {item}
          </Text>
        ))}

        <Text style={styles.lastMessage}>
          人生は、今日の積み上げでしか変わらない。
        </Text>
      </View>
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

  logo: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#888',
    marginTop: 8,
    marginBottom: 28,
    fontSize: 15,
  },

  card: {
    backgroundColor: '#111',
    borderRadius: 18,
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
    fontSize: 16,
  },

  textarea: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: 14,
    borderRadius: 12,
    minHeight: 90,
    marginBottom: 14,
    fontSize: 16,
  },

  lifeMain: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 18,
  },

  lifeSub: {
    color: '#888',
    marginTop: 10,
    fontSize: 14,
  },

  toneWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  toneButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  selectedTone: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },

  toneText: {
    color: '#999',
    fontWeight: 'bold',
  },

  selectedToneText: {
    color: 'white',
  },

  coachMessage: {
    color: '#60a5fa',
    marginTop: 16,
    lineHeight: 24,
  },

  chatBox: {
    backgroundColor: '#0b1220',
    borderWidth: 1,
    borderColor: '#1d4ed8',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  aiName: {
    color: '#60a5fa',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  question: {
    color: 'white',
    fontSize: 24,
    lineHeight: 36,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  mainButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  mainButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  planBox: {
    backgroundColor: '#111',
    borderRadius: 18,
    padding: 18,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#333',
  },

  planText: {
    color: '#999',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
  },

  analysis: {
    color: 'white',
    lineHeight: 30,
    fontSize: 18,
    marginBottom: 18,
  },

  todo: {
    color: '#60a5fa',
    fontSize: 18,
    marginBottom: 12,
  },

  lastMessage: {
    color: '#888',
    marginTop: 20,
    lineHeight: 24,
  },
});