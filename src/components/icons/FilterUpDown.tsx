const FilterUpDown = ({ reverse }) => (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
    <path
      d="M11.6289 2.35156C11.9137 2.35156 12.149 2.56318 12.1863 2.83773L12.1914 2.91406V13.1274C12.1914 13.4381 11.9396 13.6899 11.6289 13.6899C11.3441 13.6899 11.1088 13.4783 11.0715 13.2037L11.0664 13.1274V2.91406C11.0664 2.6034 11.3182 2.35156 11.6289 2.35156Z"
      fill={reverse ? '#3770FF' : '#23262F'}
    />
    <path
      d="M14.2883 9.65786C14.5075 9.43768 14.8636 9.43686 15.0838 9.65602C15.284 9.85526 15.3028 10.1677 15.14 10.3883L15.0856 10.4515L12.0273 13.524C11.8274 13.7248 11.5137 13.7431 11.2932 13.5788L11.23 13.524L8.17165 10.4515C7.95249 10.2313 7.95331 9.87518 8.17349 9.65602C8.37365 9.45678 8.68618 9.43935 8.90602 9.60325L8.96898 9.65786L11.6283 12.3294L14.2883 9.65786Z"
      fill={reverse ? '#3770FF' : '#23262F'}
    />
    <path
      d="M4.18359 0.3125C4.46837 0.3125 4.70371 0.524115 4.74096 0.798672L4.74609 0.875V11.0883C4.74609 11.399 4.49425 11.6508 4.18359 11.6508C3.89882 11.6508 3.66348 11.4392 3.62623 11.1647L3.62109 11.0883V0.875C3.62109 0.56434 3.87293 0.3125 4.18359 0.3125Z"
      fill={reverse ? '#23262F' : '#3770FF'}
    />
    <path
      d="M3.78467 0.478173C3.98456 0.277357 4.29825 0.259101 4.51883 0.423405L4.582 0.478173L7.64033 3.55067C7.8595 3.77085 7.85867 4.127 7.6385 4.34617C7.43833 4.5454 7.1258 4.56284 6.90596 4.39894L6.843 4.34433L4.18317 1.672L1.52367 4.34433C1.32443 4.54449 1.01197 4.56336 0.791387 4.40048L0.728173 4.34617C0.528012 4.14693 0.509135 3.83447 0.672017 3.61389L0.726334 3.55067L3.78467 0.478173Z"
      fill={reverse ? '#23262F' : '#3770FF'}
    />
  </svg>
);

export default FilterUpDown;