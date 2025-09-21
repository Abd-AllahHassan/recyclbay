import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw, Check, AlertTriangle } from 'lucide-react';

const CameraCapture = ({ onCapture, onOpenChange }) => {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setError(null);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("لم نتمكن من الوصول إلى الكاميرا. يرجى التحقق من الأذونات والمحاولة مرة أخرى.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("لم نتمكن من الوصول إلى الكاميرا. يرجى التحقق من الأذونات والمحاولة مرة أخرى.");
      }
    };
    startCamera();
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onOpenChange(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 text-red-700 rounded-lg">
        <AlertTriangle className="w-12 h-12 mb-4" />
        <h3 className="text-lg font-bold mb-2">خطأ في الكاميرا</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />
        ) : (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
      <div className="mt-4 flex justify-center gap-4">
        {capturedImage ? (
          <>
            <Button onClick={handleRetake} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 ml-2" />
              إعادة الالتقاط
            </Button>
            <Button onClick={handleConfirm} className="flex-1 hero-gradient text-white">
              <Check className="w-4 h-4 ml-2" />
              تأكيد الصورة
            </Button>
          </>
        ) : (
          <Button onClick={handleCapture} size="lg" className="rounded-full w-16 h-16 p-0 hero-gradient text-white">
            <Camera className="w-8 h-8" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;