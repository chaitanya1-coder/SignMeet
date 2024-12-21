import { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { drawSignDetection } from '../utils/signDetection';

export const useSignLanguageDetection = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const detect = async (net: tf.GraphModel, video: HTMLVideoElement) => {
    if (!canvasRef.current) return;
    
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const img = tf.browser.fromPixels(video);
    const resized = tf.image.resizeBilinear(img, [640, 480]);
    const casted = resized.cast('int32');
    const expanded = casted.expandDims(0);
    const obj = await net.executeAsync(expanded);

    const boxes = await obj[1].array();
    const classes = await obj[2].array();
    const scores = await obj[4].array();

    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      requestAnimationFrame(() => {
        drawSignDetection(boxes[0], classes[0], scores[0], 0.7, videoWidth, videoHeight, ctx);
      });
    }

    tf.dispose([img, resized, casted, expanded, obj]);
  };

  useEffect(() => {
    let interval: number;
    
    const runDetection = async () => {
      try {
        const net = await tf.loadGraphModel(
          'https://tensorflowmodelformeet.s3.us-east.cloud-object-storage.appdomain.cloud/model.json'
        );

        interval = window.setInterval(() => {
          if (videoRef.current?.readyState === 4) {
            detect(net, videoRef.current);
          }
        }, 100); // Reduced frequency for better performance
      } catch (error) {
        console.error('Error loading sign language detection model:', error);
      }
    };

    runDetection();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [videoRef]);

  return canvasRef;
};