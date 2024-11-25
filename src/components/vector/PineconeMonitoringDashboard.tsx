import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { IndexHealth, IndexMetrics, IndexStats } from '../../lib/vector/pinecone-index-manager';
import { PineconeAdvancedManager } from '../../lib/vector/pinecone-advanced-manager';

interface DashboardProps {
  indexName: string;
  manager: PineconeAdvancedManager;
  refreshInterval?: number;
}

export const PineconeMonitoringDashboard: React.FC<DashboardProps> = ({
  indexName,
  manager,
  refreshInterval = 300000 // 5 minutes default
}) => {
  const [health, setHealth] = useState<IndexHealth | null>(null);
  const [metrics, setMetrics] = useState<IndexMetrics | null>(null);
  const [stats, setStats] = useState<IndexStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [currentHealth, currentStats] = await Promise.all([
          manager.monitorHealth(indexName),
          manager.getIndexStats(indexName)
        ]);
        setHealth(currentHealth);
        setStats(currentStats);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [indexName, manager, refreshInterval]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading metrics...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Pinecone Index Monitor: {indexName}</h2>
      
      {/* Health Status */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Health Status</h3>
        <div className={`
          p-4 rounded-lg
          ${health?.status === 'healthy' ? 'bg-green-100' : 
            health?.status === 'degraded' ? 'bg-yellow-100' : 'bg-red-100'}
        `}>
          <div className="flex justify-between items-center">
            <span className="font-medium">Status: {health?.status}</span>
            <span className="text-sm">Last checked: {new Date(health?.lastChecked || 0).toLocaleString()}</span>
          </div>
          
          {/* Issues List */}
          {health?.issues.length ? (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Active Issues:</h4>
              <ul className="space-y-2">
                {health.issues.map((issue, index) => (
                  <li key={index} className={`
                    p-2 rounded
                    ${issue.severity === 'high' ? 'bg-red-50' :
                      issue.severity === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'}
                  `}>
                    <span className="font-medium">{issue.type}</span>: {issue.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-green-600 mt-2">No active issues</p>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Vector Count"
          value={stats?.vectorCount.toLocaleString() || '0'}
        />
        <StatCard
          title="Index Fullness"
          value={`${(stats?.indexFullness || 0) * 100}%`}
          alert={stats?.indexFullness > 0.8}
        />
        <StatCard
          title="Namespaces"
          value={stats?.namespaceCount.toString() || '0'}
        />
        <StatCard
          title="Dimension Count"
          value={stats?.dimensionCount.toString() || '0'}
        />
      </div>

      {/* Performance Metrics */}
      {metrics && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetricsChart
              title="Request Rate"
              data={metrics.totalRequests}
              label="Requests/sec"
            />
            <MetricsChart
              title="Latency"
              data={metrics.averageLatency}
              label="ms"
              alert={metrics.averageLatency > 100}
            />
            <MetricsChart
              title="Error Rate"
              data={metrics.errorRate * 100}
              label="%"
              alert={metrics.errorRate > 0.01}
            />
            <MetricsChart
              title="Throughput"
              data={metrics.throughput}
              label="ops/sec"
            />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-4">
        <button
          onClick={() => manager.optimizeIndex(indexName)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Optimize Index
        </button>
        <button
          onClick={() => manager.createBackup(indexName, { schedule: 'daily', retention: 7 })}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Backup
        </button>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  alert?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, alert }) => (
  <div className={`
    p-4 rounded-lg border
    ${alert ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}
  `}>
    <h4 className="text-sm font-medium text-gray-500">{title}</h4>
    <p className={`
      text-2xl font-bold mt-2
      ${alert ? 'text-red-600' : 'text-gray-900'}
    `}>
      {value}
    </p>
  </div>
);

interface MetricsChartProps {
  title: string;
  data: number;
  label: string;
  alert?: boolean;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ title, data, label, alert }) => (
  <div className={`
    p-4 rounded-lg border
    ${alert ? 'border-red-300' : 'border-gray-200'}
  `}>
    <h4 className="text-sm font-medium text-gray-500 mb-4">{title}</h4>
    <Line
      data={{
        labels: Array(24).fill(''),
        datasets: [{
          label,
          data: Array(24).fill(data),
          borderColor: alert ? '#DC2626' : '#2563EB',
          tension: 0.4
        }]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }}
    />
  </div>
); 