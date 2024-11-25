"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSettings = NotificationSettings;
var react_1 = require("react");
var store_1 = require("../../store");
var Toggle_1 = require("../ui/Toggle");
function NotificationSettings() {
    var _a = (0, store_1.useStore)(), notificationSettings = _a.notificationSettings, setNotificationSettings = _a.setNotificationSettings;
    return (<div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Notification Settings</h3>

        <div className="space-y-6">
          {/* System Notifications */}
          <div>
            <h4 className="text-sm font-medium mb-2">System Notifications</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Error Notifications</span>
                <Toggle_1.Toggle checked={notificationSettings.showErrors} onCheckedChange={function (checked) {
            setNotificationSettings(__assign(__assign({}, notificationSettings), { showErrors: checked }));
        }}/>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Success Notifications</span>
                <Toggle_1.Toggle checked={notificationSettings.showSuccess} onCheckedChange={function (checked) {
            setNotificationSettings(__assign(__assign({}, notificationSettings), { showSuccess: checked }));
        }}/>
              </div>
            </div>
          </div>

          {/* Agent Status Updates */}
          <div>
            <h4 className="text-sm font-medium mb-2">Agent Status Updates</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Agent Assignments</span>
                <Toggle_1.Toggle checked={notificationSettings.showAgentAssignments} onCheckedChange={function (checked) {
            setNotificationSettings(__assign(__assign({}, notificationSettings), { showAgentAssignments: checked }));
        }}/>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Task Completion</span>
                <Toggle_1.Toggle checked={notificationSettings.showTaskCompletion} onCheckedChange={function (checked) {
            setNotificationSettings(__assign(__assign({}, notificationSettings), { showTaskCompletion: checked }));
        }}/>
              </div>
            </div>
          </div>

          {/* Sound Settings */}
          <div>
            <h4 className="text-sm font-medium mb-2">Sound Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Sound Effects</span>
                <Toggle_1.Toggle checked={notificationSettings.soundEnabled} onCheckedChange={function (checked) {
            setNotificationSettings(__assign(__assign({}, notificationSettings), { soundEnabled: checked }));
        }}/>
              </div>
              {notificationSettings.soundEnabled && (<div>
                  <label className="block text-sm mb-2">Volume</label>
                  <input type="range" min="0" max="100" value={notificationSettings.volume} onChange={function (e) { return setNotificationSettings(__assign(__assign({}, notificationSettings), { volume: parseInt(e.target.value) })); }} className="w-full"/>
                  <div className="flex justify-between text-sm text-foreground/60 mt-1">
                    <span>0%</span>
                    <span>{notificationSettings.volume}%</span>
                    <span>100%</span>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
