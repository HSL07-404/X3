import React, { useState } from 'react';
import {
  ChartBarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface AttendanceWidgetProps {
  studentData?: {
    overallPercentage: number;
    trend: 'up' | 'down' | 'stable';
    trendValue: number;
    totalClasses: number;
    attendedClasses: number;
    upcomingClass?: {
      name: string;
      time: string;
      room: string;
    };
  };
  facultyData?: {
    totalStudents: number;
    presentToday: number;
    averageAttendance: number;
    lowAttendanceStudents: number;
  };
  role: 'student' | 'faculty' | 'admin';
}

const AttendanceWidget: React.FC<AttendanceWidgetProps> = ({ 
  studentData, 
  facultyData, 
  role 
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'semester'>('week');

  // Mock data for demonstration
  const defaultStudentData = {
    overallPercentage: 87.5,
    trend: 'up' as const,
    trendValue: 2.3,
    totalClasses: 52,
    attendedClasses: 45,
    upcomingClass: {
      name: 'Computer Science 101',
      time: '10:00 AM',
      room: 'Room 201'
    }
  };

  const defaultFacultyData = {
    totalStudents: 120,
    presentToday: 98,
    averageAttendance: 82.4,
    lowAttendanceStudents: 8
  };

  const data = role === 'student' 
    ? (studentData || defaultStudentData)
    : (facultyData || defaultFacultyData);

  const weeklyData = [
    { day: 'Mon', percentage: 85 },
    { day: 'Tue', percentage: 92 },
    { day: 'Wed', percentage: 78 },
    { day: 'Thu', percentage: 88 },
    { day: 'Fri', percentage: 95 },
    { day: 'Sat', percentage: 82 },
    { day: 'Sun', percentage: 0 }
  ];

  if (role === 'student') {
    const studentInfo = data as typeof defaultStudentData;
    
    return (
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">My Attendance</h3>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="semester">This Semester</option>
          </select>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">
              {studentInfo.overallPercentage}%
            </div>
            <div className="text-sm text-gray-600">Overall Rate</div>
            <div className="flex items-center justify-center mt-2">
              {studentInfo.trend === 'up' ? (
                <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                studentInfo.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {studentInfo.trendValue}%
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {studentInfo.attendedClasses}/{studentInfo.totalClasses}
            </div>
            <div className="text-sm text-gray-600">Classes Attended</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${studentInfo.overallPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Weekly Attendance</h4>
          <div className="flex items-end justify-between h-20 space-x-1">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-indigo-500 to-purple-600 rounded-t-lg transition-all duration-300 hover:opacity-80"
                  style={{ height: `${day.percentage}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Class */}
        {studentInfo.upcomingClass && (
          <div className="bg-indigo-50/50 backdrop-blur-sm rounded-2xl p-4 border border-indigo-200/50">
            <div className="flex items-center mb-2">
              <CalendarIcon className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-sm font-semibold text-indigo-800">Next Class</span>
            </div>
            <h5 className="font-semibold text-gray-800 mb-1">{studentInfo.upcomingClass.name}</h5>
            <div className="flex items-center text-sm text-gray-600 space-x-4">
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                {studentInfo.upcomingClass.time}
              </div>
              <div>{studentInfo.upcomingClass.room}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Faculty/Admin view
  const facultyInfo = data as typeof defaultFacultyData;
  
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Attendance Overview</h3>
        <ChartBarIcon className="w-6 h-6 text-indigo-600" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50/50 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{facultyInfo.presentToday}</div>
              <div className="text-sm text-blue-700">Present Today</div>
            </div>
            <UserGroupIcon className="w-8 h-8 text-blue-500" />
          </div>
          <div className="text-xs text-blue-600 mt-2">
            out of {facultyInfo.totalStudents} students
          </div>
        </div>

        <div className="bg-green-50/50 backdrop-blur-sm rounded-2xl p-4 border border-green-200/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{facultyInfo.averageAttendance}%</div>
              <div className="text-sm text-green-700">Average Rate</div>
            </div>
            <TrendingUpIcon className="w-8 h-8 text-green-500" />
          </div>
          <div className="text-xs text-green-600 mt-2">
            +3.2% from last week
          </div>
        </div>
      </div>

      {/* Alert for low attendance */}
      {facultyInfo.lowAttendanceStudents > 0 && (
        <div className="bg-yellow-50/50 backdrop-blur-sm rounded-2xl p-4 border border-yellow-200/50 mb-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
            <div>
              <div className="text-sm font-semibold text-yellow-800">
                {facultyInfo.lowAttendanceStudents} students with low attendance
              </div>
              <div className="text-xs text-yellow-700">
                Below 75% attendance threshold
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-2">
        <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          Start New Session
        </button>
        <button className="w-full bg-white/60 backdrop-blur-sm text-gray-700 py-2 rounded-xl font-medium border border-white/20 hover:bg-white/80 transition-all duration-200">
          View Detailed Report
        </button>
      </div>
    </div>
  );
};

export default AttendanceWidget;