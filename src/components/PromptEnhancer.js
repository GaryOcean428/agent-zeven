"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptEnhancer = PromptEnhancer;
var react_1 = require("react");
function PromptEnhancer(_a) {
    var onEnhance = _a.onEnhance, activeEnhancement = _a.activeEnhancement;
    var enhancements = [
        {
            name: 'Detailed Reasoning',
            prompt: 'Please provide detailed step-by-step reasoning for your response.'
        },
        {
            name: 'Multiple Approaches',
            prompt: 'Consider multiple approaches and explain the pros and cons of each.'
        },
        {
            name: 'Self-Reflection',
            prompt: 'After providing your response, please reflect on your reasoning and consider potential improvements.'
        },
        {
            name: 'Verification Steps',
            prompt: 'Include steps to verify the correctness of your solution.'
        }
    ];
    return (<div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden w-64">
      {enhancements.map(function (enhancement) { return (<button key={enhancement.name} onClick={function () { return onEnhance(enhancement.prompt); }} className={"w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors ".concat(activeEnhancement === enhancement.prompt ? 'bg-gray-700' : '')}>
          {enhancement.name}
        </button>); })}
    </div>);
}
