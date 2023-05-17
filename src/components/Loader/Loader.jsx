import React, { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';

const Spinner = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="spinner">
      {isLoading ? (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Spinner;
