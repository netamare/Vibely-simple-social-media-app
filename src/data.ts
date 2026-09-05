import type { User, Post, Notification } from './types';
export const seedUsers:User[] = [
 {id:'me',name:'Maya Chen',username:'mayadoes',bio:'Designing quiet corners of the internet. ☁️',avatar:'https://i.pravatar.cc/160?img=47',cover:'linear-gradient(120deg,#ffb6a3,#ffd8a8)',followers:['u1','u2'],following:['u1'],joined:'March 2024'},
 {id:'u1',name:'Jordan Ellis',username:'jordanel',bio:'Photographer, coffee seeker, eternal optimist.',avatar:'https://i.pravatar.cc/160?img=12',cover:'linear-gradient(120deg,#81d8d0,#7489e9)',followers:['me','u2'],following:['me'],joined:'January 2023'},
 {id:'u2',name:'Nia Williams',username:'niavibes',bio:'Making ordinary days a little more colorful ✨',avatar:'https://i.pravatar.cc/160?img=32',cover:'linear-gradient(120deg,#dd8ee7,#7c63cf)',followers:['me'],following:['u1'],joined:'June 2024'},
 {id:'u3',name:'Theo Brooks',username:'theobrooks',bio:'Building things and taking the scenic route.',avatar:'https://i.pravatar.cc/160?img=8',cover:'linear-gradient(120deg,#f4bb55,#e87171)',followers:[],following:['u2'],joined:'November 2022'} ];
export const seedPosts:Post[] = [
 {id:'p1',userId:'u1',text:'Golden hour made the whole city feel like it was holding its breath. I needed that.',image:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=80',createdAt:'2h',likes:['me','u2'],comments:[{id:'c1',userId:'me',text:'This light is unreal!',createdAt:'1h'}]},
 {id:'p2',userId:'u2',text:'A little reminder: you do not need to have it all figured out to make today beautiful.',createdAt:'4h',likes:['u1'],comments:[]},
 {id:'p3',userId:'me',text:'Currently collecting tiny rituals that make weekdays feel softer. Today: fresh flowers and an offline morning.',image:'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=80',createdAt:'Yesterday',likes:['u1','u3'],comments:[{id:'c2',userId:'u2',text:'I love this energy 🌷',createdAt:'Yesterday'}]},
 {id:'p4',userId:'u3',text:'The best ideas always show up after I stop trying to force them.',createdAt:'Yesterday',likes:[],comments:[]} ];
export const seedNotifications:Notification[] = [{id:'n1',type:'like',fromId:'u1',postId:'p3',read:false,createdAt:'1h'},{id:'n2',type:'comment',fromId:'u2',postId:'p3',read:false,createdAt:'Yesterday'},{id:'n3',type:'follow',fromId:'u3',read:true,createdAt:'2d'}];
