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
exports.Sidebar = Sidebar;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var useChat_1 = require("../../hooks/useChat");
var export_1 = require("../../utils/export");
var framer_motion_1 = require("framer-motion");
function Sidebar(_a) {
    var activePanel = _a.activePanel, onPanelChange = _a.onPanelChange;
    var _b = (0, react_1.useState)(false), showHistory = _b[0], setShowHistory = _b[1];
    var _c = (0, react_1.useState)(''), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = (0, react_1.useState)([]), selectedTags = _d[0], setSelectedTags = _d[1];
    var _e = (0, useChat_1.useChat)(), savedChats = _e.savedChats, loadChat = _e.loadChat, deleteChat = _e.deleteChat;
    var navigationItems = [
        { id: 'chat', icon: lucide_react_1.MessageSquare, label: 'Chat' },
        { id: 'canvas', icon: lucide_react_1.Palette, label: 'Canvas' },
        { id: 'agent', icon: lucide_react_1.Brain, label: 'Agent' },
        { id: 'tools', icon: lucide_react_1.Wrench, label: 'Tools' },
        { id: 'documents', icon: lucide_react_1.FileText, label: 'Documents' },
        { id: 'settings', icon: lucide_react_1.Settings, label: 'Settings' }
    ];
    var filteredChats = (savedChats === null || savedChats === void 0 ? void 0 : savedChats.filter(function (chat) {
        var matchesSearch = chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.messages.some(function (msg) { return msg.content.toLowerCase().includes(searchTerm.toLowerCase()); });
        var matchesTags = selectedTags.length === 0 ||
            selectedTags.every(function (tag) { var _a; return (_a = chat.tags) === null || _a === void 0 ? void 0 : _a.includes(tag); });
        return matchesSearch && matchesTags;
    })) || [];
    var allTags = Array.from(new Set((savedChats === null || savedChats === void 0 ? void 0 : savedChats.flatMap(function (chat) { return chat.tags || []; })) || []));
    var toggleTag = function (tag) {
        setSelectedTags(function (prev) {
            return prev.includes(tag)
                ? prev.filter(function (t) { return t !== tag; })
                : __spreadArray(__spreadArray([], prev, true), [tag], false);
        });
    };
    return (<div className="h-full bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 flex flex-col">
      {/* Navigation */}
      <div className="flex-1 p-3 space-y-1">
        {navigationItems.map(function (_a) {
            var id = _a.id, Icon = _a.icon, label = _a.label;
            return (<button key={id} onClick={function () { return onPanelChange(id); }} className={"w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ".concat(activePanel === id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50')}>
            <Icon className="w-5 h-5"/>
            <span>{label}</span>
          </button>);
        })}
      </div>

      {/* Chat History */}
      <div className="p-3 border-t border-gray-700/50">
        <button onClick={function () { return setShowHistory(!showHistory); }} className="w-full flex items-center justify-between px-3 py-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-3">
            <lucide_react_1.History className="w-5 h-5"/>
            <span>Chat History</span>
          </div>
          {showHistory ? <lucide_react_1.X className="w-4 h-4"/> : <lucide_react_1.Search className="w-4 h-4"/>}
        </button>

        <framer_motion_1.AnimatePresence>
          {showHistory && (<framer_motion_1.motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="mt-2 overflow-hidden">
              {/* Search */}
              <div className="relative mb-2">
                <input type="text" value={searchTerm} onChange={function (e) { return setSearchTerm(e.target.value); }} placeholder="Search chats..." className="w-full bg-gray-700 rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <lucide_react_1.Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={15}/>
              </div>

              {/* Tags */}
              {allTags.length > 0 && (<div className="flex flex-wrap gap-1 mb-2">
                  {allTags.map(function (tag) { return (<button key={tag} onClick={function () { return toggleTag(tag); }} className={"inline-flex items-center px-2 py-0.5 rounded-full text-xs transition-colors ".concat(selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600')}>
                      <lucide_react_1.Tag className="w-3 h-3 mr-1"/>
                      {tag}
                    </button>); })}
                </div>)}

              {/* Chat List */}
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredChats.map(function (chat) { return (<div key={chat.id} className="group bg-gray-700/50 rounded-lg p-2 hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <button onClick={function () { return loadChat(chat.id); }} className="flex-1 text-left">
                        <h4 className="text-sm font-medium truncate">{chat.title}</h4>
                        <p className="text-xs text-gray-400">
                          {(0, date_fns_1.formatDistanceToNow)(chat.timestamp)} ago
                        </p>
                      </button>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={function () { return (0, export_1.downloadAsDocx)(chat); }} className="p-1 text-gray-400 hover:text-gray-300" title="Export as DOCX">
                          <lucide_react_1.Download className="w-4 h-4"/>
                        </button>
                        <button onClick={function () { return deleteChat(chat.id); }} className="p-1 text-gray-400 hover:text-red-400" title="Delete chat">
                          <lucide_react_1.X className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>
                  </div>); })}
              </div>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>
      </div>
    </div>);
}
