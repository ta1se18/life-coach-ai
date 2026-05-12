import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const STORAGE_KEY = 'life_coach_ai_v7';

const MALE_LIFE_EXPECTANCY = 81.09;
const FEMALE_LIFE_EXPECTANCY = 87.13;

type AiTone = 'template' | 'hot' | 'encourage' | 'sister';

export default function HomeScreen() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [status, setStatus] = useState('');

  const [todayFreeTime, setTodayFreeTime] = useState('');
  const [todayCondition, setTodayCondition] = useState('');
  const [todayMood, setTodayMood] = useState('');
  const [yesterdayResult, setYesterdayResult] = useState('');

  const [likes, setLikes] = useState('');
  const [dislikes, setDislikes] = useState('');
  const [dream, setDream] = useState('');
  const [past, setPast] = useState('');

  const [shortTermPeriod, setShortTermPeriod] = useState('');
  const [middleTermPeriod, setMiddleTermPeriod] = useState('');
  const [longTermPeriod, setLongTermPeriod] = useState('');
  const [goalPeriodReason, setGoalPeriodReason] = useState('');

  const [aiTone, setAiTone] = useState<AiTone>('template');

  const [deepLevel, setDeepLevel] = useState(0);
  const [deepAnswer, setDeepAnswer] = useState('');
  const [deepHistory, setDeepHistory] = useState<string[]>([]);
  const [showPlan, setShowPlan] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [
    age,
    gender,
    status,
    todayFreeTime,
    todayCondition,
    todayMood,
    yesterdayResult,
    likes,
    dislikes,
    dream,
    past,
    shortTermPeriod,
    middleTermPeriod,
    longTermPeriod,
    goalPeriodReason,
    aiTone,
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

  const getCurrentQuestion = () => {
    const questions = [
      '本当に叶えたいことは何ですか？まだ夢がない場合は、「何者かになりたい」「今のままは嫌」でも大丈夫です。',
      'それを叶えたい理由は何ですか？',
      '逆に、このままだと何が一番嫌ですか？',
      '今の自分にとって、一番のボトルネックは何だと思いますか？',
      '今日使える時間の中で、どんな小さい行動なら現実的にできますか？',
    ];

    return questions[Math.min(deepLevel, questions.length - 1)];
  };

  const getToneMessage = () => {
    if (aiTone === 'hot') {
      return '甘えるな。理想の人生は、今日の積み上げでしか変わらない。';
    }

    if (aiTone === 'encourage') {
      return '大丈夫。小さい一歩でも、積み重ねれば未来は変わる。';
    }

    if (aiTone === 'sister') {
      return 'ちゃんと向き合えてるの偉いよ。でも考えるだけで終わらせないでね？';
    }

    return '分析完了。あなたの理想と現在地の差分を検出しました。今日の小さな行動が、未来の人生を変化させます。';
  };

  const saveDeepAnswerAndGoNext = () => {
    if (deepAnswer.trim() !== '') {
      setDeepHistory([...deepHistory, deepAnswer]);
      setDeepAnswer('');
    }

    setDeepLevel(deepLevel + 1);
    setShowPlan(false);
  };

  const makePlanNow = () => {
    if (deepAnswer.trim() !== '') {
      setDeepHistory([...deepHistory, deepAnswer]);
      setDeepAnswer('');
    }

    setShowPlan(true);
  };

  const loadData = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    const data = JSON.parse(saved);

    setAge(data.age || '');
    setGender(data.gender || '');
    setStatus(data.status || '');

    setTodayFreeTime(data.todayFreeTime || '');
    setTodayCondition(data.todayCondition || '');
    setTodayMood(data.todayMood || '');
    setYesterdayResult(data.yesterdayResult || '');

    setLikes(data.likes || '');
    setDislikes(data.dislikes || '');
    setDream(data.dream || '');
    setPast(data.past || '');

    setShortTermPeriod(data.shortTermPeriod || '');
    setMiddleTermPeriod(data.middleTermPeriod || '');
    setLongTermPeriod(data.longTermPeriod || '');
    setGoalPeriodReason(data.goalPeriodReason || '');

    setAiTone(data.aiTone || 'template');

    setDeepLevel(data.deepLevel || 0);
    setDeepAnswer(data.deepAnswer || '');
    setDeepHistory(data.deepHistory || []);

    setShowPlan(data.showPlan || false);
  };

  const saveData = async () => {
    const data = {
      age,
      gender,
      status,
      todayFreeTime,
      todayCondition,
      todayMood,
      yesterdayResult,
      likes,
      dislikes,
      dream,
      past,
      shortTermPeriod,
      middleTermPeriod,
      longTermPeriod,
      goalPeriodReason,
      aiTone,
      deepLevel,
      deepAnswer,
      deepHistory,
      showPlan,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const resetData = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);

    setAge('');
    setGender('');
    setStatus('');

    setTodayFreeTime('');
    setTodayCondition('');
    setTodayMood('');
    setYesterdayResult('');

    setLikes('');
    setDislikes('');
    setDream('');
    setPast('');

    setShortTermPeriod('');
    setMiddleTermPeriod('');
    setLongTermPeriod('');
    setGoalPeriodReason('');

    setAiTone('template');

    setDeepLevel(0);
    setDeepAnswer('');
    setDeepHistory([]);

    setShowPlan(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <View style={{ padding: 24, marginTop: 50 }}>
        <Text style={styles.title}>LIFE COACH AI 🔥</Text>

        <Text style={styles.subtitle}>
          理想の人生に向けて、AIと共に行動を設計する。
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>AIの話し方</Text>

          <View style={styles.toneGrid}>
            {[
              ['template', 'AIっぽさ全開系'],
              ['hot', '熱血タイプ'],
              ['encourage', '励まし系'],
              ['sister', 'お姉さん系'],
            ].map(([value, label]) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.toneButton,
                  aiTone === value && styles.selectedButton,
                ]}
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
          <Text style={styles.cardTitle}>人生の現在地</Text>

          <Text style={styles.label}>年齢</Text>

          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="例：22"
            placeholderTextColor="#999"
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.label}>性別</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'male' && styles.selectedButton,
              ]}
              onPress={() => setGender('male')}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === 'male' && styles.selectedText,
                ]}
              >
                男性
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'female' && styles.selectedButton,
              ]}
              onPress={() => setGender('female')}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === 'female' && styles.selectedText,
                ]}
              >
                女性
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>今の立場</Text>

          <TextInput
            value={status}
            onChangeText={setStatus}
            placeholder="例：大学生、社会人、高校生"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        {currentAge > 0 &&　(
          <View style={styles.lifeBox}>
            <Text style={styles.lifeTitle}>残された時間</Text>

            <Text style={styles.lifeText}>
              約 {remainingYears.toFixed(1)} 年
            </Text>

            <Text style={styles.lifeSub}>
              約 {remainingMonths} ヶ月
            </Text>

            <Text style={styles.lifeSub}>
              約 {remainingWeeks} 週間
            </Text>

            <Text style={styles.lifeSub}>
              約 {remainingDays} 日
            </Text>

            <Text style={styles.note}>
              時間は有限。今日の行動が未来を作る。
            </Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>今日の状態</Text>

          <Text style={styles.smallText}>
            朝〜午前中に入力して、今日の行動を決める想定。
          </Text>

          <Text style={styles.label}>今日使える自由時間</Text>

          <TextInput
            value={todayFreeTime}
            onChangeText={setTodayFreeTime}
            placeholder="例：2時間、30分、今日はほぼなし"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Text style={styles.label}>今日の体調</Text>

          <TextInput
            value={todayCondition}
            onChangeText={setTodayCondition}
            placeholder="例：元気、眠い、疲れてる、熱37.5度"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Text style={styles.label}>今日の気分</Text>

          <TextInput
            value={todayMood}
            onChangeText={setTodayMood}
            placeholder="例：やる気MAX、やる気なし、普通、焦り、不安"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Text style={styles.label}>昨日の達成率</Text>

          <TextInput
            value={yesterdayResult}
            onChangeText={setYesterdayResult}
            placeholder="例：0%、30%、50%、80%、100%"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>自己理解ヒアリング</Text>

          <Text style={styles.label}>好きなこと</Text>

          <TextInput
            value={likes}
            onChangeText={setLikes}
            placeholder="例：スポーツ、YouTube、社会貢献、食べ歩き、人間観察"
            placeholderTextColor="#999"
            multiline
            style={styles.inputLarge}
          />

          <Text style={styles.label}>嫌いなこと</Text>

          <TextInput
            value={dislikes}
            onChangeText={setDislikes}
            placeholder="例：早起き、舐められること、英語、掃除"
            placeholderTextColor="#999"
            multiline
            style={styles.inputLarge}
          />

          <Text style={styles.label}>夢・なりたい姿</Text>

          <TextInput
            value={dream}
            onChangeText={setDream}
            placeholder="例：起業、大谷翔平みたいになりたい、良いパパになりたい、まだ分からない"
            placeholderTextColor="#999"
            multiline
            style={styles.inputLarge}
          />

          <Text style={styles.label}>過去の経験</Text>

          <TextInput
            value={past}
            onChangeText={setPast}
            placeholder="例：夢中、後悔、大恋愛、人生の転機、学校行事、大喧嘩、感動"
            placeholderTextColor="#999"
            multiline
            style={styles.inputLarge}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>目標期間</Text>

          <Text style={styles.smallText}>
            短期・中期・長期の期間は、人によって違ってOK。
          </Text>

          <Text style={styles.label}>短期</Text>

          <TextInput
            value={shortTermPeriod}
            onChangeText={setShortTermPeriod}
            placeholder="例：1週間、1ヶ月、3ヶ月、1年"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Text style={styles.label}>中期</Text>

          <TextInput
            value={middleTermPeriod}
            onChangeText={setMiddleTermPeriod}
            placeholder="例：6ヶ月、1年、3年、5年"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Text style={styles.label}>長期</Text>

          <TextInput
            value={longTermPeriod}
            onChangeText={setLongTermPeriod}
            placeholder="例：5年、10年、20年、人生全体"
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Text style={styles.label}>
            期間を決められない場合
          </Text>

          <TextInput
            value={goalPeriodReason}
            onChangeText={setGoalPeriodReason}
            placeholder="決められない場合：AIと対話で決定！"
            placeholderTextColor="#999"
            multiline
            style={styles.inputLarge}
          />
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>
            深掘り質問 {deepLevel + 1}
          </Text>

          <Text style={styles.resultText}>
            {getCurrentQuestion()}
          </Text>

          <Text style={styles.label}>回答</Text>

          <TextInput
            value={deepAnswer}
            onChangeText={setDeepAnswer}
            placeholder="今思っていることをそのまま書く"
            placeholderTextColor="#999"
            multiline
            style={styles.inputLarge}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={saveDeepAnswerAndGoNext}
          >
            <Text style={styles.buttonText}>
              もう少し深掘りする
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.subButton}
            onPress={makePlanNow}
          >
            <Text style={styles.subButtonText}>
              ここまでで計画を作る
            </Text>
          </TouchableOpacity>
        </View>

        {showPlan && (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>
              人生計画 ver.1
            </Text>

            <Text style={styles.sectionTitle}>
              短期目標
            </Text>

            <Text style={styles.resultText}>
              期間：{shortTermPeriod || '未設定'}
              {'\n'}
              今日使える時間「{todayFreeTime || '未入力'}」
              の中で、まず小さく動ける行動を決める。
            </Text>

            <Text style={styles.sectionTitle}>
              中期目標
            </Text>

            <Text style={styles.resultText}>
              期間：{middleTermPeriod || '未設定'}
              {'\n'}
              好きなこと・嫌いなこと・過去経験から、
              自分の方向性を形にする。
            </Text>

            <Text style={styles.sectionTitle}>
              長期目標
            </Text>

            <Text style={styles.resultText}>
              期間：{longTermPeriod || '未設定'}
              {'\n'}
              {dream || '自分の理想を見つける'}
              に近づく人生設計をする。
            </Text>

            <Text style={styles.sectionTitle}>
              今日やるべきこと候補
            </Text>

            <Text style={styles.resultText}>
              1. 理想の人生について10分書き出す
              {'\n'}
              2. 好きなこと「{likes || '未入力'}」
              に関係する行動を1つやる
              {'\n'}
              3. 今日の最後に、行動できた理由を記録する
            </Text>

            <Text style={styles.sectionTitle}>
              相棒からの一言
            </Text>

            <Text style={styles.resultText}>
              {getToneMessage()}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetData}
        >
          <Text style={styles.resetButtonText}>
            すべてリセット
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold' as const,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    marginBottom: 6,
  },

  smallText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 14,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 15,
  },

  inputLarge: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    minHeight: 70,
    marginBottom: 18,
    fontSize: 15,
  },

  row: {
    flexDirection: 'row' as const,
    gap: 10,
    marginBottom: 16,
  },

  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center' as const,
  },

  selectedButton: {
    backgroundColor: '#111',
    borderColor: '#111',
  },

  genderText: {
    color: '#111',
    fontWeight: 'bold' as const,
  },

  selectedText: {
    color: '#fff',
  },

  toneGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 10,
  },

  toneButton: {
    width: '48%' as const,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center' as const,
    backgroundColor: '#fff',
  },

  toneText: {
    color: '#111',
    fontWeight: 'bold' as const,
  },

  lifeBox: {
    backgroundColor: '#111',
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
  },

  lifeTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold' as const,
    marginBottom: 10,
  },

  lifeText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold' as const,
  },

  lifeSub: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 4,
  },

  note: {
    color: '#bbb',
    fontSize: 13,
    marginTop: 12,
  },

  button: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center' as const,
    marginTop: 8,
    marginBottom: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold' as const,
  },

  subButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: '#111',
    marginBottom: 8,
  },

  subButtonText: {
    color: '#111',
    fontSize: 16,
    fontWeight: 'bold' as const,
  },

  resultBox: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold' as const,
    marginTop: 12,
    marginBottom: 6,
  },

  resultText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },

  resetButton: {
    padding: 12,
    alignItems: 'center' as const,
    marginBottom: 40,
  },

  resetButtonText: {
    color: '#777',
    fontSize: 14,
  },
};