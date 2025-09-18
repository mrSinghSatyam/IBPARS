import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Generate dummy alerts
    const generateAlerts = () => {
      const alertTypes = [
        { type: 'warning', icon: AlertTriangle, message: 'High latency detected in Asia Pacific region' },
        { type: 'info', icon: Info, message: 'Scheduled maintenance in Europe region at 2:00 AM UTC' },
        { type: 'success', icon: CheckCircle, message: 'Network connectivity restored in North America' },
        { type: 'warning', icon: AlertTriangle, message: 'Unusual traffic patterns detected in Middle East' },
      ];

      return alertTypes.map((alert, index) => ({
        id: index,
        ...alert,
        timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
        dismissed: false
      }));
    };

    setAlerts(generateAlerts());
  }, []);

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'text-yellow-600',
          text: 'text-yellow-800'
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          text: 'text-blue-800'
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          text: 'text-green-800'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'text-gray-600',
          text: 'text-gray-800'
        };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Recent Alerts
        </h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {alerts.length}
        </span>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No active alerts</p>
        ) : (
          alerts.map((alert) => {
            const styles = getAlertStyles(alert.type);
            const Icon = alert.icon;

            return (
              <div
                key={alert.id}
                className={`${styles.bg} ${styles.border} border rounded-lg p-4 transition-all hover:shadow-sm`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 ${styles.icon} mt-0.5`} />
                    <div className="flex-1">
                      <p className={`text-sm ${styles.text}`}>{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;