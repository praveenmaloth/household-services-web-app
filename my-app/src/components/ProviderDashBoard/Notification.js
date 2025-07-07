import React, { useEffect, useState } from "react";
import { getNotifications } from "../../components/Services/api";
import { List, ListItem, ListItemText, Badge } from "@mui/material";

const Notification = ({ providerId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications(providerId);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <div>
      <h3>Notifications <Badge badgeContent={notifications.length} color="primary" /></h3>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index}>
            <ListItemText primary={notification.message} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Notification;
