"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResults = SearchResults;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var SearchContext_1 = require("../context/SearchContext");
var framer_motion_1 = require("framer-motion");
var MarkdownContent_1 = require("./MarkdownContent");
function SearchResults() {
    var _a = (0, SearchContext_1.useSearch)(), results = _a.results, isStreaming = _a.isStreaming;
    if (results.length === 0) {
        return (<div className="text-center text-muted-foreground py-12">
        <p>Start searching to see results</p>
      </div>);
    }
    return (<div className="space-y-6">
      <framer_motion_1.AnimatePresence mode="wait">
        {results.map(function (result, index) { return (<framer_motion_1.motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-secondary rounded-lg p-6">
            {result.type === 'answer' ? (<div className="prose prose-invert max-w-none">
                <MarkdownContent_1.MarkdownContent content={result.content}/>
              </div>) : (<div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{result.title}</h3>
                  {result.url && (<a href={result.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                      <lucide_react_1.ExternalLink className="w-5 h-5"/>
                    </a>)}
                </div>
                <p className="text-foreground/80">{result.content}</p>
                {result.url && (<p className="text-muted-foreground text-sm">{result.url}</p>)}
              </div>)}
          </framer_motion_1.motion.div>); })}
      </framer_motion_1.AnimatePresence>
    </div>);
}
