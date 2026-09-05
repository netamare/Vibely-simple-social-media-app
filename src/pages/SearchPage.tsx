import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Avatar, People, PostCard } from '../components';
import { Layout } from '../components/Layout';
import { useApp } from '../store';

export function SearchPage() {
  const { users, posts } = useApp();
  const [query, setQuery] = useState('');
  const term = query.toLowerCase();
  const people = users.filter(user => (user.name + user.username + user.bio).toLowerCase().includes(term));
  const matchingPosts = posts.filter(post => post.text.toLowerCase().includes(term));
  return <Layout><header className="page-title"><h1>Explore</h1><p>Find people and ideas that move you.</p></header><div className="searchbox"><SearchIcon/><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search people or posts..."/></div>{query ? <><h2 className="section-head">People</h2><div className="result-users">{people.map(user => <a href={`/profile/${user.id}`} key={user.id}><Avatar user={user}/><span><b>{user.name}</b><small>@{user.username.replace('@', '')}</small></span></a>)}</div>{!people.length && <p className="empty">No people found.</p>}<h2 className="section-head">Posts</h2>{matchingPosts.map(post => <PostCard post={post} key={post.id}/>)}{!matchingPosts.length && <p className="empty">No posts match that search.</p>}</> : <><div className="explore-hero"><span>✦</span><h2>What are you curious about?</h2><p>Search for people, thoughts, and little moments.</p></div><People title="Trending creators"/></>}</Layout>;
}
