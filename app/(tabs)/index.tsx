import React, { useMemo, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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
  const [worry, setWorry] = useState('');
  const [deepAnswer, setDeepAnswer] = useState('');
  const [deepStep, setDeepStep] = useState(0);

  const [shortTerm, setShortTerm] = useState('');
  const [middleTerm, setMiddleTerm] = useState('');
  const [longTerm, setLongTerm] = useState('');

  const life =
    gender === 'male'
      ? MALE_LIFE
      : gender === 'female'
      ? FEMALE_LIFE
      : 84;

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
    '最近、何にモヤモヤしてる？',
    '本当はどんな人生にしたい？',
    'それを望む理由は？',
    'このままだと一番嫌な未来は？',
    '今日できる最小の一歩は？',
  ];

  const currentQuestion =
    deepQuestions[Math.min(deepStep, deepQuestions.length - 1)];

  const generatedPlan = useMemo(() => {
    const text = `${dream} ${worry}`.toLowerCase();

    if (text.includes('起業') || text.includes('事業')) {
      return {
        analysis:
          'あなたは「挑戦」「自由」「自分で人生を切り開くこと」を強く求めている可能性があります。',
        short: 'まずは営業力・発信力・継続力を鍛える。',
        middle: '市場理解・人脈・小さな収益化を経験する。',
        long: '自分の理想を形にできる事業を持つ。',
        today: [
          '競合サービスを1つ分析する',
          '事業アイデアを10分書く',
          '営業・マーケについて学ぶ',
        ],
      };
    }

    if (text.includes('英語') || text.includes('toeic')) {
      return {
        analysis:
          'あなたは「成長実感」と「世界を広げること」を大事にしている可能性があります。',
        short: '毎日英語に触れる習慣を作る。',
        middle: 'TOEICや英会話で成果を出す。',
        long: '英語を使って世界を広げる。',
        today: [
          '英単語20個',
          '英語YouTube15分',
          '30分だけ集中学習',
        ],
      };
    }

    if (text.includes('筋トレ') || text.includes('健康')) {
      return {
        analysis:
          'あなたは「自信」「自己管理」「理想の自分」を求めている可能性があります。',
        short: '睡眠・食事・運動を整える。',
        middle: '継続できる身体習慣を作る。',
        long: '健康で自信のある状態を維持する。',
        today: [
          '筋トレ20分',
          '睡眠7時間',
          '高タンパク食事',
        ],
      };
    }

    if (
      text.includes('恋愛') ||
      text.includes('彼女') ||
      text.includes('彼氏')
    ) {
      return {
        analysis:
          'あなたは「愛されたい」「人と深く繋がりたい」気持ちが強い可能性があります。',
        short: '清潔感・会話力・自己肯定感を整える。',
        middle: '人との関係構築経験を増やす。',
        long: '安心できるパートナーシップを作る。',
        today: [
          '外見を整える',
          '人と会話する',
          '自信を失う行動を減らす',
        ],
      };
    }

    if (text.includes('不安') || text.includes('焦り')) {
      return {
        analysis:
          '今は「努力不足」よりも、「方向性不足」で苦しくなっている可能性があります。',
        short: 'まずはやることを減らす。',
        middle: '自分の軸を見つける。',
        long: '迷いが少ない人生設計を作る。',
        today: [
          'モヤモヤを書き出す',
          'やることを1つに絞る',
          '今日は早めに寝る',
        ],
      };
    }

    return {
      analysis:
        'あなたはまだ言語化できていないけど、「このままで終わりたくない」と感じている可能性があります。',
      short: 'まずは自己理解を深める。',
      middle: '小さな挑戦を増やす。',
      long: '理想の人生像を見つける。',
      today: [
        '理想の人生を書き出す',
        '興味あることを調べる',
        '小さく1歩進む',
      ],
    };
  }, [dream, worry]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>LIFE COARCH AI</Text>

      <Text style={styles.subtitle}>
        理想の人生と、今日の行動をつなぐAI
      </Text>

      {phase === 'input' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>人生の現在地</Text>

          <TextInput
            style={styles.input}
            placeholder="年齢"
            placeholderTextColor="#999"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          <View style={styles.row}>
            <View style={styles.genderButton}>
              <Button
                title={gender === 'male' ? '男性 ✓' : '男性'}
                onPress={() => setGender('male')}
                color={gender === 'male' ? '#2563eb' : '#555'}
              />
            </View>

            <View style={styles.genderButton}>
              <Button
                title={gender === 'female' ? '女性 ✓' : '女性'}
                onPress={() => setGender('female')}
                color={gender === 'female' ? '#2563eb' : '#555'}
              />
            </View>
          </View>

          {remaining && (
            <View style={styles.lifeBox}>
              <Text style={styles.lifeTitle}>残された時間</Text>

              <Text style={styles.lifeMain}>
                約 {remaining.years} 年
              </Text>

              <Text style={styles.lifeSub}>
                約 {remaining.months} ヶ月
              </Text>

              <Text style={styles.lifeSub}>
                約 {remaining.weeks} 週間
              </Text>

              <Text style={styles.lifeSub}>
                約 {remaining.days} 日
              </Text>

              <Text style={styles.note}>
                時間は有限。だから今日を決める。
              </Text>
            </View>
          )}

          <View style={styles.buttonBox}>
            <Button
              title="AIヒアリングへ進む"
              onPress={() => setPhase('hearing')}
              color="#2563eb"
            />
          </View>
        </View>
      )}

      {phase === 'hearing' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AIヒアリング</Text>

          <TextInput
            style={styles.textarea}
            placeholder="好き：スポーツ、YouTube、社会貢献、人間観察"
            placeholderTextColor="#999"
            value={likes}
            onChangeText={setLikes}
            multiline
          />

          <TextInput
            style={styles.textarea}
            placeholder="嫌い：早起き、舐められること、英語、掃除"
            placeholderTextColor="#999"
            value={dislikes}
            onChangeText={setDislikes}
            multiline
          />

          <TextInput
            style={styles.textarea}
            placeholder="過去：夢中、後悔、大恋愛、人生の転機"
            placeholderTextColor="#999"
            value={past}
            onChangeText={setPast}
            multiline
          />

          <TextInput
            style={styles.textarea}
            placeholder="夢・なりたい姿"
            placeholderTextColor="#999"
            value={dream}
            onChangeText={setDream}
            multiline
          />

          <TextInput
            style={styles.textarea}
            placeholder="今の悩み・モヤモヤ"
            placeholderTextColor="#999"
            value={worry}
            onChangeText={setWorry}
            multiline
          />

          <View style={styles.chatBox}>
            <Text style={styles.aiLabel}>AIからの深掘り</Text>

            <Text style={styles.question}>{currentQuestion}</Text>

            <TextInput
              style={styles.textarea}
              placeholder="今の気持ちをそのまま書く"
              placeholderTextColor="#999"
              value={deepAnswer}
              onChangeText={setDeepAnswer}
              multiline
            />

            <View style={styles.buttonBox}>
              <Button
                title="もう少し深掘りする"
                onPress={() => setDeepStep(deepStep + 1)}
                color="#2563eb"
              />
            </View>

            <View style={styles.buttonBox}>
              <Button
                title="ここまでで計画を作る"
                onPress={() => setPhase('plan')}
                color="#111"
              />
            </View>
          </View>
        </View>
      )}

      {phase === 'plan' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>人生計画 ver.1</Text>

          <Text style={styles.analysis}>
            {generatedPlan.analysis}
          </Text>

          <Text style={styles.sectionTitle}>短期計画</Text>

          <TextInput
            style={styles.input}
            placeholder="例：2週間、1ヶ月"
            placeholderTextColor="#999"
            value={shortTerm}
            onChangeText={setShortTerm}
          />

          <Text style={styles.resultText}>
            {generatedPlan.short}
          </Text>

          <Text style={styles.sectionTitle}>中期計画</Text>

          <TextInput
            style={styles.input}
            placeholder="例：6ヶ月、1年"
            placeholderTextColor="#999"
            value={middleTerm}
            onChangeText={setMiddleTerm}
          />

          <Text style={styles.resultText}>
            {generatedPlan.middle}
          </Text>

          <Text style={styles.sectionTitle}>長期計画</Text>

          <TextInput
            style={styles.input}
            placeholder="例：5年、10年"
            placeholderTextColor="#999"
            value={longTerm}
            onChangeText={setLongTerm}
          />

          <Text style={styles.resultText}>
            {generatedPlan.long}
          </Text>

          <Text style={styles.sectionTitle}>今日の行動</Text>

          {generatedPlan.today.map((item, index) => (
            <Text key={index} style={styles.todo}>
              ・{item}
            </Text>
          ))}

          <View style={styles.buttonBox}>
            <Button
              title="もう一度深掘りする"
              onPress={() => setPhase('hearing')}
              color="#2563eb"
            />
          </View>

          <View style={styles.buttonBox}>
            <Button
              title="最初に戻る"
              onPress={() => setPhase('input')}
              color="#555"
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  logo: {
    color: '#111',
    fontSize: 36,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#666',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 28,
  },

  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },

  cardTitle: {
    color: '#111',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#111',
  },

  textarea: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    minHeight: 90,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#111',
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },

  genderButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },

  buttonBox: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },

  lifeBox: {
    backgroundColor: '#111',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },

  lifeTitle: {
    color: '#aaa',
    fontSize: 15,
  },

  lifeMain: {
    color: '#fff',
    fontSize: 38,
    fontWeight: 'bold',
    marginTop: 8,
  },

  lifeSub: {
    color: '#ddd',
    fontSize: 17,
    marginTop: 6,
  },

  note: {
    color: '#aaa',
    marginTop: 12,
    fontSize: 13,
  },

  chatBox: {
    backgroundColor: '#eef4ff',
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },

  aiLabel: {
    color: '#2563eb',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  question: {
    color: '#111',
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  analysis: {
    color: '#111',
    fontSize: 18,
    lineHeight: 30,
    marginBottom: 20,
  },

  sectionTitle: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 8,
  },

  resultText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 26,
  },

  todo: {
    color: '#111',
    fontSize: 16,
    lineHeight: 28,
  },
});