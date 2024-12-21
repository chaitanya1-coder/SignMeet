interface DetectionBox {
  [key: number]: number;
}

const labelMap: { [key: number]: string } = {
  1: { name: 'person', color: 'red' },
  2: { name: 'bicycle', color: 'blue' },
  3: { name: 'car', color: 'green' },
  // Add more labels as needed
};

export const drawRect = (
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
      const label = labelMap[classes[i]];

      if (label) {
        const text = `${label.name} ${Math.round(scores[i] * 100)}%`;

        ctx.strokeStyle = label.color;
        ctx.lineWidth = 2;
        ctx.fillStyle = label.color;
        ctx.font = '18px Arial';

        // Draw box
        ctx.beginPath();
        ctx.rect(
          x * imgWidth,
          y * imgHeight,
          width * imgWidth,
          height * imgHeight
        );
        ctx.stroke();

        // Draw label background
        const textWidth = ctx.measureText(text).width;
        ctx.fillRect(
          x * imgWidth,
          y * imgHeight - 25,
          textWidth + 10,
          25
        );

        // Draw label text
        ctx.fillStyle = 'white';
        ctx.fillText(
          text,
          x * imgWidth + 5,
          y * imgHeight - 7
        );
      }
    }
  }
};