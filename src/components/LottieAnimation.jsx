import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({ animationPath = '/landing animation.json', className = '', style = {} }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(animationPath)
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, [animationPath]);

  return (
    <div className={className} style={style}>
      {animationData && <Lottie animationData={animationData} loop={true} />}
    </div>
  );
};

export default LottieAnimation;
