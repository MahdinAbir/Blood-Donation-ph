import React from 'react';

import Loading from "../assets/LOADING.json"
import Lottie from 'lottie-react';

const Loader = () => {
    return (
        <div>

<div className="flex items-center justify-center h-screen">
      <Lottie animationData={Loading} loop={true} />
    </div>

            
        </div>
    );
};

export default Loader;