import React, { useEffect, useState } from 'react';
import { Brain, Activity, Database, Code, Users, RefreshCw } from 'lucide-react';
import { agentSystem } from '../../lib/agents/agent-system';
import { thoughtLogger } from '../../lib/logging/thought-logger';
import { useToast } from '../../hooks/useToast';
import { motion } from 'framer-motion';

interface AgentStats {
  activeAgents: number;
  completedTasks: number;
  averageResponseTime: number;
  memoryUsage: number;
  uptime: number;
}

export function AgentPanel() {
  const [stats, setStats] = useState<AgentStats>({
    activeAgents: 0,
    completedTasks: 0,
    averageResponseTime: 0,
    memoryUsage: 0,
    uptime: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { addToast } = useToast();

  const fetchStats = async () => {
    try {
      setIsRefreshing(true);
      
      // Get agent system stats
      const agents = agentSystem.getAgents();
      const activeCount = agents.filter(a => a.getState().status === 'active').length;
      const completedTasks = agents.reduce((sum, a) => sum + a.getState().metrics.tasksCompleted, 0);
      const avgResponseTime = agents.reduce((sum, a) => sum + a.getState().metrics.averageResponseTime, 0) / Math.max(agents.length, 1);
      
      // Get memory usage
      const memoryUsage = await thoughtLogger.getMemoryUsage();

      setStats({
        activeAgents: activeCount,
        completedTasks,
        averageResponseTime: avgResponseTime,
        memoryUsage,
        uptime: Date.now() - agentSystem.getStartTime()
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to fetch agent stats',
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Agent System</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage agent activities</p>
          </div>
          <button
            onClick={fetchStats}
            disabled={isRefreshing}
            className="p-2 text-muted-foreground hover:text-foreground rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            label="Active Agents"
            value={stats.activeAgents}
            loading={isLoading}
          />
          <StatCard
            icon={Activity}
            label="Tasks Completed"
            value={stats.completedTasks}
            loading={isLoading}
          />
          <StatCard
            icon={Code}
            label="Avg Response Time"
            value={`${stats.averageResponseTime.toFixed(2)}ms`}
            loading={isLoading}
          />
          <StatCard
            icon={Database}
            label="Memory Usage"
            value={`${(stats.memoryUsage / 1024 / 1024).toFixed(2)} MB`}
            loading={isLoading}
          />
        </div>

        {/* Agent Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-lg font-medium mb-4">Active Agents</h2>
            <div className="space-y-4">
              {agentSystem.getAgents().map(agent => (
                <div
                  key={agent.getId()}
                  className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{agent.getName()}</h3>
                    <p className="text-sm text-muted-foreground">{agent.getRole()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      agent.getState().status === 'active' 
                        ? 'bg-green-400' 
                        : 'bg-gray-400'
                    }`} />
                    <span className="text-sm">{agent.getState().status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-medium mb-4">System Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Agent System</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Memory System</span>
                <span className="text-green-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Task Planner</span>
                <span className="text-green-400">Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Model Router</span>
                <span className="text-green-400">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  loading 
}: { 
  icon: typeof Brain;
  label: string;
  value: string | number;
  loading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-secondary rounded w-24" />
            <div className="h-4 bg-secondary rounded w-16 mt-2" />
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </>
        )}
      </div>
    </motion.div>
  );
}