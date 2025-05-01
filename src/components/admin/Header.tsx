
import React, { useState } from "react";
import { Bell, User, Search, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const notifications = [
  {
    id: 1,
    message: "New order #12345 received",
    time: "10 mins ago",
    read: false,
  },
  {
    id: 2,
    message: "Product stock low: Gold Traditional Necklace",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    message: "Monthly sales report available",
    time: "5 hours ago",
    read: true,
  }
];

const AdminHeader = () => {
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter(n => !n.read).length
  );
  const [notificationsList, setNotificationsList] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotificationsList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  const clearNotification = (id: number) => {
    const notification = notificationsList.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotificationsList(prev => 
      prev.filter(n => n.id !== id)
    );
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center px-6">
      <div className="flex-1">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="p-3 border-b flex items-center justify-between">
              <h3 className="font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notificationsList.length > 0 ? (
                notificationsList.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 border-b last:border-0 relative ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <button 
                      onClick={() => clearNotification(notification.id)}
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={14} />
                    </button>
                    <div 
                      className="pr-5 cursor-pointer" 
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={18} className="text-gray-600" />
          </div>
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
