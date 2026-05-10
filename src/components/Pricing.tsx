import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useInView } from '../hooks/useInView';

const plans = [
  {
    name: 'Day Pass',
    priceLabel: '₹250',
    period: 'per day',
    description: 'Single day access — perfect for visitors or trial',
    features: [
      'Full gym floor access',
      'All equipment usage',
      'Group classes included',
      'Locker facility',
      'Shower access',
    ],
    cta: 'Book Now',
    popular: false,
  },
  {
    name: 'Regular',
    priceLabel: '₹2,500',
    period: 'Entry + Monthly',
    description: 'Entry fee ₹1,200 + Monthly fee ₹1,300',
    features: [
      'Entry fee: ₹1,200 (one-time)',
      'Monthly fee: ₹1,300',
      'Unlimited gym access',
      'All group classes',
      'Locker & shower',
      'Trainer guidance',
    ],
    cta: 'Join Now',
    popular: false,
  },
  {
    name: '3 Months',
    priceLabel: '₹4,000',
    period: 'quarterly',
    description: 'Short-term commitment with full access',
    features: [
      '3 months full access',
      'All equipment & classes',
      'Locker & shower',
      'Trainer guidance',
      'Progress tracking',
    ],
    cta: 'Get 3 Months',
    popular: false,
  },
  {
    name: '6 Months',
    priceLabel: '₹7,000',
    period: 'half-yearly',
    description: 'Best value mid-term plan with savings',
    features: [
      '6 months full access',
      'All equipment & classes',
      'Locker & shower',
      'Priority class booking',
      'Diet consultation',
    ],
    cta: 'Join 6 Months',
    popular: true,
  },
  {
    name: '1 Year',
    priceLabel: '₹13,000',
    period: 'annual',
    description: 'Maximum savings — full year of transformation',
    features: [
      '12 months full access',
      'All equipment & classes',
      'Locker & shower',
      'Unlimited PT sessions',
      'Body composition scan',
      'Guest passes (2/month)',
    ],
    cta: 'Go Annual',
    popular: false,
  },
  {
    name: 'Personal Training',
    priceLabel: 'From ₹5,000',
    period: '',
    description: 'One-on-one coaching at gym or your home',
    features: [
      'PT at Gym — ₹5,000',
      'PT at Your Home — ₹10,000',
      'Custom workout plans',
      'Dedicated expert coach',
      'Flexible scheduling',
      'Diet & nutrition tips',
    ],
    cta: 'Get Personal Coach',
    popular: false,
  },
];

export default function Pricing() {
  const { darkMode, setBookingModalOpen } = useApp();
  const { ref, inView } = useInView();

  return (
    <section id="pricing" className={`py-24 ${darkMode ? 'bg-card-grey' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-primary text-sm font-semibold tracking-widest uppercase"
          >
            Membership Plans
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className={`section-title mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Simple <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-secondary-text mt-4 max-w-xl mx-auto"
          >
            No hidden fees. No confusing tiers. Pick the plan that fits your goals and start your transformation today.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col rounded-2xl overflow-hidden
                ${plan.popular
                  ? 'bg-primary shadow-glow-orange-lg ring-2 ring-primary'
                  : darkMode
                    ? 'bg-bg-black'
                    : 'bg-gray-50 border border-gray-200'
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 text-center py-1.5 bg-white/20 text-white text-xs font-bold tracking-widest uppercase">
                  <Zap className="w-3 h-3 inline mr-1" />
                  Most Popular
                </div>
              )}

              <div className={`p-7 ${plan.popular ? 'pt-10' : ''}`}>
                <h3 className={`font-heading text-2xl font-bold mb-1 ${plan.popular ? 'text-white' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-orange-100' : 'text-secondary-text'}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className={`font-heading text-4xl font-bold ${plan.popular ? 'text-white' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {plan.priceLabel}
                    </span>
                    {plan.period && (
                      <span className={`text-sm mb-1 ${plan.popular ? 'text-orange-100' : 'text-secondary-text'}`}>
                        ({plan.period})
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setBookingModalOpen(true)}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 mb-6
                    ${plan.popular
                      ? 'bg-white text-primary hover:bg-orange-50'
                      : 'bg-primary text-white hover:bg-primary-dark hover:shadow-glow-orange'
                    }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-3">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-orange-50' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timing & Policy Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className={`mt-8 p-6 rounded-2xl border ${darkMode ? 'bg-bg-black/50 border-white/5' : 'bg-gray-50 border-gray-100'}`}
        >
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Timings (Coonoor & Selas)</h4>
              <div className="space-y-1 text-secondary-text">
                <p>Morning: 6:00 AM – 10:00 AM</p>
                <p>Evening: 4:00 PM – 9:00 PM</p>
                <p className="text-primary font-medium">Timing is flexible • Sunday Holiday</p>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Gym Policy</h4>
              <p className="text-secondary-text">
                Please keep a separate pair of shoes for workout.
                <span className="text-red-400 font-medium block mt-1">Outside shoes are NOT allowed.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
