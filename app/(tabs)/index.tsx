import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const MALE_LIFE = 81.09;
const FEMALE_LIFE = 87.13;

export default function HomeScreen() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [aiType, setAiType] = useState('');

  const [likes, setLikes] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [past, setPast] = useState('');
  const [dream, setDream] = useState('');

  const [goalStatus, setGoalStatus] = useState('');
  const [worry, setWorry] = useState('');
  const [shortGoal, setShortGoal] = useState('');
  const [middleGoal, setMiddleGoal] = useState('');
  const [longGoal, setLongGoal] = useState('');

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
    const text = `${dream} ${worry} ${likes} ${past} ${goalStatus}`.toLowerCase();

    if (text.includes('起業') || text.includes('事業')) {
      return {
        analysis: 'あなたは「挑戦」「自由」「自分の力で道を切り開くこと」を重視している可能性があります。',
        short: shortGoal || '短期：1ヶ月以内に、事業アイデアを1つ言語化し、競合を3つ調べる。',
        middle: middleGoal || '中期：6ヶ月以内に、見込み顧客に10人ヒアリングし、小さな収益化を試す。',
        long: longGoal || '長期：3年以内に、自分の理想を形にできる事業を持つ。',
        today: ['競合サービスを1つ分析する', '事業アイデアを10分書く', '誰のどんな課題を解くか考える'],
      };
    }

    if (text.includes('恋愛') || text.includes('彼女') || text.includes('彼氏')) {
      return {
        analysis: 'あなたは「愛されること」「人と深くつながること」「自信」を求めている可能性があります。',
        short: shortGoal || '短期：2週間以内に、外見・清潔感・会話習慣を整える。',
        middle: middleGoal || '中期：3ヶ月以内に、新しい出会いの場を増やし、会話経験を積む。',
        long: longGoal || '長期：1年以内に、安心できる関係性を築ける自分になる。',
        today: ['身だしなみを整える', '1人と丁寧に会話する', '自信を下げる行動を1つ減らす'],
      };
    }

    if (text.includes('筋トレ') || text.includes('健康') || text.includes('痩せ')) {
      return {
        analysis: 'あなたは「自己管理」「理想の身体」「自信」を大事にしている可能性があります。',
        short: shortGoal || '短期：1ヶ月以内に、睡眠・食事・運動の型を作る。',
        middle: middleGoal || '中期：3ヶ月以内に、体型や体力の変化を実感する。',
        long: longGoal || '長期：1年以内に、健康で自信のある状態を維持する。',
        today: ['20分運動する', 'タンパク質を意識して食べる', '睡眠時間を確保する'],
      };
    }

    if (text.includes('不安') || text.includes('焦り') || text.includes('わからない')) {
      return {
        analysis: '今は「努力不足」ではなく、「方向性不足」で苦しくなっている可能性があります。',
        short: shortGoal || '短期：2週間以内に、自分が何に焦っているのかを言語化する。',
        middle: middleGoal || '中期：3ヶ月以内に、興味のある領域を3つ試して比較する。',
        long: longGoal || '長期：1年以内に、自分が納得できる方向性を見つける。',
        today: ['モヤモヤを書き出す', 'やることを1つに絞る', '今日は小さく1歩だけ進む'],
      };
    }

    return {
      analysis: 'あなたはまだ言語化しきれていないけれど、「このままで終わりたくない」という感覚を持っている可能性があります。',
      short: shortGoal || '短期：2週間以内に、好き・嫌い・過去経験を整理する。',
      middle: middleGoal || '中期：3ヶ月以内に、小さな挑戦を3つ試す。',
      long: longGoal || '長期：1年以内に、自分が本当に目指したい方向性を見つける。',
      today: ['理想の人生を10分書く', '興味あることを1つ調べる', '小さく1歩進む'],
    };
  }, [dream, worry, likes, past, goalStatus, shortGoal, middleGoal, longGoal]);

  const aiMessage = useMemo(() => {
    if (aiType.includes('熱血')) return '甘えるな。今日の一歩が未来を変える。小さくても動け。';
    if (aiType.includes('励まし')) return '大丈夫。完璧じゃなくていい。今向き合えている時点で前に進んでる。';
    if (aiType.includes('お姉')) return 'ちゃんと考えてて偉いよ。でも考えるだけで終わらせないでね。';
    return 'あなたの価値観・過去経験・目標から、今日の最適行動を整理します。';
  }, [aiType]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>LIFE COARCH AI</Text>
      <Text style={styles.subtitle}>理想の人生と、今日の行動をつなぐAI</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>人生の現在地</Text>

        <TextInput style={styles.input} placeholder="年齢 例：21" placeholderTextColor="#999" value={age} onChangeText={setAge} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="性別 例：男性 / 女性 / 未入力でもOK" placeholderTextColor="#999" value={gender} onChangeText={setGender} />

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
        <Text style={styles.cardTitle}>AIタイプ</Text>
        <TextInput style={styles.input} placeholder="例：熱血 / 励まし / お姉さん / AIっぽく" placeholderTextColor="#999" value={aiType} onChangeText={setAiType} />
        <Text style={styles.analysis}>{aiMessage}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>AIヒアリング① 自己理解</Text>

        <TextInput style={styles.textarea} placeholder="好き：時間を忘れること、自然に続くこと、憧れる人" placeholderTextColor="#999" value={likes} onChangeText={setLikes} multiline />
        <TextInput style={styles.textarea} placeholder="嫌い：避けたい環境、苦手な時間、絶対になりたくない姿" placeholderTextColor="#999" value={dislikes} onChangeText={setDislikes} multiline />
        <TextInput style={styles.textarea} placeholder="過去の経験：悔しかった経験、嬉しかった経験、人生の転機" placeholderTextColor="#999" value={past} onChangeText={setPast} multiline />
        <TextInput style={styles.textarea} placeholder="なりたい姿：起業、良い父親、影響力ある人、自由に生きる、まだ分からない" placeholderTextColor="#999" value={dream} onChangeText={setDream} multiline />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>AIヒアリング② 人生設計</Text>

        <TextInput style={styles.textarea} placeholder="目標の状態：既にある / 方向性すら分からない / やりたいことが多すぎる" placeholderTextColor="#999" value={goalStatus} onChangeText={setGoalStatus} multiline />
        <TextInput style={styles.textarea} placeholder="今の悩み：何を優先すべきか分からない、焦り、不安、行動が分散する" placeholderTextColor="#999" value={worry} onChangeText={setWorry} multiline />

        <Text style={styles.sectionTitle}>既に目標がある人は入力</Text>
        <TextInput style={styles.input} placeholder="短期目標 例：1ヶ月で〇〇する" placeholderTextColor="#999" value={shortGoal} onChangeText={setShortGoal} />
        <TextInput style={styles.input} placeholder="中期目標 例：6ヶ月で〇〇する" placeholderTextColor="#999" value={middleGoal} onChangeText={setMiddleGoal} />
        <TextInput style={styles.input} placeholder="長期目標 例：3年で〇〇する" placeholderTextColor="#999" value={longGoal} onChangeText={setLongGoal} />
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
  analysis: { color: '#111', fontSize: 17, lineHeight: 28, marginBottom: 12 },
  sectionTitle: { color: '#111', fontSize: 18, fontWeight: 'bold', marginTop: 14, marginBottom: 8 },
  resultText: { color: '#333', fontSize: 16, lineHeight: 26 },
  todo: { color: '#111', fontSize: 16, lineHeight: 28 },
});