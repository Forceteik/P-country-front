const PlusBorder = ({ colorFirst = '#E1E3E8' }, { colorSecond = '#979DAD' }) => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="26" cy="26" r="25.5" fill="transparent" stroke={colorFirst} strokeDasharray="6 6" />
    <path
      d="M26 19V33M33 26L19 26"
      stroke={colorSecond}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default PlusBorder;
