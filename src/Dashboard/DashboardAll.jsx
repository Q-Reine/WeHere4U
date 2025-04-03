// Dashboard.jsx - Main dashboard component

import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Button, ProgressBar, Form } from 'react-bootstrap';
import { FaUser, FaHistory, FaBookmark, FaComments, FaDonate, FaAccessibleIcon, FaCog } from 'react-icons/fa';

function DashboardAll() 
 {
  // Sample user data (would come from API/backend in a real implementation)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/api/placeholder/100/100',
    joinDate: 'January 15, 2024',
    orders: [
      { id: 'ORD-2024-001', date: 'Feb 20, 2025', items: ['Premium Course Access'], status: 'Completed', total: '$129.99' },
      { id: 'ORD-2024-002', date: 'Mar 05, 2025', items: ['Resource Bundle', 'Workshop Registration'], status: 'Processing', total: '$79.99' }
    ],
    savedResources: [
      { id: 1, title: 'Intro to Web Development', type: 'Course', dateAdded: 'Jan 25, 2025' },
      { id: 2, title: 'React Performance Tips', type: 'Article', dateAdded: 'Mar 01, 2025' }
    ],
    forumActivity: [
      { id: 'post-001', title: 'Help with React Router', date: 'Feb 15, 2025', replies: 3 },
      { id: 'post-002', title: 'Best practices for state management', date: 'Mar 10, 2025', replies: 5 }
    ],
    campaigns: [
      { id: 'camp-001', title: 'Coding for Kids Workshop', target: 5000, raised: 3750, endDate: 'Apr 30, 2025', donors: 42 },
      { id: 'camp-002', title: 'Open Source Development Fund', target: 10000, raised: 2500, endDate: 'May 15, 2025', donors: 28 }
    ]
  });

  // State for accessibility settings
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    reducedMotion: false,
    readAloud: false
  });

  // Handle accessibility setting changes
  const handleSettingChange = (setting, value) => {
    setAccessibilitySettings({
      ...accessibilitySettings,
      [setting]: value
    });
    
    // Apply settings (this would be more sophisticated in a real implementation)
    if (setting === 'fontSize') {
      document.body.style.fontSize = 
        value === 'small' ? '0.9rem' : 
        value === 'large' ? '1.2rem' : '1rem';
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">User Dashboard</h2>
      
      <Row>
        {/* Sidebar with user info */}
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <img 
                src={user.avatar} 
                alt="User profile" 
                className="rounded-circle mb-3" 
                width="100" 
              />
              <h5>{user.name}</h5>
              <p className="text-muted small">{user.email}</p>
              <p className="text-muted small">Member since: {user.joinDate}</p>
              <Button variant="outline-primary" size="sm" className="w-100">Edit Profile</Button>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body className="p-0">
              <Nav variant="pills" className="flex-column">
                <Nav.Link href="#profile" className="d-flex align-items-center px-3 py-2">
                  <FaUser className="me-2" /> Profile
                </Nav.Link>
                <Nav.Link href="#orders" className="d-flex align-items-center px-3 py-2">
                  <FaHistory className="me-2" /> Order History
                </Nav.Link>
                <Nav.Link href="#resources" className="d-flex align-items-center px-3 py-2">
                  <FaBookmark className="me-2" /> Saved Resources
                </Nav.Link>
                <Nav.Link href="#forum" className="d-flex align-items-center px-3 py-2">
                  <FaComments className="me-2" /> Forum Activity
                </Nav.Link>
                <Nav.Link href="#campaigns" className="d-flex align-items-center px-3 py-2">
                  <FaDonate className="me-2" /> Donation Campaigns
                </Nav.Link>
                <Nav.Link href="#accessibility" className="d-flex align-items-center px-3 py-2">
                  <FaAccessibleIcon className="me-2" /> Accessibility
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        
        {/* Main content area */}
        <Col md={9}>
          <Tab.Container id="dashboard-tabs" defaultActiveKey="profile">
            <Tab.Content>
              {/* Profile Section */}
              <Tab.Pane eventKey="profile">
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">Personal Information</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" value={user.name} />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={user.email} />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Button variant="primary">Save Changes</Button>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              {/* Order History Section */}
              <Tab.Pane eventKey="orders">
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Order History</h5>
                  </Card.Header>
                  <Card.Body>
                    {user.orders.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Date</th>
                              <th>Items</th>
                              <th>Status</th>
                              <th>Total</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.orders.map(order => (
                              <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.items.join(', ')}</td>
                                <td>
                                  <span className={`badge bg-${order.status === 'Completed' ? 'success' : 'warning'}`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td>{order.total}</td>
                                <td>
                                  <Button variant="outline-secondary" size="sm">Details</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-muted">No orders found</p>
                    )}
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              {/* Saved Resources Section */}
              <Tab.Pane eventKey="resources">
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Saved Resources</h5>
                  </Card.Header>
                  <Card.Body>
                    {user.savedResources.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Type</th>
                              <th>Date Added</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.savedResources.map(resource => (
                              <tr key={resource.id}>
                                <td>{resource.title}</td>
                                <td>{resource.type}</td>
                                <td>{resource.dateAdded}</td>
                                <td>
                                  <Button variant="outline-primary" size="sm" className="me-1">View</Button>
                                  <Button variant="outline-danger" size="sm">Remove</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-muted">No saved resources</p>
                    )}
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              {/* Forum Activity Section */}
              <Tab.Pane eventKey="forum">
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Forum Activity</h5>
                  </Card.Header>
                  <Card.Body>
                    {user.forumActivity.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Topic</th>
                              <th>Date</th>
                              <th>Replies</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.forumActivity.map(post => (
                              <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.date}</td>
                                <td>{post.replies}</td>
                                <td>
                                  <Button variant="outline-primary" size="sm">View Thread</Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-muted">No forum activity</p>
                    )}
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              {/* Donation Campaigns Section */}
              <Tab.Pane eventKey="campaigns">
                <Card className="mb-4">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Your Donation Campaigns</h5>
                    <Button variant="primary" size="sm">Create New Campaign</Button>
                  </Card.Header>
                  <Card.Body>
                    {user.campaigns.length > 0 ? (
                      <Row>
                        {user.campaigns.map(campaign => (
                          <Col md={6} key={campaign.id} className="mb-4">
                            <Card>
                              <Card.Body>
                                <h6>{campaign.title}</h6>
                                <div className="d-flex justify-content-between my-2">
                                  <small className="text-muted">Raised: ${campaign.raised}</small>
                                  <small className="text-muted">Goal: ${campaign.target}</small>
                                </div>
                                <ProgressBar 
                                  now={Math.round((campaign.raised / campaign.target) * 100)} 
                                  label={`${Math.round((campaign.raised / campaign.target) * 100)}%`}
                                  className="mb-3"
                                />
                                <div className="d-flex justify-content-between mb-3">
                                  <small className="text-muted">{campaign.donors} donors</small>
                                  <small className="text-muted">Ends: {campaign.endDate}</small>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <Button variant="outline-secondary" size="sm">Edit</Button>
                                  <Button variant="outline-primary" size="sm">Share</Button>
                                  <Button variant="outline-success" size="sm">Analytics</Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <p className="text-center text-muted">No campaigns found</p>
                    )}
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              {/* Accessibility Settings Section */}
              <Tab.Pane eventKey="accessibility">
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Accessibility Settings</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-4">
                        <Form.Label>Text Size</Form.Label>
                        <div className="d-flex">
                          {['small', 'medium', 'large'].map(size => (
                            <Form.Check
                              key={size}
                              type="radio"
                              id={`font-size-${size}`}
                              label={size.charAt(0).toUpperCase() + size.slice(1)}
                              name="fontSize"
                              className="me-3"
                              checked={accessibilitySettings.fontSize === size}
                              onChange={() => handleSettingChange('fontSize', size)}
                            />
                          ))}
                        </div>
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Contrast Mode</Form.Label>
                        <div className="d-flex">
                          {['normal', 'high'].map(contrast => (
                            <Form.Check
                              key={contrast}
                              type="radio"
                              id={`contrast-${contrast}`}
                              label={contrast.charAt(0).toUpperCase() + contrast.slice(1)}
                              name="contrast"
                              className="me-3"
                              checked={accessibilitySettings.contrast === contrast}
                              onChange={() => handleSettingChange('contrast', contrast)}
                            />
                          ))}
                        </div>
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Check
                          type="switch"
                          id="reduced-motion"
                          label="Reduce Motion"
                          checked={accessibilitySettings.reducedMotion}
                          onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Check
                          type="switch"
                          id="read-aloud"
                          label="Screen Reader Support (Enhanced Labels)"
                          checked={accessibilitySettings.readAloud}
                          onChange={(e) => handleSettingChange('readAloud', e.target.checked)}
                        />
                      </Form.Group>
                      
                      <Button variant="primary">Save Preferences</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardAll;