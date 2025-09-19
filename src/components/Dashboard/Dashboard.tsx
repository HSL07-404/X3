import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import AttendanceWidget from './AttendanceWidget';
import PredictiveAnalytics from '../Analytics/PredictiveAnalytics';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  Sparkles,
  Bell,
  Target
} from 'lucide-react';

interface DashboardProps {
  setActiveSection: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveSection }) => {
  const { user } = useAuth();
  const { students, classes, attendanceRecords, activeSession } = useApp();

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    return attendanceRecords.filter(record => record.date === today);
  };

  const getAttendanceStats = () => {
    const totalStudents = students.length;
    const todayAttendance = getTodayAttendance();
    const presentToday = todayAttendance.filter(record => record.status === 'present').length;
    const attendanceRate = totalStudents > 0 ? (presentToday / totalStudents) * 100 : 0;
    
    return {
      totalStudents,
      presentToday,
      attendanceRate: Math.round(attendanceRate * 100) / 100
    };
  };

  const stats = getAttendanceStats();

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<any>;
    color: string;
    onClick?: () => void;
  }> = ({ title, value, subtitle, icon: Icon, color, onClick }) => (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 ${onClick ? 'hover:shadow-lg' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-indigo-100">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">87.5% Goal</span>
                </div>
              </div>
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all duration-200">
                <Bell className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          onClick={() => setActiveSection('students')}
        />
        <StatCard
          title="Present Today"
          value={stats.presentToday}
          subtitle={`${stats.attendanceRate}% attendance rate`}
          icon={CheckCircle2}
          color="bg-gradient-to-br from-green-500 to-green-600"
          onClick={() => setActiveSection('attendance')}
        />
        <StatCard
          title="Total Classes"
          value={classes.length}
          icon={Calendar}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          onClick={() => setActiveSection('classes')}
        />
        <StatCard
          title="Active Sessions"
          value={activeSession ? 1 : 0}
          subtitle={activeSession ? 'Class in progress' : 'No active sessions'}
          icon={Clock}
          color={activeSession ? "bg-gradient-to-br from-orange-500 to-orange-600" : "bg-gradient-to-br from-gray-500 to-gray-600"}
          onClick={() => setActiveSession('attendance')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Widget */}
        <div className="lg:col-span-1">
          <AttendanceWidget 
            role={user?.role || 'student'}
            studentData={user?.role === 'student' ? {
              overallPercentage: 87.5,
              trend: 'up',
              trendValue: 2.3,
              totalClasses: 52,
              attendedClasses: 45,
              upcomingClass: {
                name: 'Computer Science 101',
                time: '10:00 AM',
                room: 'Room 201'
              }
            } : undefined}
            facultyData={user?.role === 'faculty' ? {
              totalStudents: 120,
              presentToday: 98,
              averageAttendance: 82.4,
              lowAttendanceStudents: 8
            } : undefined}
          />
        </div>

        {/* Quick Actions & AI Insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Insights Preview */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">AI Insights</h3>
              </div>
              <button 
                onClick={() => setActiveSection('analytics')}
                className="text-purple-600 hover:text-purple-800 font-medium text-sm"
              >
                View All →
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200/50">
                <h4 className="font-semibold text-purple-800 mb-2">Attendance Prediction</h4>
                <div className="text-2xl font-bold text-purple-600 mb-1">82%</div>
                <p className="text-sm text-purple-700">Expected next week</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200/50">
                <h4 className="font-semibold text-orange-800 mb-2">At-Risk Students</h4>
                <div className="text-2xl font-bold text-orange-600 mb-1">3</div>
                <p className="text-sm text-orange-700">Need attention</p>
              </div>
            </div>
          </div>

      {/* Role-specific content */}
      {user?.role === 'faculty' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setActiveSection('attendance')}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Start New Class Session
              </button>
              <button
                onClick={() => setActiveSection('reports')}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Attendance Report
              </button>
              <button
                onClick={() => setActiveSection('analytics')}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                View AI Analytics
              </button>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              My Classes
            </h3>
            <div className="space-y-2">
              {classes.slice(0, 3).map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm dark:bg-gray-700/40 rounded-xl border border-white/20">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{cls.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cls.schedule}</p>
                  </div>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    {cls.studentIds.length} students
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {user?.role === 'student' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              My Attendance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Overall Attendance</span>
                <span className="text-2xl font-bold text-green-600">87.5%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300" style={{ width: '87.5%' }}></div>
              </div>
              <button
                onClick={() => setActiveSection('attendance')}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Detailed Attendance
              </button>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Enrolled Classes
            </h3>
            <div className="space-y-2">
              {classes.slice(0, 3).map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-3 bg-white/40 backdrop-blur-sm dark:bg-gray-700/40 rounded-xl border border-white/20">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{cls.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cls.schedule}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {user?.role === 'admin' && (
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl backdrop-blur-sm border border-blue-200/50">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{students.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
            </div>
            <div className="text-center p-4 bg-green-50/50 dark:bg-green-900/20 rounded-2xl backdrop-blur-sm border border-green-200/50">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{classes.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Classes</p>
            </div>
            <div className="text-center p-4 bg-purple-50/50 dark:bg-purple-900/20 rounded-2xl backdrop-blur-sm border border-purple-200/50">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{stats.attendanceRate}%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Attendance</p>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;