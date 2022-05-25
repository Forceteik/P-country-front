const Send = ({ color = '#200E32', fontSize = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={fontSize} height={fontSize} fill="none" viewBox="0 0 24 24">
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M15.855 8.121l-5.663 5.702L3.56 9.74c-.87-.534-.693-1.854.286-2.138l15.655-4.556c.89-.257 1.714.577 1.447 1.472l-4.645 15.64c-.291.978-1.596 1.147-2.123.274l-3.99-6.61"
    ></path>
  </svg>
);

export default Send;
