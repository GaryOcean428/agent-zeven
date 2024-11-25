"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentList = DocumentList;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
function DocumentList(_a) {
    var documents = _a.documents, viewMode = _a.viewMode, isLoading = _a.isLoading, selectedTags = _a.selectedTags, onTagSelect = _a.onTagSelect, onRefresh = _a.onRefresh, onSearch = _a.onSearch;
    var _b = react_1.default.useState(''), searchQuery = _b[0], setSearchQuery = _b[1];
    var allTags = Array.from(new Set(documents.flatMap(function (doc) { return doc.tags; }))).sort();
    var handleTagClick = function (tag) {
        if (selectedTags.includes(tag)) {
            onTagSelect(selectedTags.filter(function (t) { return t !== tag; }));
        }
        else {
            onTagSelect(__spreadArray(__spreadArray([], selectedTags, true), [tag], false));
        }
    };
    var handleSearch = function (e) {
        e.preventDefault();
        onSearch(searchQuery);
    };
    var clearSearch = function () {
        setSearchQuery('');
        onSearch('');
    };
    if (isLoading) {
        return (<div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"/>
      </div>);
    }
    return (<div className="h-full flex flex-col lg:flex-row">
      {/* Tag Sidebar */}
      <div className="w-full lg:w-64 bg-gray-800/50 backdrop-blur-sm p-4 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-700/50">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Document Tags</h3>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {allTags.map(function (tag) { return (<button key={tag} onClick={function () { return handleTagClick(tag); }} className={"px-3 py-1.5 rounded text-sm transition-colors ".concat(selectedTags.includes(tag)
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-700')} title={"Filter by tag: ".concat(tag)} aria-label={"Filter by tag: ".concat(tag)}>
              <div className="flex items-center">
                <lucide_react_1.Tag size={12} className="mr-1"/>
                <span>{tag}</span>
                {selectedTags.includes(tag) && (<span className="ml-auto text-xs bg-blue-500 px-1.5 rounded-full">
                    {documents.filter(function (d) { return d.tags.includes(tag); }).length}
                  </span>)}
              </div>
            </button>); })}
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input type="text" value={searchQuery} onChange={function (e) { return setSearchQuery(e.target.value); }} placeholder="Search documents..." className="w-full bg-gray-800/50 text-gray-100 rounded-lg pl-10 pr-10 py-2 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
            {searchQuery && (<button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300" title="Clear search" aria-label="Clear search">
                <lucide_react_1.X size={18}/>
              </button>)}
          </div>
        </form>

        {documents.length === 0 ? (<div className="text-center text-gray-400 mt-12">
            <lucide_react_1.FileText className="w-12 h-12 mx-auto mb-4 opacity-50"/>
            <p>No documents found</p>
          </div>) : viewMode === 'grid' ? (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map(function (doc) { return (<DocumentCard key={doc.id} document={doc}/>); })}
          </div>) : (<div className="space-y-2">
            {documents.map(function (doc) { return (<DocumentRow key={doc.id} document={doc}/>); })}
          </div>)}
      </div>
    </div>);
}
function DocumentCard(_a) {
    var document = _a.document;
    return (<div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-800/70 transition-colors border border-gray-700/50">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <lucide_react_1.FileText className="w-5 h-5 text-blue-400 flex-shrink-0"/>
          <div>
            <h3 className="font-medium text-gray-100 truncate">{document.name}</h3>
            <p className="text-sm text-gray-400">
              {(0, date_fns_1.formatDistanceToNow)(document.createdAt)} ago
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-gray-300" title="Open Document" aria-label="Open Document">
            <lucide_react_1.ExternalLink size={16}/>
          </button>
          <button className="text-gray-400 hover:text-red-400" title="Delete Document" aria-label="Delete Document">
            <lucide_react_1.Trash2 size={16}/>
          </button>
        </div>
      </div>
      {document.tags.length > 0 && (<div className="mt-3 flex flex-wrap gap-2">
          {document.tags.map(function (tag) { return (<span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600/50">
              <lucide_react_1.Tag size={12} className="mr-1"/>
              {tag}
            </span>); })}
        </div>)}
    </div>);
}
function DocumentRow(_a) {
    var document = _a.document;
    return (<div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 hover:bg-gray-800/70 transition-colors border border-gray-700/50">
      <div className="flex items-center space-x-3">
        <lucide_react_1.FileText className="w-5 h-5 text-blue-400"/>
        <div>
          <h3 className="font-medium text-gray-100">{document.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>{(0, date_fns_1.formatDistanceToNow)(document.createdAt)} ago</span>
            {document.tags.length > 0 && (<>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  {document.tags.map(function (tag) { return (<span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-700/50 border border-gray-600/50">
                      {tag}
                    </span>); })}
                </div>
              </>)}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-400 hover:text-gray-300 rounded" title="Open Document" aria-label="Open Document">
          <lucide_react_1.ExternalLink size={16}/>
        </button>
        <button className="p-2 text-gray-400 hover:text-red-400 rounded" title="Delete Document" aria-label="Delete Document">
          <lucide_react_1.Trash2 size={16}/>
        </button>
      </div>
    </div>);
}
