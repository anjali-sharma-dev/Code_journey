import React, { useState } from "react";
import { Save, Shield, Bell, Mail, Database } from "lucide-react";

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "DSA Practice Companion",
    siteDescription:
      "A platform for learning and practicing data structures and algorithms",
    maintenanceMode: false,
    allowRegistration: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@example.com",
    smtpPassword: "",
    fromEmail: "noreply@example.com",
    fromName: "DSA Practice Companion",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    notifyOnNewUser: true,
    notifyOnNewQuestion: false,
    dailyDigest: true,
  });

  const [backupSettings, setBackupSettings] = useState({
    enableAutomaticBackups: true,
    backupFrequency: "daily",
    backupRetention: "30",
    backupLocation: "cloud",
  });

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleBackupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBackupSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    alert(`${formType} settings saved successfully!`);
  };

  const triggerBackup = () => {
    alert("Manual backup initiated!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">Admin Settings</h1>

      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-cyan-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-100">
              General Settings
            </h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e, "General")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <inputField
                label="Site Name"
                name="siteName"
                value={generalSettings.siteName}
                onChange={handleGeneralChange}
              />
              <inputField
                label="Site Description"
                name="siteDescription"
                value={generalSettings.siteDescription}
                onChange={handleGeneralChange}
              />
            </div>
            <div className="space-y-3 mb-4">
              <checkboxField
                label="Enable Maintenance Mode"
                name="maintenanceMode"
                checked={generalSettings.maintenanceMode}
                onChange={handleGeneralChange}
              />
              <checkboxField
                label="Allow New User Registration"
                name="allowRegistration"
                checked={generalSettings.allowRegistration}
                onChange={handleGeneralChange}
              />
            </div>
            <formButton text="Save General Settings" />
          </form>
        </div>

        {/* Email Settings */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-6 w-6 text-cyan-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-100">Email Settings</h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e, "Email")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <inputField
                label="SMTP Server"
                name="smtpServer"
                value={emailSettings.smtpServer}
                onChange={handleEmailChange}
              />
              <inputField
                label="SMTP Port"
                name="smtpPort"
                value={emailSettings.smtpPort}
                onChange={handleEmailChange}
              />
              <inputField
                label="SMTP Username"
                name="smtpUsername"
                value={emailSettings.smtpUsername}
                onChange={handleEmailChange}
              />
              <inputField
                label="SMTP Password"
                name="smtpPassword"
                type="password"
                value={emailSettings.smtpPassword}
                onChange={handleEmailChange}
              />
              <inputField
                label="From Email"
                name="fromEmail"
                value={emailSettings.fromEmail}
                onChange={handleEmailChange}
              />
              <inputField
                label="From Name"
                name="fromName"
                value={emailSettings.fromName}
                onChange={handleEmailChange}
              />
            </div>
            <formButton text="Save Email Settings" />
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-cyan-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-100">
              Notification Settings
            </h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e, "Notification")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <checkboxField
                label="Enable Email Notifications"
                name="enableEmailNotifications"
                checked={notificationSettings.enableEmailNotifications}
                onChange={handleNotificationChange}
              />
              <checkboxField
                label="Notify on new user"
                name="notifyOnNewUser"
                checked={notificationSettings.notifyOnNewUser}
                onChange={handleNotificationChange}
              />
              <checkboxField
                label="Notify on new question"
                name="notifyOnNewQuestion"
                checked={notificationSettings.notifyOnNewQuestion}
                onChange={handleNotificationChange}
              />
              <checkboxField
                label="Daily Digest"
                name="dailyDigest"
                checked={notificationSettings.dailyDigest}
                onChange={handleNotificationChange}
              />
            </div>
            <formButton text="Save Notification Settings" />
          </form>
        </div>

        {/* Backup Settings */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-cyan-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-100">Backup Settings</h2>
          </div>
          <form onSubmit={(e) => handleSubmit(e, "Backup")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <checkboxField
                label="Enable Automatic Backups"
                name="enableAutomaticBackups"
                checked={backupSettings.enableAutomaticBackups}
                onChange={handleBackupChange}
              />
              <inputField
                label="Backup Frequency"
                name="backupFrequency"
                value={backupSettings.backupFrequency}
                onChange={handleBackupChange}
              />
              <inputField
                label="Backup Retention (days)"
                name="backupRetention"
                value={backupSettings.backupRetention}
                onChange={handleBackupChange}
              />
              <inputField
                label="Backup Location"
                name="backupLocation"
                value={backupSettings.backupLocation}
                onChange={handleBackupChange}
              />
            </div>
            <formButton text="Save Backup Settings" />
          </form>
        </div>

        <div className="flex justify-end">
          <button
            onClick={triggerBackup}
            className="flex items-center bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-400 text-white"
          >
            <Database className="h-5 w-5 mr-2" />
            Trigger Manual Backup
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const inputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
    />
  </div>
);

const checkboxField = ({ label, name, checked, onChange }) => (
  <label className="flex items-center">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-cyan-400 border-gray-600 rounded"
    />
    <span className="ml-2 text-sm">{label}</span>
  </label>
);

const formButton = ({ text }) => (
  <div className="flex justify-end">
    <button
      type="submit"
      className="flex items-center bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-400 text-white"
    >
      <Save className="h-5 w-5 mr-2" />
      {text}
    </button>
  </div>
);

export default Settings;
