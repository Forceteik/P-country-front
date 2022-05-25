import Countdown from 'react-countdown';

import CountdownTime from './CountdownTime';

const SmsTimer = ({ handleComplete, value, handleTick }) => {
  return (
    <Countdown
      date={Date.now() + value * 1000}
      onComplete={handleComplete}
      onTick={handleTick}
      renderer={renderer}
      overtime
    />
  );
};

const renderer = ({ completed, formatted }) => {
  if (completed) {
    // Render a completed state
    return <CountdownTime time={'00:00'} color={'#b3b3b3'} />;
  }
  return <CountdownTime color={'#b3b3b3'} time={`${formatted.minutes}:${formatted.seconds}`} />;
};

export default SmsTimer;
