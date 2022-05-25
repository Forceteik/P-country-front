const Search = ({ fontSize = 24 }) => (
  <svg width={fontSize} height={fontSize} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="prefix__a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={20}
      height={20}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0h19.477v19.477H0V0z" fill="#fff" />
    </mask>
    <g mask="url(#prefix__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.739 1.5c-4.543 0-8.24 3.695-8.24 8.238 0 4.543 3.697 8.239 8.24 8.239 4.542 0 8.238-3.696 8.238-8.239 0-4.543-3.696-8.238-8.238-8.238zm0 17.977c-5.37 0-9.74-4.369-9.74-9.739C0 4.368 4.37 0 9.74 0s9.738 4.368 9.738 9.738c0 5.37-4.368 9.739-9.738 9.739z"
        fill="#fff"
      />
    </g>
    <mask
      id="prefix__b"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={15}
      y={15}
      width={6}
      height={6}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M15.24 15.707h5.024v5.015H15.24v-5.015z" fill="#fff" />
    </mask>
    <g mask="url(#prefix__b)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.514 20.722a.75.75 0 01-.53-.22L15.46 16.99a.75.75 0 011.06-1.063l3.524 3.515a.749.749 0 01-.53 1.28z"
        fill="#fff"
      />
    </g>
  </svg>
);

export default Search;
