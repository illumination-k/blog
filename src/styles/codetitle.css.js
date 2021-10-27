export const codeTitleCss = `
.code-title {
  background: #2e96b5;
  color: #eee;
  padding: 6px 12px;
  font-size: 0.8em;
  line-height: 1;
  font-weight: bold;
  display: table;
  border-radius: 4px 4px 0 0;
}

/*
Language Name on Code Block
*/

.markdown-body pre {
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.markdown-body pre > code[class*="language"]::before {
  background: #808080;
  border-radius: 0 0 0.25rem 0.25rem;
  color: white;
  font-size: 14px;
  letter-spacing: 0.025rem;
  padding: 0.1rem 0.5rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  opacity: 0.4;
}

.markdown-body pre > code[class="language-rust"]::before {
  content: "Rust";
  opacity: 0.8;
}

.markdown-body pre > code[class="language-python"]::before {
  content: "Python";
  opacity: 0.8;
}

.markdown-body pre > code[class="language-r"]::before {
  content: "R";
  opacity: 0.8;
}

.markdown-body pre > code[class="language-js"]::before {
  content: "JavaScript";
  opacity: 0.8;
}

.markdown-body pre > code[class="language-jsx"]::before {
  content: "JSX";
  opacity: 0.8;
}

.markdown-body pre > code[class="language-ts"]::before {
  content: "TypeScript";
  opacity: 0.8;
}

.markdown-body pre > code[class="language-tsx"]::before {
  content: "TSX";
  opacity: 0.8;
}

.markdown-body pre > code[class="language-bash"]::before {
  content: "bash";
  opacity: 0.8;
}

.markdown-body pre > code[class="language-html"]::before {
  content: "html";
  opacity: 0.8;
}

.markdown-body pre > code[class="language-css"]::before {
  content: "css";
  opacity: 0.8;
}
`