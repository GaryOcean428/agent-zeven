"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownContent = MarkdownContent;
var react_1 = require("react");
var react_markdown_1 = require("react-markdown");
var remark_gfm_1 = require("remark-gfm");
var rehype_raw_1 = require("rehype-raw");
var utils_1 = require("../lib/utils");
var markdownComponents = {
    pre: function (_a) {
        var children = _a.children, props = __rest(_a, ["children"]);
        return (<div className="relative group">
      <pre {...props} className="overflow-x-auto p-4 rounded-lg bg-gray-800/50 my-2">
        {children}
      </pre>
      <button onClick={function () {
                var _a;
                var code = (_a = children === null || children === void 0 ? void 0 : children.props) === null || _a === void 0 ? void 0 : _a.children;
                if (code) {
                    navigator.clipboard.writeText(code);
                }
            }} className="absolute top-2 right-2 p-2 rounded-lg bg-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity">
        Copy
      </button>
    </div>);
    },
    code: function (_a) {
        var node = _a.node, inline = _a.inline, className = _a.className, children = _a.children, props = __rest(_a, ["node", "inline", "className", "children"]);
        if (inline) {
            return (<code className="px-1.5 py-0.5 rounded-md bg-gray-800/50 text-sm" {...props}>
          {children}
        </code>);
        }
        return (<code className={(0, utils_1.cn)('block text-sm', className)} {...props}>
        {children}
      </code>);
    },
    p: function (_a) {
        var children = _a.children;
        return (<p className="mb-4 leading-7 last:mb-0">{children}</p>);
    },
    ul: function (_a) {
        var children = _a.children;
        return (<ul className="mb-4 list-disc pl-6 space-y-2">{children}</ul>);
    },
    ol: function (_a) {
        var children = _a.children;
        return (<ol className="mb-4 list-decimal pl-6 space-y-2">{children}</ol>);
    },
    li: function (_a) {
        var children = _a.children;
        return (<li className="leading-7">{children}</li>);
    },
    h1: function (_a) {
        var children = _a.children;
        return (<h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>);
    },
    h2: function (_a) {
        var children = _a.children;
        return (<h2 className="text-xl font-bold mb-3 mt-5">{children}</h2>);
    },
    h3: function (_a) {
        var children = _a.children;
        return (<h3 className="text-lg font-bold mb-3 mt-4">{children}</h3>);
    },
    table: function (_a) {
        var children = _a.children;
        return (<div className="overflow-x-auto mb-4">
      <table className="min-w-full divide-y divide-gray-700 border border-gray-700 rounded-lg">
        {children}
      </table>
    </div>);
    },
    th: function (_a) {
        var children = _a.children;
        return (<th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider bg-gray-800">
      {children}
    </th>);
    },
    td: function (_a) {
        var children = _a.children;
        return (<td className="px-4 py-3 text-sm border-t border-gray-700">
      {children}
    </td>);
    },
    blockquote: function (_a) {
        var children = _a.children;
        return (<blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-300">
      {children}
    </blockquote>);
    },
    a: function (_a) {
        var children = _a.children, href = _a.href;
        return (<a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
      {children}
    </a>);
    },
    img: function (_a) {
        var src = _a.src, alt = _a.alt;
        return (<img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4" loading="lazy"/>);
    }
};
function MarkdownContent(_a) {
    var content = _a.content;
    return (<react_markdown_1.default remarkPlugins={[remark_gfm_1.default]} rehypePlugins={[rehype_raw_1.default]} components={markdownComponents}>
      {content}
    </react_markdown_1.default>);
}
