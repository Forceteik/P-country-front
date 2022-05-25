const Time = ({ color = '#200E32', fontSize = 24 }) => (
  <svg width={fontSize} height={fontSize} viewBox="0 0 18 18" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.0013 1.91797C5.09547 1.91797 1.91797 5.09547 1.91797 9.0013C1.91797 12.9071 5.09547 16.0846 9.0013 16.0846C12.9071 16.0846 16.0846 12.9071 16.0846 9.0013C16.0846 5.09547 12.9071 1.91797 9.0013 1.91797ZM9.0013 17.3346C4.4063 17.3346 0.667969 13.5963 0.667969 9.0013C0.667969 4.4063 4.4063 0.667969 9.0013 0.667969C13.5963 0.667969 17.3346 4.4063 17.3346 9.0013C17.3346 13.5963 13.5963 17.3346 9.0013 17.3346Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.8604 12.0782C11.7513 12.0782 11.6413 12.0499 11.5404 11.9907L8.39875 10.1166C8.21042 10.0032 8.09375 9.79906 8.09375 9.57906V5.53906C8.09375 5.19406 8.37375 4.91406 8.71875 4.91406C9.06458 4.91406 9.34375 5.19406 9.34375 5.53906V9.22406L12.1813 10.9157C12.4771 11.0932 12.5746 11.4766 12.3979 11.7732C12.2804 11.9691 12.0729 12.0782 11.8604 12.0782Z"
      fill={color}
    />
  </svg>
);

export default Time;