export const prismCss = `
/* PrismJS 1.21.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+bash+c+cpp+cmake+cypher+diff+docker+git+graphql+ignore+json+json5+jsonp+julia+latex+makefile+markdown+mongodb+nginx+powershell+python+r+jsx+tsx+rust+sass+scss+sql+toml+typescript+typoscript+vim+xml-doc+yaml&plugins=line-numbers+show-language+command-line+toolbar+copy-to-clipboard+download-button+diff-highlight */
/**
 * prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML
 * Based on https://github.com/chriskempson/tomorrow-theme
 * @author Rose Pritchard
 */

code[class*="language-"],
pre[class*="language-"] {
  color: #ccc;
  background: none;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #2d2d2d;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #999;
}

.token.punctuation {
  color: #ccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  color: #e2777a;
}

.token.function-name {
  color: #6196cc;
}

.token.boolean,
.token.number,
.token.function {
  color: #f08d49;
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  color: #f8c555;
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  color: #cc99cd;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
  color: #7ec699;
}

.token.operator,
.token.entity,
.token.url {
  color: #67cdcc;
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

.token.inserted {
  color: green;
}

pre[class*="language-"].line-numbers {
  position: relative;
  padding-left: 3.8em;
  counter-reset: linenumber;
}

pre[class*="language-"].line-numbers > code {
  position: relative;
  white-space: inherit;
}

.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 0;
  font-size: 100%;
  left: -3.8em;
  width: 3em; /* works for line-numbers below 1000 lines */
  letter-spacing: -1px;
  border-right: 1px solid #999;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.line-numbers-rows > span {
  display: block;
  counter-increment: linenumber;
}

.line-numbers-rows > span:before {
  content: counter(linenumber);
  color: #999;
  display: block;
  padding-right: 0.8em;
  text-align: right;
}

div.code-toolbar {
  position: relative;
}

div.code-toolbar > .toolbar {
  position: absolute;
  top: 0.3em;
  right: 0.2em;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

div.code-toolbar:hover > .toolbar {
  opacity: 1;
}

/* Separate line b/c rules are thrown out if selector is invalid.
   IE11 and old Edge versions don't support :focus-within. */
div.code-toolbar:focus-within > .toolbar {
  opacity: 1;
}

div.code-toolbar > .toolbar .toolbar-item {
  display: inline-block;
}

div.code-toolbar > .toolbar a {
  cursor: pointer;
}

div.code-toolbar > .toolbar button {
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-user-select: none; /* for button */
  -moz-user-select: none;
  -ms-user-select: none;
}

div.code-toolbar > .toolbar a,
div.code-toolbar > .toolbar button,
div.code-toolbar > .toolbar span {
  color: #bbb;
  font-size: 0.8em;
  padding: 0 0.5em;
  background: #f5f2f0;
  background: rgba(224, 224, 224, 0.2);
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.5em;
}

div.code-toolbar > .toolbar a:hover,
div.code-toolbar > .toolbar a:focus,
div.code-toolbar > .toolbar button:hover,
div.code-toolbar > .toolbar button:focus,
div.code-toolbar > .toolbar span:hover,
div.code-toolbar > .toolbar span:focus {
  color: inherit;
  text-decoration: none;
}

.command-line-prompt {
  border-right: 1px solid #999;
  display: block;
  float: left;
  font-size: 100%;
  letter-spacing: -1px;
  margin-right: 1em;
  pointer-events: none;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.command-line-prompt > span:before {
  color: #999;
  content: " ";
  display: block;
  padding-right: 0.8em;
}

.command-line-prompt > span[data-user]:before {
  content: "[" attr(data-user) "@" attr(data-host) "] $";
}

.command-line-prompt > span[data-user="root"]:before {
  content: "[" attr(data-user) "@" attr(data-host) "] #";
}

.command-line-prompt > span[data-prompt]:before {
  content: attr(data-prompt);
}

pre.diff-highlight > code .token.deleted:not(.prefix),
pre > code.diff-highlight .token.deleted:not(.prefix) {
  background-color: rgba(255, 0, 0, 0.1);
  color: inherit;
  display: block;
}

pre.diff-highlight > code .token.inserted:not(.prefix),
pre > code.diff-highlight .token.inserted:not(.prefix) {
  background-color: rgba(0, 255, 128, 0.1);
  color: inherit;
  display: block;
}
`