// re-export remark plugins for version consistency
import remarkFootnotes from "remark-footnotes";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import stripMarkdown from "strip-markdown";
import { unified } from "unified";

import autoHeadings from "./autoHeadings";
import codeTitle from "./codeTitle";
import highlighter from "./highlighter";

export { highlighter, remarkFootnotes, remarkGfm, remarkMath, remarkParse, remarkStringify, stripMarkdown, unified };
