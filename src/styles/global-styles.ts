import { createGlobalStyle, css } from 'styled-components';
import { lighten } from 'polished';

export default createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    position: relative;
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.foreground};
    width: 100vw;
    height: 100vh;
    font-family: 'Fira Code', monospace;

    ${({ theme }) => css`
      background-image: radial-gradient(
        circle at 100% 0%,
        ${lighten(0.06, theme.background)} 0,
        ${lighten(0.03, theme.background)} 50%,
        ${lighten(0.015, theme.background)} 100%
      );
    `};
  }
`;
