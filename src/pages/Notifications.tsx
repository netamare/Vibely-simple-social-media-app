import { useEffect } from 'react';
import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { Avatar } from '../components';
import { Layout } from '../components/Layout';
import { useApp } from '../store';

const notificationMeta = { like: [Heart, 'liked your post'], comment: [MessageCircle, 'commented on your post'], follow: [UserPlus, 'started following you'] } as const;
export function Notifications() {
  const { notifications, users, markRead } = useApp();
  useEffect(() => { markRead(); }, []);
  return <Layout><header className="page-title row"><div><h1>Notifications</h1><p>All caught up with your people.</p></div><Bell/></header><div className="notifications">{notifications.map(notification => { const user = users.find(item => item.id === notification.fromId)!; const [Icon, text] = notificationMeta[notification.type]; return <div className={!notification.read ? 'notification unread' : 'notification'} key={notification.id}><Avatar user={user}/><div><b>{user.name}</b> {text}<small>{notification.createdAt}</small></div><span className={'notification-icon ' + notification.type}><Icon size={16}/></span></div>; })}</div></Layout>;
}
