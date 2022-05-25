const ChevronDown = ({ color = '#200E32', fontSize = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={fontSize} height={fontSize} fill="none" viewBox="0 0 24 24">
    <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 8.5l-7 7-7-7" />
  </svg>
);

export default ChevronDown;
