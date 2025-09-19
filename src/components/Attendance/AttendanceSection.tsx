import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import ModernQRScanner from './ModernQRScanner';
import ModernFaceRecognition from './ModernFaceRecognition';
import FaceEnrollment from './FaceEnrollment';
import AttendanceNotifications from './AttendanceNotifications';
import AttendanceList from './AttendanceList';
import QRCodeGenerator from './QRCodeGenerator';
import { 
  CameraIcon, 
  QrCodeIcon, 
  UserGroupIcon, 
  PlayIcon, 
  StopIcon, 
  CheckCircleIcon,
  SparklesIcon,
  BellIcon,
  UserPlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const AttendanceSection: React.FC = () => {
  const { user } = useAuth();
  const { activeSession, setActiveSession, attendanceRecords, classes } = useApp();
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showFaceRecognition, setShowFaceRecognition] = useState(false);
  const [showFaceEnrollment, setShowFaceEnrollment] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentSessionQR, setCurrentSessionQR] = useState('');
  const [attendanceMode, setAttendanceMode] = useState<'qr' | 'face' | 'both'>('both');

  const startClass = async (classId: string) => {
    try {
      // Generate unique session ID and QR code
      const sessionId = `session_${Date.now()}`;
      const qrData = JSON.stringify({
        sessionId,
        classId,
        timestamp: Date.now()
      });

      const newSession = {
        id: sessionId,
        classId,
        facultyId: user!.id,
        date: new Date().toISOString().split('T')[0],
        startTime: new Date().toLocaleTimeString(),
        qrCode: qrData,
        isActive: true,
        attendees: []
      };

      setActiveSession(newSession);
      setCurrentSessionQR(qrData);
    } catch (error) {
      console.error('Failed to start class:', error);
    }
  };

  const endClass = () => {
    if (activeSession) {
      setActiveSession({
        ...activeSession,
        endTime: new Date().toLocaleTimeString(),
        isActive: false
      });
      setActiveSession(null);
      setCurrentSessionQR('');
    }
  };

  const handleFaceEnrollment = (faceData: any) => {
    console.log('Face enrollment completed:', faceData);
    // In a real app, this would save the face data to the database
    setShowFaceEnrollment(false);
    alert('Face enrollment completed successfully!');
  };

  if (user?.role === 'student') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">My Attendance</h2>
                <p className="text-indigo-100">Mark your attendance and track your progress</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowNotifications(true)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all duration-200"
                >
                  <BellIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setShowFaceEnrollment(true)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all duration-200"
                >
                  <UserPlusIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Attendance Mode Selector */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Attendance Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setAttendanceMode('qr')}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                attendanceMode === 'qr'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <QrCodeIcon className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">QR Code Only</div>
              <div className="text-sm text-gray-600">Quick and reliable</div>
            </button>
            <button
              onClick={() => setAttendanceMode('face')}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                attendanceMode === 'face'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CameraIcon className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Face Recognition</div>
              <div className="text-sm text-gray-600">Hands-free experience</div>
            </button>
            <button
              onClick={() => setAttendanceMode('both')}
              className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                attendanceMode === 'both'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <SparklesIcon className="w-8 h-8 mx-auto mb-2" />
              <div className="font-semibold">Smart Mode</div>
              <div className="text-sm text-gray-600">Best of both worlds</div>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
            <div className="flex items-center mb-6">
              <SparklesIcon className="w-6 h-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">
                Quick Check-in
              </h3>
            </div>
            <div className="space-y-4">
              {(attendanceMode === 'qr' || attendanceMode === 'both') && (
                <button
                  onClick={() => setShowQRScanner(true)}
                  className="w-full group bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  <QrCodeIcon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-lg mb-2">Scan QR Code</h4>
                  <p className="text-indigo-100 text-sm">Quick attendance marking</p>
                </button>
              )}
              
              {(attendanceMode === 'face' || attendanceMode === 'both') && (
                <button
                  onClick={() => setShowFaceRecognition(true)}
                  className="w-full group bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  <CameraIcon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-lg mb-2">Face Recognition</h4>
                  <p className="text-green-100 text-sm">AI-powered check-in</p>
                </button>
              )}
              
              <button
                onClick={() => setShowFaceEnrollment(true)}
                className="w-full group bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                <UserPlusIcon className="w-6 h-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-1">Enroll Face</h4>
                <p className="text-purple-100 text-xs">Set up face recognition</p>
              </button>
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Attendance Summary
            </h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">86.5%</div>
                <p className="text-gray-600">Overall Attendance Rate</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">45</div>
                  <p className="text-green-700 text-sm font-medium">Present</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl">
                  <div className="text-2xl font-bold text-red-600">7</div>
                  <p className="text-red-700 text-sm font-medium">Absent</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">52</div>
                  <p className="text-blue-700 text-sm font-medium">Total</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full" style={{ width: '86.5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <AttendanceList />

        {showQRScanner && (
          <ModernQRScanner
            onScanSuccess={(data) => {
              console.log('QR Code scanned:', data);
              setShowQRScanner(false);
            }}
            onClose={() => setShowQRScanner(false)}
          />
        )}

        {showFaceRecognition && (
          <ModernFaceRecognition
            onRecognitionSuccess={(studentData) => {
              console.log('Face recognized:', studentData);
              setShowFaceRecognition(false);
            }}
            onClose={() => setShowFaceRecognition(false)}
          />
        )}

        {showNotifications && (
          <AttendanceNotifications
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        )}

        {showFaceEnrollment && (
          <FaceEnrollment
            studentName={user?.name || 'Student'}
            onEnrollmentComplete={handleFaceEnrollment}
            onClose={() => setShowFaceEnrollment(false)}
          />
        )}

        {showNotifications && (
          <AttendanceNotifications
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Attendance Management</h2>
              <p className="text-indigo-100">Manage class sessions and track student attendance</p>
            </div>
            <div className="flex items-center space-x-4">
              {activeSession && (
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live Session</span>
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowNotifications(true)}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all duration-200"
              >
                <BellIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Mode Selector for Faculty */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setAttendanceMode('qr')}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
              attendanceMode === 'qr'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <QrCodeIcon className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold text-sm">QR Only</div>
          </button>
          <button
            onClick={() => setAttendanceMode('face')}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
              attendanceMode === 'face'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CameraIcon className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold text-sm">Face Only</div>
          </button>
          <button
            onClick={() => setAttendanceMode('both')}
            className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
              attendanceMode === 'both'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <SparklesIcon className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold text-sm">Both Methods</div>
          </button>
          <button className="p-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200">
            <EyeIcon className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold text-sm">Live Monitor</div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Sessions */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Class Sessions
          </h3>
          <div className="space-y-4">
            {classes.map((cls) => (
              <div key={cls.id} className="border border-gray-200/50 rounded-2xl p-6 hover:shadow-md transition-all duration-200 bg-white/40 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{cls.name}</h4>
                    <p className="text-gray-600 mb-1">{cls.schedule}</p>
                    <p className="text-gray-500 text-sm">{cls.room}</p>
                  </div>
                  <div className="flex items-center space-x-2 bg-indigo-50/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    <UserGroupIcon className="w-4 h-4 text-indigo-600" />
                    <span className="text-indigo-700 font-medium text-sm">{cls.studentIds.length}</span>
                  </div>
                </div>
                
                {activeSession?.classId === cls.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50/50 px-3 py-2 rounded-xl backdrop-blur-sm">
                      <CheckCircleIcon className="w-4 h-4" />
                      <span className="text-sm font-semibold">Session Active</span>
                    </div>
                    <button
                      onClick={endClass}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                    >
                      <StopIcon className="w-5 h-5 mr-2" />
                      End Class
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startClass(cls.id)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    <PlayIcon className="w-5 h-5 mr-2" />
                    Start Class
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {activeSession && (
          <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Current Session
            </h3>
            
            {/* Session Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <QRCodeGenerator data={currentSessionQR} />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Alternative Check-in Methods</h4>
                
                {(attendanceMode === 'qr' || attendanceMode === 'both') && (
                  <button
                    onClick={() => setShowQRScanner(true)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    <QrCodeIcon className="w-5 h-5 mr-2" />
                    Manual QR Scan
                  </button>
                )}
                
                {(attendanceMode === 'face' || attendanceMode === 'both') && (
                  <button
                    onClick={() => setShowFaceRecognition(true)}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    <CameraIcon className="w-5 h-5 mr-2" />
                    Face Recognition
                  </button>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-indigo-50/50 backdrop-blur-sm rounded-2xl p-4 border border-indigo-200/50">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class:</span>
                    <span className="font-semibold text-gray-800">{classes.find(c => c.id === activeSession.classId)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Started:</span>
                    <span className="font-semibold text-gray-800">{activeSession.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attendees:</span>
                    <span className="font-semibold text-indigo-600">{activeSession.attendees.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AttendanceList />

      {showQRScanner && (
        <ModernQRScanner
          onScanSuccess={(data) => {
            console.log('QR Code scanned:', data);
            setShowQRScanner(false);
          }}
          onClose={() => setShowQRScanner(false)}
        />
      )}

      {showFaceRecognition && (
        <ModernFaceRecognition
          onRecognitionSuccess={(studentData) => {
            console.log('Face recognized:', studentData);
            setShowFaceRecognition(false);
          }}
          onClose={() => setShowFaceRecognition(false)}
        />
      )}
    </div>
  );
};

export default AttendanceSection;