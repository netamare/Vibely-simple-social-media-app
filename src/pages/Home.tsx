import { Composer, PostCard } from '../components';
import { useApp } from '../store';
import { Layout } from '../components/Layout';

export function Home() {
  const { posts } = useApp();
  return <Layout><header className="page-title"><div><h1>Home</h1><p>Catch up on the moments that matter.</p></div></header><Composer/><div className="feed">{posts.map(post => <PostCard post={post} key={post.id}/>)}</div></Layout>;
}
