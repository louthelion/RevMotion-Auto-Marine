// Converts a verified RevMotion Vapi end-of-call event to a minimal private record.
// No transcripts, recordings, caller phone numbers, customer PII or raw payloads.
const NUMBER='+14077988755';
export function normalizeRevMotionCallEvent(payload) {
  const m=payload?.message;
  if(!m||m.type!=='end-of-call-report')return null;
  const callId=m.call?.id;
  if(typeof callId!=='string'||!/^[-_a-zA-Z0-9]{1,200}$/.test(callId))return null;
  const nums=[m.phoneNumber?.number,m.call?.phoneNumber?.number].filter(x=>x!==undefined);
  if(nums.length===0||nums.some(x=>x!==NUMBER))return null;
  const direction=m.call?.type==='inboundPhoneCall'?'inbound':
    m.call?.type==='outboundPhoneCall'?'outbound':null;
  const occurredAt=m.timestamp||m.endedAt||m.call?.endedAt||null;
  const iso=occurredAt&&Number.isFinite(Date.parse(occurredAt))?new Date(occurredAt).toISOString():null;
  const outcome=typeof m.endedReason==='string'?m.endedReason.slice(0,100):null;
  // Only deterministic call-level event ID, so Vapi retries cannot duplicate records.
  return Object.freeze({
    provider:'vapi',provider_event_id:'end-of-call-report:'+callId,
    provider_call_id:callId,event_type:'call_ended',business_number:NUMBER,
    direction,outcome,sanitized_summary:null,provider_occurred_at:iso
  });
}
