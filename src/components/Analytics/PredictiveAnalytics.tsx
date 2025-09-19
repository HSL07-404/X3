import React, { useState } from 'react';
import {
  SparklesIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ChartBarIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface PredictiveAnalyticsProps {
  classId?: string;
  studentId?: string;
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({ classId, studentId }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'semester'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'attendance' | 'performance' | 'risk'>('attendance');

  // Mock predictive data
  const predictions = {
    attendance: {
      nextWeek: {
        predicted: 78,
        confidence: 85,
        trend: 'down' as const,
        factors: ['Weather forecast shows rain', 'Exam period approaching', 'Historical pattern']
      },
      nextMonth: {
        predicted: 82,
        confidence: 78,
        trend: 'up' as const,
        factors: ['Post-exam period', 'New semester motivation', 'Improved scheduling']
      }
    },
    riskStudents: [
      {
        id: '1',
        name: 'John Smith',
        currentAttendance: 68,
        predictedAttendance: 62,
        riskLevel: 'high',
        riskFactors: ['Declining trend', 'Missed 3 consecutive classes', 'Below threshold'],
        recommendations: ['Send early warning', 'Schedule counseling', 'Contact parents']
      },
      {
        id: '2',
        name: 'Alice Johnson',
        currentAttendance: 74,
        predictedAttendance: 71,
        riskLevel: 'medium',
        riskFactors: ['Borderline attendance', 'Irregular pattern'],
        recommendations: ['Monitor closely', 'Provide attendance summary']
      }
    ],
    insights: [
      {
        type: 'pattern',
        title: 'Monday Morning Drop',
        description: 'Attendance drops by 15% on Monday mornings compared to other days',
        impact: 'medium',
        suggestion: 'Consider scheduling important topics on other days'
      },
      {
        type: 'seasonal',
        title: 'Weather Impact',
        description: 'Rainy days see 12% lower attendance on average',
        impact: 'low',
        suggestion: 'Prepare online backup for weather-affected days'
      },
      {
        type: 'behavioral',
        title: 'Exam Period Effect',
        description: 'Attendance increases by 25% in the week before exams',
        impact: 'high',
        suggestion: 'Leverage this period for important announcements'
      }
    ]
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-8 text-white">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="w-8 h-8" />
          <div>
            <h2 className="text-3xl font-bold">Predictive Analytics</h2>
            <p className="text-purple-100">AI-powered insights and predictions</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="week">Next Week</option>
              <option value="month">Next Month</option>
              <option value="semester">Next Semester</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Focus Area</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as any)}
              className="px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="attendance">Attendance Prediction</option>
              <option value="performance">Performance Trends</option>
              <option value="risk">Risk Assessment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Prediction */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Attendance Forecast</h3>
            <ChartBarIcon className="w-6 h-6 text-purple-600" />
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {predictions.attendance.nextMonth.predicted}%
              </div>
              <div className="text-gray-600">Predicted Attendance</div>
              <div className="flex items-center justify-center mt-2">
                {predictions.attendance.nextMonth.trend === 'up' ? (
                  <TrendingUpIcon className="w-5 h-5 text-green-500 mr-1" />
                ) : (
                  <TrendingDownIcon className="w-5 h-5 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  predictions.attendance.nextMonth.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {predictions.attendance.nextMonth.trend === 'up' ? 'Improving' : 'Declining'}
                </span>
              </div>
            </div>

            <div className="bg-purple-50/50 backdrop-blur-sm rounded-2xl p-4 border border-purple-200/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-purple-800">Confidence Level</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  getConfidenceColor(predictions.attendance.nextMonth.confidence)
                }`}>
                  {predictions.attendance.nextMonth.confidence}%
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${predictions.attendance.nextMonth.confidence}%` }}
                ></div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Factors</h4>
              <ul className="space-y-1">
                {predictions.attendance.nextMonth.factors.map((factor, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Risk Assessment</h3>
            <ExclamationTriangleIcon className="w-6 h-6 text-orange-600" />
          </div>

          <div className="space-y-4">
            {predictions.riskStudents.map((student) => (
              <div key={student.id} className={`p-4 rounded-2xl border ${getRiskColor(student.riskLevel)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{student.name}</h4>
                  <span className="text-xs font-semibold uppercase">
                    {student.riskLevel} Risk
                  </span>
                </div>
                <div className="text-sm mb-2">
                  Current: {student.currentAttendance}% → Predicted: {student.predictedAttendance}%
                </div>
                <div className="text-xs">
                  <strong>Factors:</strong> {student.riskFactors.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">AI-Generated Insights</h3>
          <LightBulbIcon className="w-6 h-6 text-yellow-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {predictions.insights.map((insight, index) => (
            <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                  insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {insight.impact} impact
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-xs text-gray-700">
                  <strong>Suggestion:</strong> {insight.suggestion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Recommendations */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <h4 className="font-semibold mb-2">Immediate Actions</h4>
            <ul className="space-y-1 text-sm">
              <li>• Send early warning to 2 high-risk students</li>
              <li>• Schedule counseling sessions</li>
              <li>• Review Monday morning schedule</li>
            </ul>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <h4 className="font-semibold mb-2">Long-term Strategies</h4>
            <ul className="space-y-1 text-sm">
              <li>• Implement weather-based online classes</li>
              <li>• Adjust important content scheduling</li>
              <li>• Develop engagement programs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;