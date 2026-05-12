import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Gender = 'male' | 'female' | '';
type Phase = 'input' | 'hearing' | 'plan';

const MALE_LIFE = 81.09;
const FEMALE_LIFE = 87.13;

export default function HomeScreen() {
  const [phase, setPhase] = useState<Phase>('input');

  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('');

  const [likes, setLikes] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [past, setPast] = useState('');
  const [dream, setDream] = useState('');

  const [bigQuestion, setBigQuestion] = useState('');
  const [deepAnswer, setDeepAnswer] = useState('');
  const [deepStep, setDeepStep] = useState(0);

  const [shortTerm, setShortTerm] = useState('');
  const [middleTerm, setMiddleTerm] = useState('');
  const [longTerm, setLongTerm] = useState('');

  const life = gender === 'male' ? MALE_LIFE : gender === 'female' ? FEMALE_LIFE : 84;
  const currentAge = Number(age);

  const remaining = useMemo(() => {
    if (!currentAge) return null;
    const years = Math.max(life - currentAge, 0);
    return {
      years: years.toFixed(1),
      months: Math.floor(years * 12),
      weeks: Math.floor(years * 52),
      days: Math.floor(years * 365),
    };
  }, [currentAge, life]);

  const deepQuestions = [
    '本当に成し遂げたいことは何？まだ言語化できなくてもいい。',
    'それを成し遂げたい理由は？なぜ自分にとって大事？',
    '逆に、このままだと一番嫌な未来は何？',
    '今の自分を止めている一番の原因は何？',
    '今日できる最小の一歩は何？',
  ];

  const currentQuestion = deepQuestions[Math.min(deepStep, deepQuestions.length - 1)];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>LIFE COARCH AI</Text>
      <Text style={styles.subtitle}>
        成し遂げたいことと、今日の行動をつなぐAI
      </Text>

      {phase === 'input' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>まず、人生の現在地</Text>

          <TextInput
            style={styles.input}
            placeholder="例：22"
            placeholderTextColor="#999"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.choice, gender === 'male' && styles.selected]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.choiceText, gender === 'male' && styles.selectedText]}>男性</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.choice, gender === 'female' && styles.selected]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.choiceText, gender === 'female' && styles.selectedText]}>女性</Text>
            </TouchableOpacity>
          </View>

          {remaining && (
            <View style={styles.lifeBox}>
              <Text style={styles.lifeTitle}>残された時間</Text>
              <Text style={styles.lifeMain}>約 {remaining.years} 年</Text>
              <Text style={styles.lifeSub}>約 {remaining.months} ヶ月</Text>
              <Text style={styles.lifeSub}>約 {remaining.weeks} 週間</Text>
              <Text style={styles.lifeSub}>約 {remaining.days} 日</Text>
              <Text style={styles.note}>時間は有限。だから今日の行動を決める。</Text>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={() => setPhase('hearing')}>
            <Text style={styles.buttonText}>AIヒアリングへ進む</Text>
          </TouchableOpacity>
        </View>
      )}

      {phase === 'hearing' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AIヒアリング</Text>

          <TextInput
            style={styles.textarea}
            placeholder="例：スポーツ、YouTube、社会貢献、食べ歩き、人間観察"
            placeholderTextColor="#999"
            value={likes}
            onChangeText={setLikes}
            multiline
          />

          <TextInput
            style={styles.textarea}
            placeholder="例：早起き、舐められること、英語、掃除"
            placeholderTextColor="#999"
            value={dislikes}
            onChangeText={setDislikes}
            multiline
          />

          <TextInput
            style={styles.textarea}
            placeholder="例：夢中、後悔、大恋愛、人生の転機、学校行事、大喧嘩、感動"
            placeholderTextColor="#999"
            value={past}
            onChangeText={setPast}
            multiline
          />

          <TextInput
            style={styles.textarea}
            placeholder="例：起業、大谷翔平みたいになりたい、良いパパになりたい、まだ分からない"
            placeholderTextColor="#999"
            value={dream}
            onChangeText={setDream}
            multiline
          />

          <Text style={styles.sectionTitle}>大きな問い</Text>
          <TextInput
            style={styles.textarea}
            placeholder="例：成し遂げたい欲はあるけど、方向性が分からない"
            placeholderTextColor="#999"
            value={bigQuestion}
            onChangeText={setBigQuestion}
            multiline
          />

          <View style={styles.chatBox}>
            <Text style={styles.aiLabel}>AIからの深掘り</Text>
            <Text style={styles.question}>{currentQuestion}</Text>

            <TextInput
              style={styles.textarea}
              placeholder="今思っていることをそのまま書く"
              placeholderTextColor="#999"
              value={deepAnswer}
              onChangeText={setDeepAnswer}
              multiline
            />

            <TouchableOpacity style={styles.button} onPress={() => setDeepStep(deepStep + 1)}>
              <Text style={styles.buttonText}>もう少し深掘りする</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.subButton} onPress={() => setPhase('plan')}>
              <Text style={styles.subButtonText}>ここまでで一度計画を作る</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {phase === 'plan' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>人生計画 ver.1</Text>

          <Text style={styles.sectionTitle}>短期計画</Text>
          <TextInput
            style={styles.input}
            placeholder="例：2週間、1ヶ月、3ヶ月"
            placeholderTextColor="#999"
            value={shortTerm}
            onChangeText={setShortTerm}
          />
          <Text style={styles.resultText}>
            まずは迷いを減らすために、今日できる行動を1つに絞る。
          </Text>

          <Text style={styles.sectionTitle}>中期計画</Text>
          <TextInput
            style={styles.input}
            placeholder="例：6ヶ月、1年、3年"
            placeholderTextColor="#999"
            value={middleTerm}
            onChangeText={setMiddleTerm}
          />
          <Text style={styles.resultText}>
            好き・嫌い・過去経験から、自分の勝ち筋を見つける。
          </Text>

          <Text style={styles.sectionTitle}>長期計画</Text>
          <TextInput
            style={styles.input}
            placeholder="例：5年、10年、人生全体"
            placeholderTextColor="#999"
            value={longTerm}
            onChangeText={setLongTerm}
          />
          <Text style={styles.resultText}>
            {dream ? `「${dream}」に近づく人生設計をする。` : '夢がまだ曖昧なら、夢を見つけること自体を長期目標にする。'}
          </Text>

          <Text style={styles.sectionTitle}>今日の一歩</Text>
          <Text style={styles.todo}>1. 今のモヤモヤを10分書き出す</Text>
          <Text style={styles.todo}>2. 理想に近づく小さな行動を1つやる</Text>
          <Text style={styles.todo}>3. 夜に「できた/できなかった理由」を1行で記録する</Text>

          <TouchableOpacity style={styles.subButton} onPress={() => setPhase('hearing')}>
            <Text style={styles.subButtonText}>もう一度深掘りする</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 70, paddingHorizontal: 20 },
  logo: { color: '#111', fontSize: 36, fontWeight: 'bold' },
  subtitle: { color: '#555', fontSize: 15, marginTop: 8, marginBottom: 28 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 18, padding: 18, marginBottom: 20 },
  cardTitle: { color: '#111', fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { backgroundColor: '#fff', color: '#111', padding: 14, borderRadius: 12, marginBottom: 12, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  textarea: { backgroundColor: '#fff', color: '#111', padding: 14, borderRadius: 12, marginBottom: 12, fontSize: 16, minHeight: 90, borderWidth: 1, borderColor: '#ddd' },
  row: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  choice: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  choiceText: { color: '#111', fontWeight: 'bold' },
  selected: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  selectedText: { color: '#fff' },
  lifeBox: { backgroundColor: '#111', borderRadius: 18, padding: 18, marginBottom: 18 },
  lifeTitle: { color: '#aaa', fontSize: 15 },
  lifeMain: { color: '#fff', fontSize: 38, fontWeight: 'bold', marginTop: 8 },
  lifeSub: { color: '#ddd', fontSize: 17, marginTop: 6 },
  note: { color: '#aaa', fontSize: 13, marginTop: 12 },
  button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  subButton: { borderWidth: 1, borderColor: '#2563eb', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  subButtonText: { color: '#2563eb', fontWeight: 'bold' },
  sectionTitle: { color: '#111', fontSize: 18, fontWeight: 'bold', marginTop: 14, marginBottom: 8 },
  chatBox: { backgroundColor: '#eef4ff', borderRadius: 18, padding: 18, marginTop: 10, borderWidth: 1, borderColor: '#bfdbfe' },
  aiLabel: { color: '#2563eb', fontWeight: 'bold', marginBottom: 8 },
  question: { color: '#111', fontSize: 22, lineHeight: 32, fontWeight: 'bold', marginBottom: 16 },
  resultText: { color: '#333', fontSize: 16, lineHeight: 26, marginBottom: 10 },
  todo: { color: '#111', fontSize: 16, lineHeight: 28 },
});