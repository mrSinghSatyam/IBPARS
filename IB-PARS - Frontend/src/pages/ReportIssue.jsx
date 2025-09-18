import React, { useState } from 'react';
import axios from 'axios';
import { AlertTriangle, CheckCircle, MapPin, Clock } from 'lucide-react';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    severity: '',
    location: '',
    description: '',
    contactEmail: '',
    affectedServices: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const issueTypes = [
    'Complete Internet Outage',
    'Slow Connection Speed',
    'Intermittent Connectivity',
    'DNS Resolution Issues',
    'Routing Problems',
    'ISP Service Disruption',
    'Network Congestion',
    'Other'
  ];

  const severityLevels = [
    { value: 'low', label: 'Low - Minor inconvenience', color: 'text-green-600' },
    { value: 'medium', label: 'Medium - Noticeable impact', color: 'text-yellow-600' },
    { value: 'high', label: 'High - Significant disruption', color: 'text-orange-600' },
    { value: 'critical', label: 'Critical - Complete service failure', color: 'text-red-600' }
  ];

  const services = [
    'Web Browsing',
    'Email',
    'Video Streaming',
    'Voice Calls (VoIP)',
    'File Sharing',
    'Cloud Services',
    'Gaming',
    'Business Applications'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        affectedServices: checked
          ? [...prev.affectedServices, value]
          : prev.affectedServices.filter(service => service !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/reports', formData);
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit report.');
    }

    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully</h2>
          <p className="text-gray-600 mb-6">
            Thank you for reporting this issue. Our team will investigate and take appropriate action.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                issueType: '',
                severity: '',
                location: '',
                description: '',
                contactEmail: '',
                affectedServices: []
              });
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <AlertTriangle className="h-6 w-6 mr-2 text-orange-500" />
          Report Connectivity Issue
        </h1>
        <p className="text-gray-600 mt-2">
          Help us improve network reliability by reporting connectivity issues in your area.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Type *
              </label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select an issue type</option>
                {issueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level *
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select severity</option>
                {severityLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="City, State, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Affected Services
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {services.map(service => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    value={service}
                    checked={formData.affectedServices.includes(service)}
                    onChange={handleChange}
                    className="rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Describe the issue in detail"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Important Notes:</h3>
                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                  <li>• Reports are processed within 24 hours</li>
                  <li>• Critical issues get immediate attention</li>
                  <li>• You'll receive email updates</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setFormData({
                issueType: '',
                severity: '',
                location: '',
                description: '',
                contactEmail: '',
                affectedServices: []
              })}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
