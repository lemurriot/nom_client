import { useState, useLayoutEffect } from 'react';
import mojs from 'mo-js';

const useBurstAnimation = ({ duration: tlDuration, burstEl }) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    new mojs.Timeline()
  );

  useLayoutEffect(() => {
    if (!burstEl) {
      return;
    }

    const triangleBurst = new mojs.Burst({
      parent: burstEl,
      radius: { 70: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: { 6: 0 },
        scale: 1,
        stroke: 'rgba(211,84,0 ,0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration,
      },
    });

    const circleBurst = new mojs.Burst({
      parent: burstEl,
      radius: { 10: 45 },
      angle: 110,
      duration: tlDuration * 2,
      children: {
        shape: 'circle',
        fill: '#65aae6',
        delay: 10,
        speed: 5,
        radius: 20,
        easing: mojs.easing.bezier(-0.1, -1, 0.3, 3),
      },
    });

    const updatedAnimationTimeline = animationTimeline.add([
      circleBurst,
      triangleBurst,
    ]);

    setAnimationTimeline(updatedAnimationTimeline);
  }, [tlDuration, animationTimeline, burstEl]);

  return animationTimeline;
};

export default useBurstAnimation;
