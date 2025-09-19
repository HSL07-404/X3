import React, { useRef, useState, useEffect } from 'react';
import {
  XMarkIcon,
  CameraIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  SparklesIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface FaceEnrollmentProps {
  onEnrollmentComplete: (faceData: any) => void;
  onClose: () => void;
  studentName: string;
}

const FaceEnrollment: React.FC<FaceEnrollmentProps> = ({ 
  onEnrollmentComplete, 
  onClose,
  studentName 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [enrollmentStep, setEnrollmentStep] = useState(0);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [faceDetected, setFaceDetected] = useState(false);

  const enrollmentSteps = [
    { title: 'Look straight ahead', instruction: 'Position your face in the center of the frame' },
    { title: 'Turn slightly left', instruction: 'Slowly turn your head to the left' },
    { title: 'Turn slightly right', instruction: 'Slowly turn your head to the right' },
    { title: 'Smile naturally', instruction: 'Show a natural smile for the camera' },
    { title: 'Processing...', instruction: 'Creating your face profile' }
  ];

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera access is not supported in this browser');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraStream(stream);
      
      // Start face detection simulation
      simulateFaceDetection();
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Camera access denied or not available. Please allow camera permissions and try again.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const simulateFaceDetection = () => {
    const interval = setInterval(() => {
      // Simulate face detection
      const detected = Math.random() > 0.3; // 70% chance of face detection
      setFaceDetected(detected);
    }, 500);

    return () => clearInterval(interval);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImages(prev => [...prev, imageData]);
    }
  };

  const handleNextStep = async () => {
    if (enrollmentStep < 4) {
      setIsProcessing(true);
      
      // Capture image for current step
      captureImage();
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEnrollmentStep(prev => prev + 1);
      setIsProcessing(false);
      
      if (enrollmentStep === 3) {
        // Final step - complete enrollment
        completeEnrollment();
      }
    }
  };

  const completeEnrollment = async () => {
    setIsProcessing(true);
    
    // Simulate face profile creation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const faceProfile = {
      studentName,
      images: capturedImages,
      enrollmentDate: new Date().toISOString(),
      faceDescriptor: 'mock_face_descriptor_' + Date.now() // In real app, this would be actual face descriptor
    };
    
    onEnrollmentComplete(faceProfile);
    setIsProcessing(false);
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const resetEnrollment = () => {
    setEnrollmentStep(0);
    setCapturedImages([]);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden border border-white/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserIcon className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold">Face Enrollment</h3>
                <p className="text-indigo-100">Setting up face recognition for {studentName}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error ? (
            <div className="text-center py-8">
              <ExclamationTriangleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="text-red-600 mb-4 font-medium">{error}</p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={resetEnrollment}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Try Again
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          ) : enrollmentStep === 4 ? (
            <div className="text-center py-8">
              <div className="relative">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ArrowPathIcon className="w-8 h-8 text-green-500 animate-spin" />
                  </div>
                )}
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {isProcessing ? 'Creating Face Profile...' : 'Enrollment Complete!'}
              </h4>
              <p className="text-gray-600 mb-6">
                {isProcessing 
                  ? 'Please wait while we process your face data'
                  : 'Your face has been successfully enrolled for attendance'
                }
              </p>
              
              {!isProcessing && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <SparklesIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h5 className="text-lg font-bold text-gray-800 mb-2">Face Recognition Ready!</h5>
                  <p className="text-gray-600 text-sm">
                    You can now use face recognition for quick attendance marking
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Step {enrollmentStep + 1} of 4
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((enrollmentStep + 1) / 4) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((enrollmentStep + 1) / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Step Instructions */}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {enrollmentSteps[enrollmentStep].title}
                </h4>
                <p className="text-gray-600">
                  {enrollmentSteps[enrollmentStep].instruction}
                </p>
              </div>

              {/* Camera Preview */}
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-80 bg-gray-900 rounded-2xl object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Face Detection Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Face Detection Frame */}
                    <div className={`w-64 h-72 border-4 rounded-3xl relative transition-colors duration-300 ${
                      faceDetected ? 'border-green-400' : 'border-red-400'
                    }`}>
                      <div className={`absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 rounded-tl-2xl transition-colors duration-300 ${
                        faceDetected ? 'border-green-500' : 'border-red-500'
                      }`}></div>
                      <div className={`absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 rounded-tr-2xl transition-colors duration-300 ${
                        faceDetected ? 'border-green-500' : 'border-red-500'
                      }`}></div>
                      <div className={`absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 rounded-bl-2xl transition-colors duration-300 ${
                        faceDetected ? 'border-green-500' : 'border-red-500'
                      }`}></div>
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 rounded-br-2xl transition-colors duration-300 ${
                        faceDetected ? 'border-green-500' : 'border-red-500'
                      }`}></div>
                      
                      {/* Detection Status */}
                      <div className={`absolute inset-0 rounded-3xl transition-colors duration-300 ${
                        faceDetected ? 'bg-green-400/10' : 'bg-red-400/10'
                      }`}></div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                      <div className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                        faceDetected 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {faceDetected ? 'Face Detected' : 'Position Your Face'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={handleClose}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!faceDetected || isProcessing}
                  className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                    faceDetected && !isProcessing
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    enrollmentStep === 3 ? 'Complete Enrollment' : 'Capture & Continue'
                  )}
                </button>
              </div>

              {/* Captured Images Preview */}
              {capturedImages.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Captured Images:</h5>
                  <div className="flex space-x-2 overflow-x-auto">
                    {capturedImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Capture ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-green-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceEnrollment;