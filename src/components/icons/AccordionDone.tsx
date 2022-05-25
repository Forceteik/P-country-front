const AccordionDone = ({ color = '#000000', width = '18', height = '12' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 18 12" fill="none">
      <path
        d="M1 6.14103L6.22832 11L17 1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AccordionDone;
