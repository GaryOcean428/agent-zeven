"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingOverlay = LoadingOverlay;
var react_1 = require("react");
var useLoading_1 = require("../../hooks/useLoading");
var lucide_react_1 = require("lucide-react");
function LoadingOverlay() {
    var _a = (0, useLoading_1.useLoading)(), isLoading = _a.isLoading, message = _a.message;
    if (!isLoading)
        return null;
    return (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" role="alert" aria-busy="true">
      <div className="bg-gray-800 rounded-lg p-6 flex items-center space-x-4">
        <lucide_react_1.Loader className="w-6 h-6 text-blue-400 animate-spin"/>
        <p className="text-lg">{message || 'Loading...'}</p>
      </div>
    </div>);
}
