import { createGlobalStyle, css } from 'styled-components';
import { lighten, darken, getLuminance } from 'polished';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

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
    overflow: hidden;

    ${({ theme }) => {
      const luminance = getLuminance(theme.background);
      const colorTransformFn = luminance >= 0.5 ? darken : lighten;

      return css`
        background-image: radial-gradient(
          circle,
          ${colorTransformFn(0.1, theme.background)} 0,
          ${colorTransformFn(0.01, theme.background)} 100%
        );
      `;
    }};
  }

  #root {
    width: 100%;
    height: 100%;
  }

  // Syntax highlighting ////////////////////////////
  code[class*='language-'],
  pre[class*='language-'] {
    font-family: 'Fira code', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    overflow: auto;
  }

  code[class*='language-'] {
    color: ${({ theme }) => theme.foreground};
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    border-radius: 0.3em;
    box-shadow: none;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${({ theme }) => theme.brightBlack};
  }

  .token.punctuation {
    color: #999;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol {
    color: ${({ theme }) => theme.brightBlue};
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin {
    color: ${({ theme }) => theme.yellow};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .token.variable,
  .token.inserted {
    color: ${({ theme }) => theme.brightGreen};
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${({ theme }) => theme.brightPurple};
  }

  .token.regex,
  .token.important {
    color: ${({ theme }) => theme.brightRed};
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.deleted {
    color: ${({ theme }) => theme.red};
  }
`;
