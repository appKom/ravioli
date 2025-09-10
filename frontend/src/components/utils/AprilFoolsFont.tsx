import { useEffect } from 'react';

const AprilFoolsFont = () => {
  useEffect(() => {
    const today = new Date();
    const isAprilFirst = today.getMonth() === 3 && today.getDate() === 1;

    if (isAprilFirst) {
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          font-family: "Comic Sans MS", "Comic Sans", cursive !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return null;
};

export default AprilFoolsFont;