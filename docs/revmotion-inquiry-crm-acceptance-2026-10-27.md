# RevMotion buyer/seller inquiry → CRM acceptance contract (review only)

Date: 2026-10-27. Scope: existing public website, existing RevMotion Supabase project and employee dashboard. No separate replacement website or CRM. **No production activation.**

## Current evidence
- Both simplified draft forms use Netlify POST and a honeypot, but no proof of persistent submission or authenticated dashboard delivery.
- Form fields in the reviewed draft: `full_name`, `email`, `city_area`, `message`, `consent`; hidden `form-name`. No file uploads.
- The static `confirmation.html` is not a trustworthy server-confirmed delivery receipt.
- RevMotion's separate Supabase project exists; operational CRM ingestion and staff permissions for inquiries are not verified.

## Required endpoint contract (implementation pending)
1. Keep current forms **disabled for real collection** until an authenticated service endpoint and privacy review exist. Set up server-validated POST handling (Netlify Function or equivalent existing approved backend) using least-privilege server secrets only.
2. Accept only explicit `buyer` / `seller` categories and approved minimal fields. Validate lengths, type, consent version and contact permission; reject uploads, title/VIN documents, payment data and unexpected fields. Sanitize output when displayed.
3. Apply anti-abuse controls and idempotency/deduplication keyed to an intentionally generated submission token, with reasonable privacy-preserving rate limits.
4. Persist a durable, private inquiry record with immutable server-generated ID and creation timestamp; record consent provenance, source, purpose, category and delivery state. Return success **only after confirmed persistence**.
5. Create an auditable task in the appropriate authorized department; queue retries without duplicate tasks on transient failure. Separate inquiry persistence from notification success.
6. Employee dashboard retrieves records through server-validated identity/RLS with strict company, department and assignment authorization; do not expose inquiries through static pages or browser-embedded service credentials.
7. Require opt-in and approved sender configuration before outbound follow-up. Do not automatically contact buyers/sellers in staging.
8. Observe retention/deletion processes and log failure state without leaking inquiry PII or service secrets.

## Synthetic acceptance suite
- Valid buyer & seller: 201/200 after persistence, unique reference and exactly one scoped task.
- Required field absent, malformed email, unchecked consent, oversized inputs, unexpected fields or files: 4xx without persistence.
- Duplicate submission: stable receipt or deduplicated record, not second task.
- Simulated DB failure: 5xx and **no false success page**.
- Anonymous staff and cross-department user: denied inquiry access.
- Correct scoped employee: sees assigned synthetic task; audit event records access/action.
- Dashboard offline / notification failure: record retained with retry, no fabricated completed status.
- Mobile and accessible form behavior; appropriate privacy/terms.
- Verify hosted preview AND authorized staging backend. No actual customer PII in tests.

## Release gate
CODEX implements and validates in isolated draft work; ATLAS performs independent auth/RLS review; APEX verifies authorized provider receipts; TITAN validates parent reporting and compliance. Owner approves a limited inquiry-only launch separately from regulated brokerage or sales functions.
