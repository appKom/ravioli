import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import { useDarkMode } from "../utils/DarkModeProvider";
import clsx from 'clsx';

const folksomergladijulEmoji = "https://emoji.slack-edge.com/T03S8TX18/folksomergladijul/d7da5ca5a6ac293b.png";

const julebordDate = new Date(2024, 10, 13); // 13. november

const calculateDaysUntilChristmas = () => {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 24); // December 24th
  if (today > christmas) {
    // If today is after this year's Christmas, calculate for next year's Christmas
    christmas.setFullYear(christmas.getFullYear() + 1);
  }
  const diffTime = Math.abs(christmas.getTime() - today.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatJulebordDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('no-NO', options);
};

export const ChristmasPage = () => {
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(calculateDaysUntilChristmas());
  const { isDarkMode } = useDarkMode();

  const isAfterJulebord = new Date() > julebordDate;

  // Snowflake count ranges from 150 to 750 based on the days until Christmas
  const minSnowflakes = 150;
  const maxSnowflakes = 750;
  const snowflakeCount = minSnowflakes + Math.max(0, (25 - daysUntilChristmas) * ((maxSnowflakes - minSnowflakes) / 25));

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysUntilChristmas(calculateDaysUntilChristmas());
    }, 60000); // Recalculate every 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-full bg-gradient-to-b from-[#9acdf5] to-[#d1e3f1] dark:bg-none">
      <div className='z-10'>
        <Snowfall color={isDarkMode ? "#def1ff" : "#fff"} snowflakeCount={snowflakeCount} />
      </div>

      <div className="relative w-full max-w-2xl z-20 p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Nedtelling til jul</h1>

        <div className="mb-12 text-center">
          <p className="font-extrabold text-red-600 dark:text-500 text-[138px] leading-none" >
            {daysUntilChristmas}
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-300">{daysUntilChristmas === 1 ? "dag" : "dager"} igjen!</p>
        </div>

        {!isAfterJulebord && (
          <div className="py-8 mb-8 border-y border-gray-200 dark:border-gray-700">
            <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">Nominer Årets Nisse</h2>
            <p className="mb-4 text-center text-gray-600 dark:text-gray-400">Skann QR-koden og send inn din nominasjon før julebordet <b>{formatJulebordDate(julebordDate)}</b>!</p>
            <div className="flex justify-center">
              <img
                className="w-64"
                src={isDarkMode ? "/qr-codes/nisse-white.svg" : "/qr-codes/nisse-green.svg"}
                alt="Årets Nisse QR Kode"
              />
            </div>
          </div>
        )}

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">Presentert av interessegruppen <span className="font-bold">folk som er glad i jul</span>!</p>

        {['top-4 left-4', 'top-4 right-4', 'bottom-4 right-4', 'bottom-4 left-4'].map((pos) => (
          <img 
            key={pos} 
            src={folksomergladijulEmoji} 
            className={clsx("absolute max-h-14", pos)}
          />
        ))}
      </div>

      <svg 
        viewBox="0 0 1000 400"
        className="w-full absolute bottom-0 opacity-95"
      >
        <g clipPath="url(#clip0_36_28)">
          <path d="M0 400C133.333 266.667 266.667 233.333 400 300C533.333 233.333 666.667 233.333 800 300C933.333 233.333 1000 266.667 1000 400H0Z" fill="#F1F5F9"/>
          <path d="M286.653 210.63L283.337 211.396L286.129 209.451L283.995 206.813L281.509 209.138L282.952 206.057L279.787 204.838L278.794 208.093L278.507 204.704L275.155 205.233L275.924 208.546L273.977 205.755L271.342 207.888L273.662 210.376L270.583 208.929L269.364 212.096L272.617 213.088L269.227 213.379L269.756 216.73L273.07 215.96L270.281 217.909L272.415 220.544L274.9 218.221L273.457 221.303L276.622 222.52L277.615 219.264L277.904 222.656L281.256 222.127L280.485 218.811L282.432 221.603L285.069 219.471L282.747 216.983L285.828 218.427L287.047 215.264L283.79 214.269L287.182 213.981L286.653 210.63Z" fill="white"/>
          <path d="M329.885 295.507C333.182 316.401 318.918 336.01 298.026 339.306C277.132 342.603 257.523 328.338 254.226 307.444C250.93 286.55 265.195 266.941 286.089 263.645C306.981 260.348 326.589 274.613 329.885 295.507Z" fill="white"/>
          <path d="M329.885 295.507C326.588 274.613 306.981 260.348 286.089 263.645C274.941 265.403 265.682 271.805 259.967 280.569L321.826 325.569C328.405 317.435 331.644 306.655 329.885 295.507Z" fill="#EFEDD9"/>
          <path d="M310.03 253.052C312.207 266.855 302.784 279.808 288.983 281.986C275.178 284.164 262.226 274.741 260.048 260.937C257.871 247.136 267.292 234.182 281.097 232.004C294.899 229.827 307.852 239.25 310.03 253.052Z" fill="white"/>
          <path d="M311.695 237.046L311.694 237.046C310.986 235.392 310.173 233.882 309.275 232.503C300.55 219.079 284.022 218.027 279.033 216.702L278.347 216.81C274.012 219.606 258.637 225.684 254.45 241.114C254.02 242.698 253.709 244.382 253.539 246.173C253.272 248.985 253.357 252.054 253.887 255.408C255.647 266.568 260.258 271.947 263.006 271.513C266.296 270.994 264.516 260.226 263.516 253.888C262.531 247.646 273.159 244.611 282.726 243.062C282.743 243.06 282.755 243.058 282.769 243.055C282.83 243.041 282.886 243.032 282.951 243.027C292.527 241.556 303.573 241.171 304.557 247.413C305.557 253.751 307.183 264.543 310.47 264.025C313.216 263.591 315.951 257.054 314.19 245.893C313.663 242.557 312.803 239.625 311.695 237.046Z" fill="#0D5474"/>
          <path d="M288.902 258.501C289.211 260.456 287.876 262.288 285.922 262.596C283.966 262.905 282.133 261.573 281.824 259.618C281.516 257.664 282.85 255.827 284.805 255.518C286.76 255.21 288.594 256.547 288.902 258.501Z" fill="#DD5519"/>
          <path d="M276.709 255.962C276.944 257.446 275.931 258.84 274.445 259.074C272.958 259.309 271.565 258.294 271.331 256.81C271.096 255.323 272.109 253.929 273.596 253.694C275.082 253.46 276.475 254.475 276.709 255.962Z" fill="#687C7C"/>
          <path d="M298.023 252.599C298.257 254.083 297.244 255.478 295.758 255.712C294.273 255.946 292.879 254.932 292.645 253.448C292.411 251.96 293.424 250.566 294.909 250.332C296.395 250.097 297.788 251.112 298.023 252.599Z" fill="#687C7C"/>
          <path d="M277.041 267.97C278.253 269.45 279.827 270.597 281.608 271.294C283.383 271.989 285.374 272.238 287.393 271.919C289.412 271.601 291.229 270.751 292.705 269.543C294.184 268.331 295.327 266.756 296.024 264.975C296.275 264.34 295.961 263.621 295.322 263.373C294.688 263.122 293.969 263.436 293.719 264.074C293.178 265.454 292.287 266.684 291.137 267.627C289.987 268.569 288.584 269.226 287.008 269.475C285.429 269.724 283.893 269.531 282.508 268.989C281.125 268.445 279.897 267.55 278.955 266.403C278.522 265.873 277.744 265.799 277.216 266.229C276.686 266.662 276.61 267.443 277.041 267.97Z" fill="#687C7C"/>
          <path d="M311.684 237.047C311.079 236.816 310.458 236.599 309.824 236.395C306.409 235.284 302.634 234.502 298.612 234.105C293.363 233.584 287.692 233.716 281.851 234.606C281.725 234.625 281.6 234.645 281.473 234.665C281.373 234.681 281.267 234.698 281.165 234.714C275.399 235.649 270.022 237.237 265.226 239.307C260.77 241.23 256.823 243.57 253.533 246.174C253.701 244.383 254.014 242.699 254.445 241.115C257.203 239.261 260.263 237.594 263.57 236.146C268.715 233.9 274.46 232.195 280.611 231.199C280.712 231.181 280.818 231.164 280.918 231.149C281.045 231.129 281.17 231.109 281.297 231.09C287.332 230.172 293.207 230.017 298.698 230.537C302.421 230.889 305.966 231.551 309.267 232.504C310.164 233.883 310.978 235.393 311.684 237.047Z" fill="#F9B759"/>
          <path d="M293.638 294.018C293.872 295.504 292.856 296.899 291.372 297.133C289.887 297.367 288.491 296.353 288.256 294.867C288.022 293.382 289.038 291.987 290.524 291.753C292.008 291.519 293.403 292.533 293.638 294.018Z" fill="#687C7C"/>
          <path d="M295.808 307.775C296.042 309.259 295.027 310.656 293.543 310.891C292.057 311.125 290.661 310.108 290.427 308.624C290.192 307.138 291.208 305.742 292.693 305.508C294.177 305.273 295.574 306.289 295.808 307.775Z" fill="#687C7C"/>
          <path d="M297.544 318.78C297.778 320.264 296.763 321.662 295.279 321.896C293.793 322.13 292.397 321.113 292.162 319.629C291.928 318.144 292.944 316.75 294.43 316.516C295.914 316.282 297.309 317.295 297.544 318.78Z" fill="#687C7C"/>
          <path d="M0 400C100 300 200 283.333 300 350C400 283.333 500 266.667 600 300C700 266.667 800 283.333 900 350C966.667 316.667 1000 333.333 1000 400H0Z" fill="#F8FAFC"/>
          <path d="M812.809 301.743C812.344 304.231 809.949 305.874 807.457 305.409L782.272 300.705C779.78 300.239 778.14 297.842 778.604 295.354L783.953 266.721C784.418 264.23 786.812 262.589 789.305 263.054L814.489 267.758C816.982 268.224 818.622 270.619 818.157 273.11L812.809 301.743Z" fill="#9D897E"/>
          <path d="M822.419 154.337C823.053 153.412 823.781 153.548 824.038 154.64L825.029 158.859C825.286 159.952 826.41 160.916 827.527 161.001L831.851 161.332C832.969 161.418 833.215 162.116 832.399 162.884L829.24 165.854C828.42 166.62 828.148 168.077 828.635 169.09L830.51 172.998C830.994 174.009 830.512 174.572 829.439 174.247L825.287 172.996C824.214 172.672 822.818 173.164 822.184 174.09L819.737 177.669C819.103 178.594 818.375 178.458 818.118 177.367L817.127 173.145C816.87 172.053 815.746 171.09 814.626 171.005L810.303 170.673C809.186 170.59 808.939 169.89 809.757 169.122L812.916 166.153C813.734 165.384 814.006 163.928 813.52 162.918L811.646 159.007C811.16 157.997 811.644 157.435 812.716 157.758L816.867 159.01C817.942 159.334 819.338 158.841 819.972 157.915L822.419 154.337Z" fill="#EFE081"/>
          <path d="M812.808 301.743L816.238 283.377L804.222 265.841L799.641 264.985L782.333 276.844L801.093 304.22L807.456 305.409C809.949 305.874 812.343 304.231 812.808 301.743Z" fill="#917D73"/>
          <path d="M847.654 267.903C846.955 266.8 846.761 265.449 847.118 264.192C847.475 262.936 848.351 261.89 849.527 261.319L853.94 259.177C855.15 258.59 856.041 257.503 856.379 256.201C856.715 254.9 856.466 253.517 855.694 252.417L842.139 233.096C841.341 231.955 841.102 230.514 841.491 229.176C841.882 227.841 842.856 226.753 844.144 226.222L845.257 225.761C846.569 225.219 847.558 224.1 847.931 222.729C848.305 221.357 848.022 219.89 847.165 218.755L820.924 184.023C819.496 182.132 816.865 181.641 814.851 182.888L777.842 205.807C776.634 206.555 775.84 207.821 775.694 209.236C775.546 210.648 776.065 212.05 777.092 213.029L777.964 213.861C778.973 214.82 779.488 216.186 779.371 217.573C779.252 218.961 778.508 220.219 777.351 220.994L757.737 234.119C756.62 234.867 755.887 236.067 755.732 237.401C755.578 238.738 756.014 240.073 756.932 241.057L760.273 244.648C761.163 245.604 761.604 246.896 761.483 248.197C761.364 249.498 760.694 250.687 759.644 251.464L744.86 262.399C743.528 263.384 742.831 265.01 743.035 266.658C743.243 268.302 744.319 269.707 745.855 270.334L853.704 290.478C855.36 290.447 856.873 289.526 857.658 288.067C858.442 286.605 858.38 284.837 857.493 283.438L847.654 267.903Z" fill="#5AB182"/>
          <path d="M857.493 283.438L847.653 267.903C846.955 266.8 846.76 265.449 847.118 264.192C847.475 262.936 848.351 261.89 849.526 261.319L853.94 259.177C855.15 258.59 856.041 257.503 856.378 256.2C856.714 254.9 856.466 253.517 855.694 252.417L842.139 233.096C841.341 231.955 841.102 230.514 841.49 229.176C841.882 227.841 842.856 226.753 844.144 226.222L845.257 225.761C846.569 225.219 847.558 224.1 847.931 222.729C848.305 221.357 848.021 219.89 847.164 218.755L845.909 217.096L763.428 273.616L853.703 290.478C855.36 290.447 856.873 289.526 857.657 288.067C858.442 286.605 858.38 284.837 857.493 283.438Z" fill="#4EA172"/>
          <path d="M0 400C166.667 333.333 333.333 316.667 500 350C666.667 316.667 833.333 333.333 1000 400H0Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="clip0_36_28">
            <rect width="1000" height="400" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
