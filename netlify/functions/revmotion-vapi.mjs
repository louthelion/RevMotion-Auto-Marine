import {timingSafeEqual} from 'node:crypto';
const REVMOTION_NUMBER='+14077988755';
const EVENT_TYPES=new Set(['status-update','end-of-call-report','hang','transfer-update']);
export function verifyWebhook(headers,payload,secret){
  if(typeof secret!=='string'||secret.length<32)return false;
  const auth=headers?.get?.('authorization')||'';
  if(!auth.startsWith('Bearer '))return false;
  const supplied=Buffer.from(auth.slice(7)),expected=Buffer.from(secret);
  if(supplied.length!==expected.length||!timingSafeEqual(supplied,expected))return false;
  const message=payload?.message;
  if(!message||!EVENT_TYPES.has(message.type)||typeof message.call?.id!=='string'||!message.call.id.trim())return false;
  // Vapi can supply the phone number at the message or call level.
  // Any conflicting or missing number fails closed rather than crossing companies.
  const numbers=[message.phoneNumber?.number,message.call.phoneNumber?.number].filter(x=>x!==undefined);
  return numbers.length>0&&numbers.every(x=>x===REVMOTION_NUMBER);
}
export default async function handler(request){
  if(request.method!=='POST')return new Response('Method not allowed',{status:405});
  const contentLength=Number(request.headers.get('content-length'));
  if(Number.isFinite(contentLength)&&contentLength>65536)return new Response('Payload too large',{status:413});
  const raw=await request.text();
  if(Buffer.byteLength(raw,'utf8')>65536)return new Response('Payload too large',{status:413});
  let payload;try{payload=JSON.parse(raw)}catch{return new Response('Bad request',{status:400})}
  if(!verifyWebhook(request.headers,payload,process.env.REVMOTION_VAPI_WEBHOOK_SECRET))
    return new Response('Unauthorized',{status:401,headers:{'Cache-Control':'no-store'}});
  // Ingestion remains disabled until Vapi credential and database writer are configured.
  return new Response('Ingestion not enabled',{status:503,headers:{'Cache-Control':'no-store'}});
}
