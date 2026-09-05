export type User = { id:string; name:string; username:string; bio:string; avatar:string; cover:string; followers:string[]; following:string[]; joined:string };
export type Comment = { id:string; userId:string; text:string; createdAt:string };
export type Post = { id:string; userId:string; text:string; image?:string; createdAt:string; likes:string[]; comments:Comment[] };
export type Notification = { id:string; type:'like'|'comment'|'follow'; fromId:string; postId?:string; read:boolean; createdAt:string };
