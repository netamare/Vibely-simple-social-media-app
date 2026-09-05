import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../store';

export function Auth({ register = false }: { register?: boolean }) {
  const { login, register: signUp, loggedIn } = useApp(); const navigate = useNavigate(); const [name, setName] = useState(''); const [username, setUsername] = useState('');
  function submit(event: FormEvent) { event.preventDefault(); if (register) signUp(name, username); else login(username); navigate('/'); }
  if (loggedIn) return <Navigate to="/"/>;
  return <div className="auth"><section><a className="brand" href="/">vibely<span>✦</span></a><div className="auth-copy"><span>✦ Find your people</span><h1>Share the little things that make life feel big.</h1><p>A kinder, calmer social space for your everyday spark.</p></div></section><main className="auth-card"><div><h1>{register ? 'Create your account' : 'Welcome back'}</h1><p>{register ? 'Start sharing your vibe in a few seconds.' : 'Sign in to see what your people are up to.'}</p></div><form onSubmit={submit}>{register && <label>Your name<input required value={name} onChange={event => setName(event.target.value)} placeholder="Maya Chen"/></label>}<label>{register ? 'Choose a username' : 'Email or username'}<input required value={username} onChange={event => setUsername(event.target.value)} placeholder={register ? 'mayadoes' : 'you@example.com'}/></label><label>Password<input required type="password" placeholder="••••••••"/></label><button className="primary">{register ? 'Create account' : 'Log in'}</button></form><p className="auth-switch">{register ? 'Already have an account?' : 'New to Vibely?'} <a href={register ? '/login' : '/register'}>{register ? 'Log in' : 'Create an account'}</a></p></main></div>;
}
