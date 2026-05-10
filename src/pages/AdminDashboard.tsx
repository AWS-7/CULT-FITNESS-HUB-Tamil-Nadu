import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Activity, 
  Download,
  Search,
  Bell,
  Settings,
  MapPin,
  Award,
  ArrowUp,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { darkMode } = useApp();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock analytics data
  const analyticsData = {
    revenue: {
      current: 2847500,
      previous: 2423000,
      growth: 17.5,
      monthly: [1890000, 2100000, 1950000, 2280000, 2450000, 2847500]
    },
    members: {
      total: 1520,
      active: 1248,
      new: 89,
      churn: 12,
      growth: 8.2
    },
    classes: {
      total: 1247,
      attended: 1089,
      completion: 87.3,
      revenue: 423500
    },
    trainers: {
      total: 12,
      active: 11,
      avgRating: 4.6,
      sessions: 3420
    }
  };

  const branchData = [
    { name: 'Selas', revenue: 1245000, members: 720, growth: 22.3, rating: 4.7 },
    { name: 'Coonoor', revenue: 895000, members: 480, growth: 15.8, rating: 4.5 },
    { name: 'Manjoor', revenue: 707500, members: 320, growth: 12.1, rating: 4.4 }
  ];

  const topPerformers = [
    { name: 'Bala', branch: 'Selas', sessions: 156, rating: 4.9, revenue: 234000 },
    { name: 'Ronaldo', branch: 'Coonoor', sessions: 142, rating: 4.8, revenue: 198000 },
    { name: 'Rajesh', branch: 'Manjoor', sessions: 128, rating: 4.7, revenue: 187000 }
  ];

  const recentActivities = [
    { type: 'new_member', name: 'Kumar V', branch: 'Selas', time: '2 mins ago' },
    { type: 'class_booked', name: 'Yoga Class', branch: 'Coonoor', time: '15 mins ago' },
    { type: 'payment', name: '₹4,999', branch: 'Manjoor', time: '1 hour ago' },
    { type: 'trainer_rating', name: 'Bala - 5★', branch: 'Selas', time: '2 hours ago' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`border-b ${darkMode ? 'border-gray-800 bg-card-grey' : 'border-gray-200 bg-white'}`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Analytics Dashboard
              </h1>
              <div className="flex items-center gap-2">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-800 text-white border-gray-700' 
                      : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-800 text-white border-gray-700' 
                      : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                >
                  <option value="all">All Branches</option>
                  <option value="selas">Selas</option>
                  <option value="coonoor">Coonoor</option>
                  <option value="manjoor">Manjoor</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-800 text-white border-gray-700' 
                      : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
              </div>
              <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <Bell className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-card-grey' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-primary/20' : 'bg-orange-100'}`}>
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="w-4 h-4" />
                {analyticsData.revenue.growth}%
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹{(analyticsData.revenue.current / 100000).toFixed(1)}L
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-card-grey' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-20' : 'bg-blue-100'}`}>
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="w-4 h-4" />
                {analyticsData.members.growth}%
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.members.total.toLocaleString()}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Members</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-card-grey' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-20' : 'bg-green-100'}`}>
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="w-4 h-4" />
                {analyticsData.classes.completion}%
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.classes.attended}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Classes Attended</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-card-grey' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-20' : 'bg-purple-100'}`}>
                <Award className="w-6 h-6 text-purple-500" />
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <Star className="w-4 h-4" />
                {analyticsData.trainers.avgRating}
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {analyticsData.trainers.total}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Trainers</p>
          </motion.div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-2 p-6 rounded-xl ${darkMode ? 'bg-card-grey' : 'bg-white'} shadow-lg`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Revenue Overview
              </h2>
              <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {analyticsData.revenue.monthly.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-primary rounded-t-lg relative" style={{ height: `${(value / 3000000) * 100}%` }}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                      ₹{(value / 100000).toFixed(0)}L
                    </div>
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-card-grey' : 'bg-white'} shadow-lg`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activities
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'new_member' ? 'bg-green-500' :
                      activity.type === 'class_booked' ? 'bg-blue-500' :
                      activity.type === 'payment' ? 'bg-orange-500' : 'bg-purple-500'
                    }`} />
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {activity.name}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {activity.branch}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Branch Performance & Top Trainers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Branch Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-card-grey' : 'bg-white'} shadow-lg`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Branch Performance
            </h2>
            <div className="space-y-4">
              {branchData.map((branch, index) => (
                <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {branch.name}
                      </h3>
                    </div>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUp className="w-4 h-4" />
                      {branch.growth}%
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ₹{(branch.revenue / 100000).toFixed(1)}L
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Members</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {branch.members}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rating</p>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ⭐ {branch.rating}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-xl ${darkMode ? 'bg-card-grey' : 'bg-white'} shadow-lg`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Top Performers
            </h2>
            <div className="space-y-4">
              {topPerformers.map((trainer, index) => (
                <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {trainer.name}
                        </h3>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {trainer.branch}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ⭐ {trainer.rating}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {trainer.sessions} sessions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Revenue Generated
                    </span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      ₹{(trainer.revenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
