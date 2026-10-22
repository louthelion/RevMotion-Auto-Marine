# RevMotion Vapi — next activation gate

Production Netlify ingress (currently **fail closed**):
https://revmotion-auto-marine.netlify.app/.netlify/functions/revmotion-vapi

Official number: +1 407-798-8755

Vapi documents that a **saved** assistant or phone-number Server URL can use a Custom Credential (Bearer Token, Authorization header with Bearer prefix). Configure a RevMotion-specific credential and bind it to the saved RevMotion phone-number or assistant server configuration, not an inline assistant override. Do not configure this endpoint at the TitanCore organization level: it accepts only RevMotion events.

Required, not completed:
1. Securely create and set a matching REVMOTION_VAPI_WEBHOOK_SECRET (at least 32 characters) in Netlify and a matching Vapi Bearer Token Custom Credential; do not place secrets in GitHub or browser files.
2. Configure the phone-number or saved-assistant Server URL and credentialId in Vapi, verify which URL wins based on Vapi's server URL priority.
3. Confirm the phone is routed to the correct RevMotion assistant and that end-of-call-report is enabled.
4. Implement authenticated server-to-server storage of **only** normalized end-of-call-report metadata into revmotion_private.call_events; deduplicate using provider_event_id. Do not enable ingestion until storage and provider authentication are tested.
5. Create review-only follow-ups in revmotion_private.call_followups after authorized staff classify the call; no auto-outbound messages or regulated actions.
6. Verify a real call and an authenticated event; check Vapi Logs → Webhooks and Netlify function logs, then verify authorized dashboard view.

The event normalizer excludes caller number, transcript, recording, raw artifacts and free-form summary by default. It is not yet connected to the webhook handler or database writer.
