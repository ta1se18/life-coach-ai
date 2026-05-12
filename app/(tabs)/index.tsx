import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Gender = 'male' | 'female' | '';
type AiTone = 'ai' | 'hot' | 'encourage' | 'sister';

const STORAGE_KEY = 'life_coach_ai_original_v1';

const MALE_LIFE_EXPECTANCY = 81.09;
const FEMALE_LIFE_EXPECTANCY = 87.13;

export default function HomeScreen() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('');
  const [status, setStatus] = useState('');

  const [aiTone, setAiTone] = useState<AiTone>('ai');

  const [likes, setLikes] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [dream, setDream] = useState('');
  const [past, setPast] = useState('');

  const [deepLevel, setDeepLevel] = useState(0);
  const [deepAnswer, setDeepAnswer] = useState('');
  const [deepHistory, setDeepHistory] = useState<string[]>([]);
  const [showPlan, setShowPlan] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setAge(data.age || '');
      setGender(data.gender || '');
      setStatus(data.status || '');
      setAiTone(data.aiTone || 'ai');
      setLikes(data.likes || '');
      setDislikes(data.dislikes || '');
      setDream(data.dream || '');
      setPast(data.past || '');
      setDeepLevel(data.deepLevel || 0);
      setDeepAnswer(data.deepAnswer || '');
      setDeepHistory(data.deepHistory || []);
      setShowPlan(data.showPlan || false);
    }
  }, []);

  useEffect(() => {
    const data = {
      age,
      gender,
      status,
      aiTone,
      likes,
      dislikes,
      dream,
      past,
      deepLevel,
      deepAnswer,
      deepHistory,
      showPlan,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [
    age,
    gender,
    status,
    aiTone,
    likes,
    dislikes,
    dream,
    past,
    deepLevel,
    deepAnswer,
    deepHistory,
    showPlan,
  ]);

  const lifeExpectancy =
    gender === 'male'
      ? MALE_LIFE_EXPECTANCY
      : gender === 'female'
      ? FEMALE_LIFE_EXPECTANCY
      : 84;

  const currentAge = Number(age);
  const remainingYears =
    currentAge > 0 ? Math.max(lifeExpectancy - currentAge, 0) : 0;

  const remainingMonths = Math.floor(remainingYears * 12);
  const remainingWeeks = Math.floor(remainingYears * 52);
  const remainingDays = Math.floor(remainingYears * 365);

  const questions = [
    '最近、何にモヤモヤしてる？まだ言葉になってなくてもいい。',
    '本当はどんな人生にしたい？夢がなくても、「こうはなりたくない」でもいい。',
    'それを望む理由は何？なぜ自分にとって大事？',
    'このままだと一番嫌な未来は何？',
    '過去の経験で、今の自分を作っている出来事は何？',
    '今の自分のボトルネックは何？時間、体力、能力、環境、人間関係、メンタルのどれが近い？',
    '今日、現実的にできる最小の一歩は何？',
  ];

  const currentQuestion = questions[Math.min(deepLevel, questions.length - 1)];

  const saveDeepAnswerAndGoNext = () => {
    if (deepAnswer.trim()) {
      setDeepHistory([...deepHistory, deepAnswer.trim()]);
      setDeepAnswer('');
    }

    setDeepLevel(deepLevel + 1);
    setShowPlan(false);
  };

  const makePlanNow = () => {
    if (deepAnswer.trim()) {
      setDeepHistory([...deepHistory, deepAnswer.trim()]);
      setDeepAnswer('');
    }

    setShowPlan(true);
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);

    setAge('');
    setGender('');
    setStatus('');
    setAiTone('ai');
    setLikes('');
    setDislikes('');
    setDream('');
    setPast('');
    setDeepLevel(0);
    setDeepAnswer('');
    setDeepHistory([]);
    setShowPlan(false);
  };

  const getCoachMessage = () => {
    if (aiTone === 'hot') {
      return '甘えるな。理想の人生は、今日の一歩でしか変わらない。小さくてもいいから、今すぐ動け。';
    }

    if (aiTone === 'encourage') {
      return '大丈夫。まだ完璧じゃなくていい。今の自分と向き合えている時点で、もう前に進んでる。';
    }

    if (aiTone === 'sister') {
      return 'ちゃんと考えてて偉いよ。でも考えるだけで終わらせないでね。今日は小さく一個だけ動こ。';
    }

    return 'データを分析中。あなたの価値観、過去経験、欲望、制約条件から、今日の最適行動を生成します。';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>LIFE COACH AI</Text>

      <Text style={styles.subtitle}>
        理想の人生と、今日の行動をつなぐ。
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>人生の現在地</Text>

        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="例：22"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
        />

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.selectButton, gender === 'male' && styles.selected]}
            onPress={() => setGender('male')}
          >
            <Text
              style={[
                styles.selectText,
                gender === 'male' && styles.selectedText,
              ]}
            >
              男性
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.selectButton, gender === 'female' && styles.selected]}
            onPress={() => setGender('female')}
          >
            <Text
              style={[
                styles.selectText,
                gender === 'female' && styles.selectedText,
              ]}
            >
              女性
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          value={status}
          onChangeText={setStatus}
          placeholder="例：大学生、社会人、高校生"
          placeholderTextColor="#777"
          style={styles.input}
        />
      </View>

      {currentAge > 0 && gender !== '' && (
        <View style={styles.lifeBox}>
          <Text style={styles.lifeLabel}>残された時間</Text>
          <Text style={styles.lifeMain}>約 {remainingYears.toFixed(1)} 年</Text>
          <Text style={styles.lifeSub}>約 {remainingMonths} ヶ月</Text>
          <Text style={styles.lifeSub}>約 {remainingWeeks} 週間</Text>
          <Text style={styles.lifeSub}>約 {remainingDays} 日</Text>
          <Text style={styles.lifeNote}>
            時間は有限。だから今日の行動を決める。
          </Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>AIの話し方</Text>

        <View style={styles.toneGrid}>
          {[
            ['ai', 'AIっぽさ全開系'],
            ['hot', '熱血タイプ'],
            ['encourage', '励まし系'],
            ['sister', 'お姉さん系'],
          ].map(([value, label]) => (
            <TouchableOpacity
              key={value}
              style={[styles.toneButton, aiTone === value && styles.selected]}
              onPress={() => setAiTone(value as AiTone)}
            >
              <Text
                style={[
                  styles.toneText,
                  aiTone === value && styles.selectedText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>自己理解ヒアリング</Text>

        <TextInput
          value={likes}
          onChangeText={setLikes}
          placeholder="例：スポーツ、YouTube、社会貢献、食べ歩き、人間観察"
          placeholderTextColor="#777"
          multiline
          style={styles.textarea}
        />

        <TextInput
          value={dislikes}
          onChangeText={setDislikes}
          placeholder="例：早起き、舐められること、英語、掃除"
          placeholderTextColor="#777"
          multiline
          style={styles.textarea}
        />

        <TextInput
          value={dream}
          onChangeText={setDream}
          placeholder="例：起業、大谷翔平みたいになりたい、良いパパになりたい、まだ分からない"
          placeholderTextColor="#777"
          multiline
          style={styles.textarea}
        />

        <TextInput
          value={past}
          onChangeText={setPast}
          placeholder="例：夢中、後悔、大恋愛、人生の転機、学校行事、大喧嘩、感動"
          placeholderTextColor="#777"
          multiline
          style={styles.textarea}
        />
      </View>

      <View style={styles.chatBox}>
        <Text style={styles.aiName}>AIコーチ</Text>
        <Text style={styles.question}>{currentQuestion}</Text>

        <TextInput
          value={deepAnswer}
          onChangeText={setDeepAnswer}
          placeholder="今思っていることをそのまま書く"
          placeholderTextColor="#777"
          multiline
          style={styles.textarea}
        />

        <TouchableOpacity style={styles.button} onPress={saveDeepAnswerAndGoNext}>
          <Text style={styles.buttonText}>もう少し深掘りする</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.subButton} onPress={makePlanNow}>
          <Text style={styles.subButtonText}>ここまでで計画を作る</Text>
        </TouchableOpacity>
      </View>

      {deepHistory.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>深掘り履歴</Text>
          {deepHistory.map((item, index) => (
            <Text key={index} style={styles.history}>
              {index + 1}. {item}
            </Text>
          ))}
        </View>
      )}

      {showPlan && (
        <View style={styles.planBox}>
          <Text style={styles.cardTitle}>人生計画 ver.1</Text>

          <Text style={styles.sectionTitle}>長期の方向性</Text>
          <Text style={styles.resultText}>
            {dream.trim()
              ? `「${dream}」に近づく人生設計をする。`
              : '夢がまだ明確でないため、「自分が本当に望む人生を見つけること」を長期目標にする。'}
          </Text>

          <Text style={styles.sectionTitle}>中期で整えること</Text>
          <Text style={styles.resultText}>
            ・好きなこと「{likes || '未入力'}」を行動に変える{'\n'}
            ・嫌いなこと「{dislikes || '未入力'}」を避ける設計をする{'\n'}
            ・過去経験「{past || '未入力'}」から、自分の軸を見つける
          </Text>

          <Text style={styles.sectionTitle}>短期でやること</Text>
          <Text style={styles.resultText}>
            ・今日10分だけ、理想の人生について書く{'\n'}
            ・今のモヤモヤを1つ言語化する{'\n'}
            ・明日も続けられる最小行動を決める
          </Text>

          <Text style={styles.sectionTitle}>今日の一歩</Text>
          <Text style={styles.resultText}>
            1. 深掘りで出た言葉を1つ選ぶ{'\n'}
            2. それに関係する小さな行動を1つやる{'\n'}
            3. 夜に「できた/できなかった理由」を1行で記録する
          </Text>

          <Text style={styles.sectionTitle}>相棒からの一言</Text>
          <Text style={styles.resultText}>{getCoachMessage()}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
        <Text style={styles.resetText}>すべてリセット</Text>
      </TouchableOpacity>
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
    fontSize: 15,
    marginTop: 8,
    marginBottom: 28,
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
    marginBottom: 12,
    fontSize: 16,
  },
  textarea: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    minHeight: 74,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  selectButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    padding: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectText: {
    color: '#aaa',
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  selectedText: {
    color: 'white',
  },
  lifeBox: {
    backgroundColor: '#111',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  lifeLabel: {
    color: '#aaa',
    fontSize: 15,
    marginBottom: 8,
  },
  lifeMain: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  lifeSub: {
    color: '#ccc',
    fontSize: 17,
    marginTop: 6,
  },
  lifeNote: {
    color: '#777',
    fontSize: 13,
    marginTop: 14,
  },
  toneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  toneButton: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  toneText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 13,
  },
  chatBox: {
    backgroundColor: '#0b1220',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1d4ed8',
  },
  aiName: {
    color: '#60a5fa',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  question: {
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subButton: {
    borderWidth: 1,
    borderColor: '#60a5fa',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  subButtonText: {
    color: '#60a5fa',
    fontWeight: 'bold',
  },
  history: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 8,
  },
  planBox: {
    backgroundColor: '#111',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
  },
  resultText: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 24,
  },
  resetButton: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 40,
  },
  resetText: {
    color: '#777',
  },
});