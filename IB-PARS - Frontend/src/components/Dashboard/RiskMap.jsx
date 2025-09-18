import React from 'react';
import { MapPin, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const RiskMap = ({ data }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-green-200 bg-green-50';
    }
  };

  const getRiskLevel = (level) => {
    if (level >= 80) return { text: 'Critical', color: 'text-red-600' };
    if (level >= 50) return { text: 'High', color: 'text-yellow-600' };
    if (level >= 30) return { text: 'Medium', color: 'text-blue-600' };
    return { text: 'Low', color: 'text-green-600' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {data.map((region, index) => {
        const risk = getRiskLevel(region.riskLevel);
        
        return (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getStatusColor(region.status)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <h3 className="font-semibold text-gray-900">{region.name}</h3>
              </div>
              {getStatusIcon(region.status)}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Risk Level:</span>
                <span className={`text-sm font-semibold ${risk.color}`}>
                  {risk.text} ({region.riskLevel})
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    region.riskLevel >= 80 ? 'bg-red-500' :
                    region.riskLevel >= 50 ? 'bg-yellow-500' :
                    region.riskLevel >= 30 ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${region.riskLevel}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Active Outages:</span>
                <span className="font-semibold text-gray-900">{region.activeOutages}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RiskMap;