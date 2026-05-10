import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Dumbbell, Target, Zap, User, MessageSquare, Send, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

const fitnessGoals = [
  { id: 'weight-loss', label: 'Weight Loss', icon: Target },
  { id: 'muscle-gain', label: 'Muscle Gain', icon: Dumbbell },
  { id: 'endurance', label: 'Endurance', icon: Zap },
  { id: 'general', label: 'General Fitness', icon: User },
];

const sampleQuestions = [
  'Create a 4-week fat loss plan',
  'Best exercises for beginners',
  'How to increase bench press?',
  'Healthy meal prep ideas',
];

export default function AITrainer() {
  const { darkMode } = useApp();
  const { ref, inView } = useInView();
  const [selectedGoal, setSelectedGoal] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateResponse = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const goalText = selectedGoal ? ` for ${selectedGoal.replace('-', ' ')}` : '';
    setResponse(
      `Here's a personalized fitness plan${goalText} based on your query "${question}":\n\n` +
      `🏋️ **Workout Routine:**\n` +
      `• Warm-up: 10 mins cardio (treadmill/jump rope)\n` +
      `• Main workout: 3 sets of compound exercises\n` +
      `• Cool down: 5 mins stretching\n\n` +
      `🥗 **Nutrition Tips:**\n` +
      `• Eat protein with every meal\n` +
      `• Stay hydrated (3-4L water daily)\n` +
      `• Include complex carbs pre-workout\n\n` +
      `⏱️ **Schedule:**\n` +
      `• Train 4-5 times per week\n` +
      `• Rest days are crucial for recovery\n\n` +
      `Would you like me to elaborate on any specific part of this plan?`
    );
    setLoading(false);
  };

  return (
    <section id="ai-trainer" className={`py-20 ${darkMode ? 'bg-card-grey' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">AI Powered</span>
          </div>
          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            AI <span className="text-gradient">Trainer</span>
          </h2>
          <p className="text-secondary-text max-w-2xl mx-auto">
            Get personalized workout plans, nutrition advice, and fitness guidance 
            powered by artificial intelligence. Your 24/7 virtual fitness coach.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`p-6 sm:p-8 rounded-2xl ${darkMode ? 'bg-bg-black border border-white/10' : 'bg-gray-50 border border-gray-200'}`}
          >
            <h3 className={`font-heading text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What's your fitness goal?
            </h3>
            
            {/* Goal Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {fitnessGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(selectedGoal === goal.id ? '' : goal.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2
                    ${selectedGoal === goal.id
                      ? 'border-primary bg-primary/10'
                      : darkMode 
                        ? 'border-white/10 bg-white/5 hover:border-white/20' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                >
                  <goal.icon className={`w-5 h-5 ${selectedGoal === goal.id ? 'text-primary' : 'text-secondary-text'}`} />
                  <span className={`text-sm font-medium ${selectedGoal === goal.id ? 'text-primary' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {goal.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Question Input */}
            <div className="relative">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Ask your fitness question
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., Create a 4-week muscle building plan..."
                  rows={3}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none
                    ${darkMode ? 'bg-card-grey border-white/10 text-white placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                />
              </div>
            </div>

            {/* Sample Questions */}
            <div className="mt-4">
              <p className={`text-xs mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuestion(q)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors
                      ${darkMode ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateResponse}
              disabled={!question.trim() || loading}
              className="w-full mt-6 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
              ) : (
                <><Send className="w-5 h-5" /> Get AI Plan</>
              )}
            </button>
          </motion.div>

          {/* Right - Response Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-6 sm:p-8 rounded-2xl min-h-[400px] ${darkMode ? 'bg-bg-black border border-white/10' : 'bg-gray-50 border border-gray-200'}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Trainer Response</h4>
                <p className="text-xs text-secondary-text">Personalized for you</p>
              </div>
            </div>

            {response ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-sm max-w-none"
              >
                <div className={`whitespace-pre-line text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {response.split('**').map((part, i) => 
                    i % 2 === 0 ? part : <strong key={i} className="text-primary">{part}</strong>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${darkMode ? 'bg-white/5' : 'bg-gray-200'}`}>
                  <Sparkles className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-secondary-text text-sm">
                  Your AI-generated fitness plan will appear here. Select a goal and ask a question to get started!
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {[
            { icon: Target, title: 'Goal Specific', desc: 'Plans tailored to your fitness objectives' },
            { icon: Zap, title: 'Instant Results', desc: 'Get answers in seconds, not hours' },
            { icon: User, title: 'Personalized', desc: 'Recommendations based on your profile' },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`p-5 rounded-xl text-center ${darkMode ? 'bg-bg-black/50 border border-white/5' : 'bg-white border border-gray-100'}`}
            >
              <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h4>
              <p className="text-secondary-text text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
