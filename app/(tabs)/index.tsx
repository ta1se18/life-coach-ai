import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const MALE_LIFE = 81.09;
const FEMALE_LIFE = 87.13;

export default function HomeScreen() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [likes, setLikes] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [past, setPast] = useState('');
  const [dream, setDream] = useState('');
  const [worry, setWorry] = useState('');

  const life =
    gender.includes('男') ? MALE_LIFE :
    gender.includes('女') ? FEMALE_LIFE :
    84;

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

  const plan = useMemo(() => {
    const text = `${dream} ${worry} ${likes} ${past}`.toLowerCase();

    if (text.includes('起業') || text.includes('事業')) {
      return {
        analysis: 'あなたは「挑戦」「自由」「自分で人生を切り開くこと」を強く求めている可能性があります。',
        short: '短期：営業力・発信力・継続力を鍛える。',
        middle: '中期：市場理解・人脈・小さな収益化を経験する。',
        long: '長期：自分の理想を形にできる事業を持つ。',
        today: ['競合サービスを1つ分析する', '事業アイデアを10分書く', '営業・マーケを学ぶ'],
      };
    }

    if (text.includes('英語') || text.includes('toeic')) {
      return {
        analysis: 'あなたは「成長実感」と「世界を広げること」を大事にしている可能性があります。',
        short: '短期：毎日英語に触れる習慣を作る。',
        middle: '中期：TOEICや英会話で成果を出す。',
        long: '長期：英語を使って選択肢を広げる。',
        today: ['英単語20個', '英語YouTube15分', '30分だけ集中学習'],
      };
    }

    if (text.includes('恋愛') || text.includes('彼女') || text.includes('彼氏')) {
      return {
        analysis: 'あなたは「愛されたい」「人と深く繋がりたい」気持ちが強い可能性があります。',
        short: '短期：清潔感・会話力・自己肯定感を整える。',
        middle: '中期：人との関係構築経験を増やす。',
        long: '長期：安心できるパートナーシップを作る。',
        today: ['外見を整える', '人と会話する', '自信を失う行動を減らす'],
      };
    }

    if (text.includes('不安') || text.includes('焦り')) {
      return {
        analysis: '今は「努力不足」よりも、「方向性不足」で苦しくなっている可能性があります。',
        short: '短期：やることを減らして、1つに絞る。',
        middle: '中期：自分の軸を見つける。',
        long: '長期：迷いが少ない人生設計を作る。',
        today: ['モヤモヤを書き出す', 'やることを1つに絞る', '今日は早めに寝る'],
      };
    }

    return {
      analysis: 'あなたはまだ言語化できていないけど、「このままで終わりたくない」と感じている可能性があります。',
      short: '短期：自己理解を深める。',
      middle: '中期：小さな挑戦を増やす。',
      long: '長期：理想の人生像を見つける。',
      today: ['理想の人生を書き出す', '興味あることを調べる', '小さく1歩進む'],
    };
  }, [dream, worry, likes, past]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>LIFE COARCH AI</Text>
      <Text style={styles.subtitle}>理想の人生と、今日の行動をつなぐAI</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>人生の現在地</Text>

        <TextInput style={styles.input} placeholder="年齢 例：21" placeholderTextColor="#999" value={age} onChangeText={setAge} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="性別 例：男性 / 女性" placeholderTextColor="#999" value={gender} onChangeText={setGender} />

        {remaining && (
          <View style={styles.lifeBox}>
            <Text style={styles.lifeTitle}>残された時間</Text>
            <Text style={styles.lifeMain}>約 {remaining.years} 年</Text>
            <Text style={styles.lifeSub}>約 {remaining.months} ヶ月</Text>
            <Text style={styles.lifeSub}>約 {remaining.weeks} 週間</Text>
            <Text style={styles.lifeSub}>約 {remaining.days} 日</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>AIヒアリング</Text>

        <TextInput style={styles.textarea} placeholder="好き：スポーツ、YouTube、社会貢献、人間観察" placeholderTextColor="#999" value={likes} onChangeText={setLikes} multiline />
        <TextInput style={styles.textarea} placeholder="嫌い：早起き、舐められること、英語、掃除" placeholderTextColor="#999" value={dislikes} onChangeText={setDislikes} multiline />
        <TextInput style={styles.textarea} placeholder="過去：夢中、後悔、大恋愛、人生の転機" placeholderTextColor="#999" value={past} onChangeText={setPast} multiline />
        <TextInput style={styles.textarea} placeholder="夢・なりたい姿：起業、英語、良いパパ、まだ分からない" placeholderTextColor="#999" value={dream} onChangeText={setDream} multiline />
        <TextInput style={styles.textarea} placeholder="今の悩み・モヤモヤ" placeholderTextColor="#999" value={worry} onChangeText={setWorry} multiline />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI分析</Text>
        <Text style={styles.analysis}>{plan.analysis}</Text>

        <Text style={styles.sectionTitle}>短期計画</Text>
        <Text style={styles.resultText}>{plan.short}</Text>

        <Text style={styles.sectionTitle}>中期計画</Text>
        <Text style={styles.resultText}>{plan.middle}</Text>

        <Text style={styles.sectionTitle}>長期計画</Text>
        <Text style={styles.resultText}>{plan.long}</Text>

        <Text style={styles.sectionTitle}>今日の行動</Text>
        {plan.today.map((item, index) => (
          <Text key={index} style={styles.todo}>・{item}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 70, paddingHorizontal: 20 },
  logo: { color: '#111', fontSize: 36, fontWeight: 'bold' },
  subtitle: { color: '#666', fontSize: 15, marginTop: 8, marginBottom: 28 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 18, padding: 18, marginBottom: 20 },
  cardTitle: { color: '#111', fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 12, borderWidth: 1, borderColor: '#ddd', color: '#111' },
  textarea: { backgroundColor: '#fff', borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 12, minHeight: 90, borderWidth: 1, borderColor: '#ddd', color: '#111' },
  lifeBox: { backgroundColor: '#111', borderRadius: 18, padding: 18, marginTop: 8 },
  lifeTitle: { color: '#aaa', fontSize: 15 },
  lifeMain: { color: '#fff', fontSize: 38, fontWeight: 'bold', marginTop: 8 },
  lifeSub: { color: '#ddd', fontSize: 17, marginTop: 6 },
  analysis: { color: '#111', fontSize: 18, lineHeight: 30, marginBottom: 20 },
  sectionTitle: { color: '#111', fontSize: 18, fontWeight: 'bold', marginTop: 14, marginBottom: 8 },
  resultText: { color: '#333', fontSize: 16, lineHeight: 26 },
  todo: { color: '#111', fontSize: 16, lineHeight: 28 },
});