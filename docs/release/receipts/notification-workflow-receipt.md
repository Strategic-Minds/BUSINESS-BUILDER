# Notification Workflow Receipt

Status: staged and implemented.

Notification routes:
- `/api/notifications/preview`
- `/api/notifications/send`
- `/api/notifications/log`

Live send is locked unless admin approval is supplied and Twilio variables are configured. The preview route returns message copy without sending.
