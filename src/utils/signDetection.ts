interface DetectionBox {
  [key: number]: number;
}

// Sign language gestures mapping
const signMap: { [key: number]: { name: string; color: string } } = {
  0: { name: 'Hello', color: '#4CAF50' },
  1: { name: 'Thank You', color: '#2196F3' },
  2: { name: 'Yes', color: '#9C27B0' },
  3: { name: 'No', color: '#F44336' },
  4: { name: 'Please', color: '#FF9800' },
  // Add more signs as per the model's classes
};

export const drawSignDetection = (
  boxes: DetectionBox[],
  classes: number[],
  scores: number[],
  threshold: number,
  imgWidth: number,
  imgHeight: number,
  ctx: CanvasRenderingContext2D
) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let i = 0; i < boxes.length; i++) {
    if (scores[i] > threshold) {
      const [y, x, height, width] = boxes[i];
      const sign = signMap[classes[i]];

      if (sign) {
        const text = `${sign.name} ${Math.round(scores[i] * 100)}%`;

        // Draw detection box with rounded corners
        ctx.strokeStyle = sign.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        const radius = 10;
        const boxX = x * imgWidth;
        const boxY = y * imgHeight;
        const boxWidth = width * imgWidth;
        const boxHeight = height * imgHeight;

        ctx.moveTo(boxX + radius, boxY);
        ctx.lineTo(boxX + boxWidth - radius, boxY);
        ctx.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + radius);
        ctx.lineTo(boxX + boxWidth, boxY + boxHeight - radius);
        ctx.quadraticCurveTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - radius, boxY + boxHeight);
        ctx.lineTo(boxX + radius, boxY + boxHeight);
        ctx.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - radius);
        ctx.lineTo(boxX, boxY + radius);
        ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
        ctx.closePath();
        ctx.stroke();

        // Draw label with improved styling
        ctx.font = 'bold 16px Inter, system-ui, sans-serif';
        const textWidth = ctx.measureText(text).width;
        const padding = 8;

        // Label background
        ctx.fillStyle = sign.color + 'CC'; // Semi-transparent background
        ctx.beginPath();
        ctx.roundRect(
          boxX,
          boxY - 30,
          textWidth + padding * 2,
          24,
          4
        );
        ctx.fill();

        // Label text
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(
          text,
          boxX + padding,
          boxY - 13
        );
      }
    }
  }
};