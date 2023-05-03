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
    /* font-size: 1em; */
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    /* line-height: 1.5; */

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
    /* padding: 0.4em 0.8em;
    margin: 0.5em 0; */
    overflow: auto;
    /* background: url('data:image/svg+xml;charset=utf-8,<svg%20version%3D"1.1"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20width%3D"100"%20height%3D"100"%20fill%3D"rgba(0%2C0%2C0%2C.2)">%0D%0A<polygon%20points%3D"0%2C50%2050%2C0%200%2C0"%20%2F>%0D%0A<polygon%20points%3D"0%2C100%2050%2C100%20100%2C50%20100%2C0"%20%2F>%0D%0A<%2Fsvg>');
    background-size: 1em 1em; */
  }

  code[class*='language-'] {
    /* background: black; */
    /* color: white; */
    color: ${({ theme }) => theme.foreground};
    /* box-shadow: -0.3em 0 0 0.3em black, 0.3em 0 0 0.3em black; */
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    /* padding: 0.2em; */
    border-radius: 0.3em;
    box-shadow: none;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    /* color: #aaa; */
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
    /* color: #0cf; */
    color: ${({ theme }) => theme.brightBlue};
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin {
    /* color: yellow; */
    color: ${({ theme }) => theme.yellow};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .token.variable,
  .token.inserted {
    /* color: yellowgreen; */
    color: ${({ theme }) => theme.brightGreen};
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    /* color: deeppink; */
    color: ${({ theme }) => theme.brightPurple};
  }

  .token.regex,
  .token.important {
    /* color: orange; */
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
    /* color: red; */
    color: ${({ theme }) => theme.red};
  }

  /* Plugin styles: Diff Highlight */
  /* pre.diff-highlight.diff-highlight > code .token.deleted:not(.prefix),
  pre > code.diff-highlight.diff-highlight .token.deleted:not(.prefix) {
    background-color: rgba(255, 0, 0, 0.3);
    display: inline;
  }

  pre.diff-highlight.diff-highlight > code .token.inserted:not(.prefix),
  pre > code.diff-highlight.diff-highlight .token.inserted:not(.prefix) {
    background-color: rgba(0, 255, 128, 0.3);
    display: inline;
  } */
`;
