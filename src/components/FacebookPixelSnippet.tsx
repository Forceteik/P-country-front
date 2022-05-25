import { makeStyles } from '@mui/styles';

const snippet = `
!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '279729237438095');
  fbq('track', 'PageView');
`;

const useStyles = makeStyles(() => ({
  displayNone: {
    display: 'none',
  },
}));
export const FacebookPixelSnippet = () => {
  const classes = useStyles();

  return (
    <>
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: snippet }} />
      <noscript>
        <img
          height="1"
          width="1"
          className={classes.displayNone}
          src="https://www.facebook.com/tr?id=921747078779351&ev=PageView&noscript=1"
          alt="FacebookPixelSnippet"
        />
      </noscript>
    </>
  );
};
