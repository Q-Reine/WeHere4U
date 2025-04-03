"use client"

import { useState } from "react"
import { Sun, Moon, Bell, Eye, Volume2, Type, Save } from "lucide-react"
import "./settings.css"

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    fontSize: "medium",
    contrast: "normal",
    notifications: true,
    soundEffects: true,
    screenReader: false,
    language: "en",
  })

  const [showNotification, setShowNotification] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleThemeChange = (theme) => {
    setSettings((prev) => ({ ...prev, theme }))
    document.documentElement.setAttribute("data-theme", theme)
  }

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem("userSettings", JSON.stringify(settings))
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const fontSizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
    { value: "x-large", label: "Extra Large" },
  ]

  const contrastOptions = [
    { value: "normal", label: "Normal" },
    { value: "high", label: "High Contrast" },
  ]

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "rw", label: "Kinyarwanda" },
    { value: "fr", label: "French" },
    { value: "sw", label: "Swahili" },
  ]

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="settings-card">
        <div className="settings-section">
          <h3>Appearance</h3>

          <div className="theme-selector">
            <h4>Theme</h4>
            <div className="theme-options">
              <button
                className={`theme-option ${settings.theme === "light" ? "active" : ""}`}
                onClick={() => handleThemeChange("light")}
                aria-label="Light theme"
              >
                <Sun className="theme-icon" />
                <span>Light</span>
              </button>
              <button
                className={`theme-option ${settings.theme === "dark" ? "active" : ""}`}
                onClick={() => handleThemeChange("dark")}
                aria-label="Dark theme"
              >
                <Moon className="theme-icon" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <Type className="setting-icon" />
              <span>Font Size</span>
            </div>
            <div className="setting-control">
              <select name="fontSize" value={settings.fontSize} onChange={handleChange} aria-label="Select font size">
                {fontSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <Eye className="setting-icon" />
              <span>Contrast</span>
            </div>
            <div className="setting-control">
              <select
                name="contrast"
                value={settings.contrast}
                onChange={handleChange}
                aria-label="Select contrast level"
              >
                {contrastOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Accessibility</h3>

          <div className="setting-item">
            <div className="setting-label">
              <Volume2 className="setting-icon" />
              <span>Sound Effects</span>
            </div>
            <div className="setting-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  name="soundEffects"
                  checked={settings.soundEffects}
                  onChange={handleChange}
                  aria-label="Toggle sound effects"
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <Bell className="setting-icon" />
              <span>Notifications</span>
            </div>
            <div className="setting-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  aria-label="Toggle notifications"
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-label">
              <Eye className="setting-icon" />
              <span>Screen Reader Compatible</span>
            </div>
            <div className="setting-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  name="screenReader"
                  checked={settings.screenReader}
                  onChange={handleChange}
                  aria-label="Toggle screen reader compatibility"
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Language</h3>

          <div className="setting-item">
            <div className="setting-label">
              <span>Display Language</span>
            </div>
            <div className="setting-control">
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                aria-label="Select display language"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="save-settings-btn" onClick={handleSave} aria-label="Save settings">
            <Save className="save-icon" />
            Save Settings
          </button>
        </div>
      </div>

      {showNotification && <div className="notification">Settings saved successfully</div>}
    </div>
  )
}

export default Settings