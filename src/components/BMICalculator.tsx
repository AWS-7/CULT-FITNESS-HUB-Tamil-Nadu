import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, ArrowRight, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

export default function BMICalculator() {
  const { darkMode } = useApp();
  const { ref, inView } = useInView();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // convert to meters
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h);
      setBmi(parseFloat(bmiValue.toFixed(1)));
      
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal Weight');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'Underweight': return 'text-blue-400';
      case 'Normal Weight': return 'text-green-400';
      case 'Overweight': return 'text-yellow-400';
      case 'Obese': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section id="bmi" className={`py-20 ${darkMode ? 'bg-bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Health Tool</span>
            </div>
            <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              BMI <span className="text-gradient">Calculator</span>
            </h2>
            <p className="text-secondary-text mb-6 leading-relaxed">
              Calculate your Body Mass Index to understand your health status. 
              BMI is a simple calculation using your height and weight to categorize 
              if you're underweight, normal weight, overweight, or obese.
            </p>
            
            {/* BMI Categories */}
            <div className={`p-5 rounded-xl ${darkMode ? 'bg-card-grey border border-white/5' : 'bg-white border border-gray-100'}`}>
              <h4 className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Info className="w-4 h-4 text-primary" /> BMI Categories
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-blue-400 font-medium">Underweight</span><span className="text-secondary-text">&lt; 18.5</span></div>
                <div className="flex justify-between"><span className="text-green-400 font-medium">Normal Weight</span><span className="text-secondary-text">18.5 – 24.9</span></div>
                <div className="flex justify-between"><span className="text-yellow-400 font-medium">Overweight</span><span className="text-secondary-text">25 – 29.9</span></div>
                <div className="flex justify-between"><span className="text-red-400 font-medium">Obese</span><span className="text-secondary-text">≥ 30</span></div>
              </div>
            </div>
          </motion.div>

          {/* Right - Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-6 sm:p-8 rounded-2xl ${darkMode ? 'bg-card-grey border border-white/10' : 'bg-white border border-gray-200 shadow-lg'}`}
          >
            <h3 className={`font-heading text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Calculate Your BMI
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g., 175"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all
                    ${darkMode ? 'bg-bg-black border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g., 70"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all
                    ${darkMode ? 'bg-bg-black border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'}`}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={calculateBMI}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  Calculate <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={reset}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors
                    ${darkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Result */}
            {bmi !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-5 rounded-xl text-center ${darkMode ? 'bg-bg-black border border-white/10' : 'bg-gray-50 border border-gray-100'}`}
              >
                <p className="text-secondary-text text-sm mb-1">Your BMI</p>
                <p className="font-heading text-4xl font-bold text-white mb-2">{bmi}</p>
                <p className={`font-medium ${getCategoryColor()}`}>{category}</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
