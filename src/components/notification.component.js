import React, { useEffect, useState } from 'react';
import { useActionCable, useChannel } from '@aersoftware/react-use-action-cable';
import authHeader from '../services/auth-header';

const NotificationComponent = () => {
  const { actionCable } = useActionCable(`${process.env.REACT_APP_API_ENDPOINT}cable?token=${authHeader().Authorization}`);
  const { subscribe, unsubscribe } = useChannel(actionCable);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const subscription = subscribe(
      { channel: 'NotificationChannel' },
      {
        received: (data) => {
          // Update notification state with the new data
          console.log(data);
          setNotification(data);
        },
      }
    );

    // Unsubscribe when component unmounts
    return () => {
      unsubscribe(subscription);
    };
  }, []);

  return (
    <>
      {/* Render a modal to display notification */}
      {notification && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setNotification(null)}>
              &times;
            </span>
            <h4>Shared by: {notification.author}</h4>
            <h5>{notification.title}</h5>
            <p>{notification.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationComponent;
