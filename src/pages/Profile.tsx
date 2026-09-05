import { Navigate, useParams } from 'react-router-dom';
import { Avatar, PostCard } from '../components';
import { Layout } from '../components/Layout';
import { useApp } from '../store';

export function Profile() {
  const { id = '' } = useParams();
  const { users, posts, currentUser, toggleFollow } = useApp();
  const user = users.find(item => item.id === id);
  if (!user) return <Navigate to="/"/>;
  const mine = user.id === 'me';
  const following = currentUser.following.includes(user.id);
  const userPosts = posts.filter(post => post.userId === user.id);
  return <Layout><section className="profile-card"><div className="cover" style={{ background: user.cover }}/><div className="profile-info"><Avatar user={user} size={104}/><div className="profile-actions">{mine ? <a className="outline" href="/settings">Edit profile</a> : <button className={following ? 'outline' : 'primary'} onClick={() => toggleFollow(user.id)}>{following ? 'Following' : 'Follow'}</button>}</div><h1>{user.name}</h1><span>@{user.username.replace('@', '')}</span><p>{user.bio}</p><div className="stats"><b>{user.following.length}<small>Following</small></b><b>{user.followers.length}<small>Followers</small></b><b>{userPosts.length}<small>Posts</small></b></div></div></section><section className="profile-posts"><h2>{mine ? 'Your' : 'Their'} vibes</h2>{userPosts.map(post => <PostCard post={post} key={post.id}/>)}</section></Layout>;
}
