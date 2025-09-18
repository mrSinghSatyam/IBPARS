import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RiskChart from '../components/Dashboard/RiskChart';
import RiskMap from '../components/Dashboard/RiskMap';
import StatsCards from '../components/Dashboard/StatsCards';
import AlertsPanel from '../components/Dashboard/AlertsPanel';

const Dashboard = () => {
  const [riskData, setRiskData] = useState([]);
  const [regionData, setRegionData] = useState([]);

  // 🧠 Function to fetch real-time risk score prediction from ML model
  const fetchPrediction = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/predict');
      const predictedRisk = res.data.riskScore || Math.floor(Math.random() * 100); // fallback

      setRiskData(prev => [
        ...prev.slice(-23),
        {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          riskScore: predictedRisk
        }
      ]);
    } catch (err) {
      console.error('Prediction fetch error:', err);
    }
  };

  // ⏱️ Call prediction API every 60 seconds
  useEffect(() => {
    fetchPrediction(); // initial call
    const interval = setInterval(fetchPrediction, 60000); // every 60 seconds
    return () => clearInterval(interval);
  }, []);

  // 🌍 Fetch reports from MongoDB backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reports');
        const reports = res.data;
        const regions = groupReportsByRegion(reports);
        setRegionData(regions);
      } catch (err) {
        console.error("Failed to fetch reports", err);
      }
    };
    fetchReports();
  }, []);

  // 📊 Convert report data into region-based structure
  const groupReportsByRegion = (reports) => {
    const grouped = {};

    reports.forEach((report) => {
      const region = report.location || 'Unknown';
      if (!grouped[region]) {
        grouped[region] = {
          name: region,
          riskLevel: 0,
          activeOutages: 0,
          status: 'normal'
        };
      }

      grouped[region].riskLevel += 20;
      grouped[region].activeOutages += 1;

      if (grouped[region].riskLevel >= 80) {
        grouped[region].status = 'critical';
      } else if (grouped[region].riskLevel >= 50) {
        grouped[region].status = 'warning';
      }
    });

    return Object.values(grouped);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-2 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            System Operational
          </span>
        </div>
      </div>

      {/* Cards Section */}
      <StatsCards regionData={regionData} />

      {/* Main Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Real-time Risk Score
            </h2>
            <RiskChart data={riskData} />
          </div>
        </div>

        <div className="space-y-6">
          <AlertsPanel />
        </div>
      </div>

      {/* Risk Map */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Regional Risk Overview
        </h2>
        <RiskMap data={regionData} />
      </div>
    </div>
  );
};

export default Dashboard;
