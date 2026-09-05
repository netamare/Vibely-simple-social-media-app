import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { seedNotifications, seedPosts, seedUsers } from './data';
import type { Notification, Post, User } from './types';

type Store = {
  users: User[]; posts: Post[]; notifications: Notification[]; currentUser: User; dark: boolean; loggedIn: boolean;
  login: (email: string) => void; register: (name: string, username: string) => void; logout: () => void; toggleDark: () => void;
  createPost: (text: string, image?: string) => void; deletePost: (id: string) => void; toggleLike: (id: string) => void;
  comment: (id: string, text: string) => void; toggleFollow: (id: string) => void; editProfile: (value: Pick<User, 'name' | 'bio' | 'avatar'>) => void; markRead: () => void;
};
const AppContext = createContext<Store | null>(null);
const load = <T,>(key: string, fallback: T): T => { try { return JSON.parse(localStorage.getItem(key) || '') as T; } catch { return fallback; } };

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState(() => load('vibely_users', seedUsers));
  const [posts, setPosts] = useState(() => load('vibely_posts', seedPosts));
  const [notifications, setNotifications] = useState(() => load('vibely_notifications', seedNotifications));
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('vibely_logged') === 'true');
  const [dark, setDark] = useState(() => localStorage.getItem('vibely_dark') === 'true');

  useEffect(() => { localStorage.setItem('vibely_users', JSON.stringify(users)); localStorage.setItem('vibely_posts', JSON.stringify(posts)); localStorage.setItem('vibely_notifications', JSON.stringify(notifications)); }, [users, posts, notifications]);
  useEffect(() => { localStorage.setItem('vibely_dark', String(dark)); document.documentElement.classList.toggle('dark', dark); }, [dark]);
  const currentUser = users.find(user => user.id === 'me')!;
  const notify = (type: Notification['type'], fromId: string, postId?: string) => setNotifications(items => [{ id: crypto.randomUUID(), type, fromId, postId, read: false, createdAt: 'now' }, ...items]);

  const value: Store = {
    users, posts, notifications, currentUser, dark, loggedIn,
    login: () => { setLoggedIn(true); localStorage.setItem('vibely_logged', 'true'); },
    register: (name, username) => { setUsers(items => items.map(user => user.id === 'me' ? { ...user, name, username: '@' + username } : user)); setLoggedIn(true); localStorage.setItem('vibely_logged', 'true'); },
    logout: () => { setLoggedIn(false); localStorage.removeItem('vibely_logged'); },
    toggleDark: () => setDark(value => !value),
    createPost: (text, image) => { if (text.trim()) setPosts(items => [{ id: crypto.randomUUID(), userId: 'me', text: text.trim(), image, createdAt: 'now', likes: [], comments: [] }, ...items]); },
    deletePost: id => setPosts(items => items.filter(post => post.id !== id)),
    toggleLike: id => setPosts(items => items.map(post => { if (post.id !== id) return post; const liked = post.likes.includes('me'); if (!liked && post.userId !== 'me') notify('like', 'me', id); return { ...post, likes: liked ? post.likes.filter(userId => userId !== 'me') : [...post.likes, 'me'] }; })),
    comment: (id, text) => { if (!text.trim()) return; setPosts(items => items.map(post => post.id === id ? { ...post, comments: [...post.comments, { id: crypto.randomUUID(), userId: 'me', text: text.trim(), createdAt: 'now' }] } : post)); const post = posts.find(item => item.id === id); if (post && post.userId !== 'me') notify('comment', 'me', id); },
    toggleFollow: id => setUsers(items => items.map(user => { if (user.id === 'me') return { ...user, following: user.following.includes(id) ? user.following.filter(userId => userId !== id) : [...user.following, id] }; if (user.id === id) return { ...user, followers: user.followers.includes('me') ? user.followers.filter(userId => userId !== 'me') : [...user.followers, 'me'] }; return user; })),
    editProfile: values => setUsers(items => items.map(user => user.id === 'me' ? { ...user, ...values } : user)),
    markRead: () => setNotifications(items => items.map(notification => ({ ...notification, read: true }))),
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => { const value = useContext(AppContext); if (!value) throw new Error('Missing AppProvider'); return value; };
