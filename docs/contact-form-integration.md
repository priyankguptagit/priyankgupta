# Contact form integration

The site validates requests in a same-origin Next.js Route Handler and forwards them
to an independently hosted inquiry API. The external API implementation and its
storage/email providers are not part of this repository.

## Configure the destination

Set the server-only `INQUIRY_API_BASE_URL` to the base URL of the inquiry API before
deploying the website. For example:

```dotenv
INQUIRY_API_BASE_URL=https://api.example.org/api/v1
```

The browser sends JSON to the same-origin `/api/inquiries` route. The route validates
the request again and forwards it to `${INQUIRY_API_BASE_URL}/inquiries`. Keep the URL
and any credentials needed by the external API server-side; never use a `NEXT_PUBLIC_*`
variable for secrets. The sample localhost value in `.env.example` is for local
development only; production must be configured with a real HTTPS service.

The external API must accept the current form fields, including `subject` and
`organizationWebsite`, validate every field, apply rate limiting and spam controls,
store inquiries securely, and return the response contract below. The browser and
website route both validate input, but the external API must also validate it; website
validation is not a security boundary for the external service.

## Response contract

A successful response must be HTTP 2xx and match this shape:

```json
{
  "success": true,
  "data": { "referenceId": "123e4567-e89b-42d3-a456-426614174000" },
  "requestId": "123e4567-e89b-42d3-a456-426614174000"
}
```

The form only displays its success confirmation for this response. A failed response
must use `success: false`; field errors may be returned as `{ "field": "...",
"message": "..." }` entries. Error details from the service are not displayed directly
to visitors. If the service reports that it stored a request but failed to send a
notification, the form tells the visitor not to submit it again.

## Deployment check

Before accepting live requests, configure `INQUIRY_API_BASE_URL` in the website's
server environment, verify the API is reachable over HTTPS, confirm its validation,
rate limiting, spam controls, storage, access, retention, and deletion behavior, and
test successful, failed, and timeout responses. The same-origin route does not persist
submissions itself. If the variable is absent or invalid, it returns an error instead
of showing a false success state.
