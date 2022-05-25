import { makeStyles } from '@mui/styles';

const snippet = `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(80438017, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true
    });
`;

const useStyles = makeStyles(() => ({
  img: {
    position: 'absolute',
    left: -9999,
  },
}));

export const YandexMetricsSnippet = () => {
  const classes = useStyles();
  return (
    <>
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: snippet }} />
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/80438017" className={classes.img} alt="" />
        </div>
      </noscript>
    </>
  );
};
