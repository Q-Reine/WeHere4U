"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react"
import "./profile.css"

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Mutoni Claudine",
    email: "mutoni.claudine@example.com",
    phone: "+250 78 123 4567",
    address: "Masoro, Gasabo, Kigali City",
    preferredLanguage: "Kinyarwanda",
    accessibilityNeeds: "Visual impairment, requires high contrast",
  })

  const [editing, setEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({ ...profile })
  const [showNotification, setShowNotification] = useState(false)

  const handleEdit = () => {
    setEditing(true)
    setEditedProfile({ ...profile })
  }

  const handleCancel = () => {
    setEditing(false)
  }

  const handleSave = () => {
    setProfile({ ...editedProfile })
    setEditing(false)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="profile">
      <h2>Your Profile</h2>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User className="avatar-icon" />
          </div>
          <div className="profile-title">
            <h3>{profile.name}</h3>
            <p className="profile-subtitle">Customer</p>
          </div>
          {!editing && (
            <button className="edit-profile-btn" onClick={handleEdit} aria-label="Edit profile">
              <Edit2 className="edit-icon" />
              Edit Profile
            </button>
          )}
        </div>

        {editing ? (
          <div className="profile-edit-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={editedProfile.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={editedProfile.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" value={editedProfile.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={editedProfile.address} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="preferredLanguage">Preferred Language</label>
              <select
                id="preferredLanguage"
                name="preferredLanguage"
                value={editedProfile.preferredLanguage}
                onChange={handleChange}
              >
                <option value="Kinyarwanda">Kinyarwanda</option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Swahili">Swahili</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="accessibilityNeeds">Accessibility Needs</label>
              <textarea
                id="accessibilityNeeds"
                name="accessibilityNeeds"
                value={editedProfile.accessibilityNeeds}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>

            <div className="form-actions">
              <button className="cancel-btn" onClick={handleCancel} aria-label="Cancel editing">
                <X className="action-icon" />
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave} aria-label="Save profile changes">
                <Save className="action-icon" />
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <div className="info-section">
              <h4>Contact Information</h4>
              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <span className="info-label">Email</span>
                  <span className="info-value">{profile.email}</span>
                </div>
              </div>
              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <span className="info-label">Phone</span>
                  <span className="info-value">{profile.phone}</span>
                </div>
              </div>
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <span className="info-label">Address</span>
                  <span className="info-value">{profile.address}</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h4>Preferences</h4>
              <div className="preference-item">
                <span className="preference-label">Preferred Language</span>
                <span className="preference-value">{profile.preferredLanguage}</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Accessibility Needs</span>
                <span className="preference-value">{profile.accessibilityNeeds}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {showNotification && <div className="notification">Profile updated successfully</div>}
    </div>
  )
}

export default Profile

