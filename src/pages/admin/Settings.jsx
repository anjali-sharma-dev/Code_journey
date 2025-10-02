import React, { useState } from "react";
import { Save, RefreshCw, Shield, Bell, Mail, Database } from "lucide-react";

/**
 * AdminSettings component
 * 
 * This component allows administrators to configure system settings.
 */
const AdminSettings = () => {
  // State for different settings sections
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "DSA Practice Companion",
    siteDescription: "A platform for learning and practicing data structures and algorithms",
    maintenanceMode: false,
    allowRegistration: true
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@example.com",
    smtpPassword: "••••••••",
    fromEmail: "noreply@example.com",
    fromName: "DSA Practice Companion"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    notifyOnNewUser: true,
    notifyOnNewQuestion: false,
    dailyDigest: true
  });
  
  const [backupSettings, setBackupSettings] = useState({
    enableAutomaticBackups: true,
    backupFrequency: "daily",
    backupRetention: "30",
    backupLocation: "cloud"
  });
  
  // Handle general settings changes
  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle email settings changes
  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle notification settings changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle backup settings changes
  const handleBackupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBackupSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e, formType) => {
    e.preventDefault();
    
    // Here you would typically call your API to save the settings
    // For now, we'll just show an alert
    alert(`${formType} settings saved successfully!`);
  };
  
  // Trigger a manual backup
  const triggerBackup = () => {
    // Here you would typically call your API to trigger a backup
    // For now, we'll just show an alert
    alert("Manual backup initiated!");
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Settings</h1>
      
      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-[#00b8a3] mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">General Settings</h2>
          </div>
          
          <form onSubmit={(e) => handleSubmit(e, "General")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Description
                </label>
                <input
                  type="text"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={generalSettings.maintenanceMode}
                  onChange={handleGeneralChange}
                  className="h-4 w-4 text-[#00b8a3] focus:ring-[#00b8a3] border-gray-300 rounded"
                />
                <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                  Enable Maintenance Mode
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowRegistration"
                  name="allowRegistration"
                  checked={generalSettings.allowRegistration}
                  onChange={handleGeneralChange}
                  className="h-4 w-4 text-[#00b8a3] focus:ring-[#00b8a3] border-gray-300 rounded"
                />
                <label htmlFor="allowRegistration" className="ml-2 block text-sm text-gray-700">
                  Allow New User Registration
                </label>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center bg-[#00b8a3] text-white px-4 py-2 rounded-md hover:bg-[#00a693] transition-colors"
              >
                <Save className="h-5 w-5 mr-2" />
                Save General Settings
              </button>
            </div>
          </form>
        </div>
        
        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-6 w-6 text-[#00b8a3] mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Email Settings</h2>
          </div>
          
          <form onSubmit={(e) => handleSubmit(e, "Email")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Server
                </label>
                <input
                  type="text"
                  name="smtpServer"
                  value={emailSettings.smtpServer}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Port
                </label>
                <input
                  type="text"
                  name="smtpPort"
                  value={emailSettings.smtpPort}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Username
                </label>
                <input
                  type="text"
                  name="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Password
                </label>
                <input
                  type="text"
                  name="smtpPassword"
                  value={emailSettings.smtpPassword}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Email
                </label>
                <input
                  type="text"
                  name="fromEmail"
                  value={emailSettings.fromEmail}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Name
                </label>
                <input
                  type="text"
                  name="fromName"
                  value={emailSettings.fromName}
                  onChange={handleEmailChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center bg-[#00b8a3] text-white px-4 py-2 rounded-md hover:bg-[#00a693] transition-colors"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Email Settings
              </button>
            </div>
          </form>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-[#00b8a3] mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Notification Settings</h2>
          </div>
          
          <form onSubmit={(e) => handleSubmit(e, "Notification")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enable Email Notifications
                </label>
                <input
                  type="checkbox"
                  id="enableEmailNotifications"
                  checked={notificationSettings.enableEmailNotifications}
                  onChange={handleNotificationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notify on new user
                </label>
                <input
                  type="checkbox"
                  id="notifyOnNewUser"
                  checked={notificationSettings.notifyOnNewUser}
                  onChange={handleNotificationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notify on new question
                </label>
                <input
                  type="checkbox"
                  id="notifyOnNewQuestion"
                  checked={notificationSettings.notifyOnNewQuestion}
                  onChange={handleNotificationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Daily Digest
                </label>
                <input
                  type="checkbox"
                  id="dailyDigest"
                  checked={notificationSettings.dailyDigest}
                  onChange={handleNotificationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center bg-[#00b8a3] text-white px-4 py-2 rounded-md hover:bg-[#00a693] transition-colors"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Notification Settings
              </button>
            </div>
          </form>
        </div>
        
        {/* Backup Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-[#00b8a3] mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Backup Settings</h2>
          </div>
          
          <form onSubmit={(e) => handleSubmit(e, "Backup")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enable Automatic Backups
                </label>
                <input
                  type="checkbox"
                  id="enableAutomaticBackups"
                  checked={backupSettings.enableAutomaticBackups}
                  onChange={handleBackupChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Backup Frequency
                </label>
                <input
                  type="text"
                  name="backupFrequency"
                  value={backupSettings.backupFrequency}
                  onChange={handleBackupChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Backup Retention
                </label>
                <input
                  type="text"
                  name="backupRetention"
                  value={backupSettings.backupRetention}
                  onChange={handleBackupChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Backup Location
                </label>
                <input
                  type="text"
                  name="backupLocation"
                  value={backupSettings.backupLocation}
                  onChange={handleBackupChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b8a3]"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center bg-[#00b8a3] text-white px-4 py-2 rounded-md hover:bg-[#00a693] transition-colors"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Backup Settings
              </button>
            </div>
          </form>
        </div>
        
        {/* Trigger Manual Backup */}
        <div className="flex justify-end">
          <button
            type="button"
            className="flex items-center bg-[#00b8a3] text-white px-4 py-2 rounded-md hover:bg-[#00a693] transition-colors"
          >
            <Save className="h-5 w-5 mr-2" />
            Trigger Manual Backup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;