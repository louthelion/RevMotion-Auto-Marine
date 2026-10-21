import {timingSafeEqual} from 'node:crypto';
export function verifyWebhook(headers,payload,secret){
  if(typeof secret!=='string'||secret.length<32)return false;
  const h=headers?.get?.('authorization')||'';
  if(!h.startsWith('Bearer '))return false;
  const supplied=Buffer.from(h.slice(7)),correct=Buffer.from(secret);
  if(supplied.length!==correct.length||!timingSafeEqual(supplied,correct))return false;
  const number=payload?.message?.call?.phoneNumber?.number;
  return number==='+14077988755';
}
export default async function handler(request){
  if(request.method!=='POST')return new Response('Method not allowed',{status:405});
  const raw=await request.text();
  if(raw.length>65536)return new Response('Payload too large',{status:413});
  let payload;try{payload=JSON.parse(raw)}catch{return new Response('Bad request',{status:400})}
  if(!verifyWebhook(request.headers,payload,process.env.REVMOTION_VAPI_WEBHOOK_SECRET))
    return new Response('Unauthorized',{status:401});
  return new Response('Ingestion not enabled',{status:503,headers:{'Cache-Control':'no-store'}});
}
