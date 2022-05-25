const Close = ({ color = '#200E32', fontSize = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={fontSize} height={fontSize} fill="none" viewBox="0 0 24 24">
    <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 6l12 12M18 6L6 18"></path>
  </svg>
);

export default Close;
