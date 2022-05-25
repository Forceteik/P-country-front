const Edit = ({ color = '#200E32', fontSize = 24 }) => (
  <svg width={fontSize} height={fontSize} fill="none" viewBox="0 0 24 24">
    <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.7 19.898h6.377" />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M12.855 4.956c.737-.94 1.928-.89 2.868-.153l1.39 1.09c.94.737 1.273 1.88.536 2.82L9.359 19.29a1.48 1.48 0 01-1.15.568l-3.196.04-.724-3.114c-.102-.437 0-.897.277-1.252l8.289-10.575z"
      clipRule="evenodd"
    />
    <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.303 6.936l4.794 3.758" />
  </svg>
);

export default Edit;
