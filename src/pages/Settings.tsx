import { useState, type FormEvent } from 'react';
import { Camera, Check } from 'lucide-react';
import { Avatar } from '../components';
import { Layout } from '../components/Layout';
import { useApp } from '../store';

export function Settings() {
  const { currentUser, editProfile, dark, toggleDark } = useApp();
  const [name, setName] = useState(currentUser.name); const [bio, setBio] = useState(currentUser.bio); const [avatar, setAvatar] = useState(currentUser.avatar); const [saved, setSaved] = useState(false);
  function save(event: FormEvent) { event.preventDefault(); editProfile({ name, bio, avatar }); setSaved(true); setTimeout(() => setSaved(false), 1800); }
  return <Layout><header className="page-title"><h1>Settings</h1><p>Make Vibely feel like yours.</p></header><section className="settings"><h2>Profile</h2><form onSubmit={save}><div className="avatar-edit"><Avatar user={{ ...currentUser, avatar }} size={75}/><label><Camera size={17}/> Change photo<input type="url" value={avatar} onChange={event => setAvatar(event.target.value)} placeholder="Image URL"/></label></div><label>Display name<input value={name} onChange={event => setName(event.target.value)}/></label><label>Bio<textarea value={bio} onChange={event => setBio(event.target.value)}/></label><button className="primary">{saved ? <><Check size={17}/>Saved</> : 'Save changes'}</button></form><hr/><h2>Appearance</h2><div className="setting-line"><div><b>Dark mode</b><p>Use a softer, darker palette.</p></div><button className={'toggle ' + (dark ? 'on' : '')} onClick={toggleDark}><i/></button></div><hr/><h2>Preferences</h2><div className="setting-line"><div><b>Push notifications</b><p>Stay in the loop when someone interacts.</p></div><button className="toggle on"><i/></button></div></section></Layout>;
}
