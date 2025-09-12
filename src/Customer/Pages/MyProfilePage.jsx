import React, { useState } from "react";
import Navbar from "../Components/Navigation/Navbar";
import "../Styles/MyProfilePage.css";

const MyProfilePage = () => {
  // Mock user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    addresses: [
      {
        id: 1,
        line1: "123 Main Street",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        country: "India",
      },
      {
        id: 2,
        line1: "456 Second Street",
        city: "Noida",
        state: "Uttar Pradesh",
        pincode: "201301",
        country: "India",
      },
    ],
  });

  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState(user);
  const [activeTab, setActiveTab] = useState("profile");

  // Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = () => {
    setUser(profileForm);
    setEditMode(false);
    alert("Profile updated!");
  };

  const handleAddressDelete = (id) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
  };

  const handleNotificationChange = (name) => {
    setNotifications((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      <Navbar />
      <main className={`profile-page ${darkMode ? "dark" : ""}`}>
        <h1 className="profile-title">My Profile</h1>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile Info
          </button>
          <button
            className={activeTab === "addresses" ? "active" : ""}
            onClick={() => setActiveTab("addresses")}
          >
            Addresses
          </button>
          <button
            className={activeTab === "preferences" ? "active" : ""}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
        </div>

        {/* Profile Info */}
        {activeTab === "profile" && (
          <section className="profile-section">
            <h2>Profile Information</h2>
            {editMode ? (
              <div className="profile-form">
                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  placeholder="Phone Number"
                />
                <button onClick={handleProfileSave}>Save Profile</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            ) : (
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <button onClick={() => setEditMode(true)}>Edit Profile</button>
              </div>
            )}
          </section>
        )}

        {/* Saved Addresses */}
        {activeTab === "addresses" && (
          <section className="profile-section">
            <h2>Saved Addresses</h2>
            <div className="addresses-list">
              {user.addresses.map((a) => (
                <div key={a.id} className="address-card">
                  <p>{a.line1}</p>
                  <p>
                    {a.city}, {a.state} - {a.pincode}
                  </p>
                  <p>{a.country}</p>
                  <button onClick={() => handleAddressDelete(a.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Preferences */}
        {activeTab === "preferences" && (
          <section className="profile-section preferences-section">
            <h2>Preferences</h2>

            {/* Theme Toggle */}
            <div className="pref-item">
              <span>Dark Mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode((prev) => !prev)}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Notifications */}
            <div className="notifications">
              <h3>Notification Preferences</h3>
              <div className="pref-item">
                <span>Email Updates</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange("email")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="pref-item">
                <span>SMS Alerts</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={() => handleNotificationChange("sms")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="pref-item">
                <span>Push Notifications</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange("push")}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default MyProfilePage;
