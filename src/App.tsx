import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  Filter,
  Info
} from 'lucide-react';
import { QUESTIONS } from './data/questions';
import { Question, Difficulty, GrammarPoint, Option } from './types';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | '全部'>('全部');
  const [filterCategory, setFilterCategory] = useState<GrammarPoint | '全部'>('全部');

  const filteredQuestions = useMemo(() => {
    return QUESTIONS.filter(q => {
      const matchDiff = filterDifficulty === '全部' || q.difficulty === filterDifficulty;
      const matchCat = filterCategory === '全部' || q.category === filterCategory;
      return matchDiff && matchCat;
    });
  }, [filterDifficulty, filterCategory]);

  const currentQuestion = filteredQuestions[currentIndex];

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId || isSubmitted) return;
    
    const option = currentQuestion.options.find(o => o.id === selectedOptionId);
    if (option?.isCorrect) {
      setScore(prev => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">未找到符合条件的题目</h2>
          <p className="text-gray-500 mb-6">请尝试调整筛选条件</p>
          <button 
            onClick={() => { setFilterDifficulty('全部'); setFilterCategory('全部'); }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            清除所有筛选
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / filteredQuestions.length) * 100);
    let message = "";
    if (percentage === 100) message = "太棒了！你是语法大师！";
    else if (percentage >= 80) message = "做得好！继续保持！";
    else if (percentage >= 60) message = "不错，还有进步空间哦。";
    else message = "别灰心，多练习一定会变强！";

    return (
      <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-sm text-center max-w-lg w-full"
        >
          <div className="relative inline-block mb-6">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              {percentage}%
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">练习完成</h2>
          <p className="text-5xl font-light text-indigo-600 mb-4">{score} / {filteredQuestions.length}</p>
          <p className="text-gray-600 mb-8 text-lg">{message}</p>
          
          <div className="space-y-4">
            <button 
              onClick={resetQuiz}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-medium hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              重新开始
            </button>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-400 mb-3">推荐复习</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from(new Set(filteredQuestions.map(q => q.category))).slice(0, 3).map(cat => (
                  <span key={cat} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {cat}专题
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">GrammarMaster</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <select 
                value={filterDifficulty} 
                onChange={(e) => { setFilterDifficulty(e.target.value as any); setCurrentIndex(0); }}
                className="bg-gray-50 border-none rounded-lg px-2 py-1 text-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="全部">所有难度</option>
                {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select 
                value={filterCategory} 
                onChange={(e) => { setFilterCategory(e.target.value as any); setCurrentIndex(0); }}
                className="bg-gray-50 border-none rounded-lg px-2 py-1 text-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="全部">所有语法点</option>
                {Object.values(GrammarPoint).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="text-sm font-medium text-gray-400">
              <span className="text-indigo-600">{currentIndex + 1}</span> / {filteredQuestions.length}
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-100">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Question Info */}
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                currentQuestion.difficulty === Difficulty.JUNIOR ? 'bg-green-100 text-green-700' :
                currentQuestion.difficulty === Difficulty.MIDDLE ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-gray-400 text-sm">{currentQuestion.category}</span>
            </div>

            {/* Sentence Display */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-2xl md:text-3xl leading-relaxed font-medium text-gray-800">
                {currentQuestion.sentence.split('______').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className={`inline-block min-w-[120px] border-b-2 mx-2 text-center transition-all ${
                        isSubmitted 
                          ? (currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600')
                          : (selectedOptionId ? 'text-indigo-600 border-indigo-600' : 'text-gray-300 border-gray-300')
                      }`}>
                        {selectedOptionId ? currentQuestion.options.find(o => o.id === selectedOptionId)?.text : '______'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const showCorrect = isSubmitted && option.isCorrect;
                const showWrong = isSubmitted && isSelected && !option.isCorrect;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={isSubmitted}
                    className={`p-5 rounded-2xl text-left transition-all flex items-center justify-between border-2 ${
                      isSelected && !isSubmitted ? 'border-indigo-600 bg-indigo-50' : 
                      showCorrect ? 'border-green-600 bg-green-50' :
                      showWrong ? 'border-red-600 bg-red-50' :
                      'border-white bg-white hover:border-gray-200'
                    } ${isSubmitted && !isSelected && !option.isCorrect ? 'opacity-50' : ''}`}
                  >
                    <span className={`text-lg font-medium ${
                      isSelected && !isSubmitted ? 'text-indigo-700' :
                      showCorrect ? 'text-green-700' :
                      showWrong ? 'text-red-700' :
                      'text-gray-700'
                    }`}>
                      {option.text}
                    </span>
                    {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-2">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOptionId}
                    className={`px-8 py-4 rounded-2xl font-bold transition-all ${
                      selectedOptionId 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:translate-y-[-2px]' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    提交答案
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center gap-2"
                  >
                    {currentIndex < filteredQuestions.length - 1 ? '下一题' : '查看结果'}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Explanation Card */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
                >
                  <div className={`p-4 flex items-center gap-2 ${
                    currentQuestion.options.find(o => o.id === selectedOptionId)?.isCorrect 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    <Info className="w-5 h-5" />
                    <span className="font-bold">详解卡片</span>
                  </div>
                  <div className="p-8 space-y-6">
                    <section>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">语法规则</h4>
                      <p className="text-gray-700 leading-relaxed">{currentQuestion.explanation.rule}</p>
                    </section>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <section>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">经典例句</h4>
                        <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-indigo-500">
                          <p className="text-gray-800 italic">"{currentQuestion.explanation.example}"</p>
                        </div>
                      </section>
                      <section>
                        <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">常见错误辨析</h4>
                        <p className="text-gray-600 text-sm">{currentQuestion.explanation.commonMistake}</p>
                      </section>
                    </div>

                    <section className="pt-4 border-t border-gray-50">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">中文翻译</h4>
                      <p className="text-gray-500">{currentQuestion.explanation.translation}</p>
                    </section>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Mobile Nav */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-400 text-sm">
        <p>© 2024 GrammarMaster · 助力初中生攻克语法难关</p>
      </footer>
    </div>
  );
}
