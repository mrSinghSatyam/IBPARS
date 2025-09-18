import React from 'react';
import { Activity, AlertTriangle, Shield, Zap } from 'lucide-react';

const StatsCards = ({ regionData }) => {
  const totalOutages = regionData.reduce((sum, region) => sum + region.activeOutages, 0);
  const criticalRegions = regionData.filter(region => region.status === 'critical').length;
  const averageRisk = regionData.length > 0 
    ? Math.round(regionData.reduce((sum, region) => sum + region.riskLevel, 0) / regionData.length)
    : 0;

  const stats = [
    {
      name: 'System Status',
      value: 'Operational',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      name: 'Average Risk Score',
      value: `${averageRisk}/100`,
      icon: Activity,
      color: averageRisk >= 70 ? 'text-red-600' : averageRisk >= 40 ? 'text-yellow-600' : 'text-green-600',
      bgColor: averageRisk >= 70 ? 'bg-red-50' : averageRisk >= 40 ? 'bg-yellow-50' : 'bg-green-50',
      borderColor: averageRisk >= 70 ? 'border-red-200' : averageRisk >= 40 ? 'border-yellow-200' : 'border-green-200'
    },
    {
      name: 'Active Outages',
      value: totalOutages,
      icon: AlertTriangle,
      color: totalOutages > 5 ? 'text-red-600' : totalOutages > 0 ? 'text-yellow-600' : 'text-green-600',
      bgColor: totalOutages > 5 ? 'bg-red-50' : totalOutages > 0 ? 'bg-yellow-50' : 'bg-green-50',
      borderColor: totalOutages > 5 ? 'border-red-200' : totalOutages > 0 ? 'border-yellow-200' : 'border-green-200'
    },
    {
      name: 'Critical Regions',
      value: criticalRegions,
      icon: Zap,
      color: criticalRegions > 0 ? 'text-red-600' : 'text-green-600',
      bgColor: criticalRegions > 0 ? 'bg-red-50' : 'bg-green-50',
      borderColor: criticalRegions > 0 ? 'border-red-200' : 'border-green-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        
        return (
          <div
            key={stat.name}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-6 transition-all hover:shadow-md`}
          >
            <div className="flex items-center">
              <div className={`${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className={`text-2xl font-semibold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;