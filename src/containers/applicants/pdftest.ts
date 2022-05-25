import React from 'react';
import ReactDOMServer from 'react-dom/server';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { toBlob } from 'html-to-image';

// const saveBlob = (function () {
//   const a = document.createElement('a');
//   document.body.appendChild(a);
//   a.style = 'display: none';
//   return function (blob, fileName) {
//     const url = window.URL.createObjectURL(blob);
//     a.href = url;
//     a.download = fileName;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };
// })();

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const downloadPdf = async () => {
  setTimeout(() => {
    console.log('html', document.getElementById('testPdfComponent'));
    const node = document.getElementById('testPdfComponent');
    toBlob(node).then(function (blob) {
      console.log('blob', blob);
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;
        console.log(base64data, 'base64');

        const docDefinition = {
          content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
            {
              image: base64data,
              fit: [600, 600],
            },
          ],
        };

        pdfMake.createPdf(docDefinition).download();
      };
    });
  }, 5000);
};

export default downloadPdf;
