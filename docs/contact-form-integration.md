# Contact form integration

The portfolio contains the contact form and browser-side REST client, but no inquiry
API implementation. The form sends requests to an independently hosted service.

## Configure the destination

Set `NEXT_PUBLIC_API_BASE_URL` to the base URL of the inquiry API before building or
deploying the website. For example:

```dotenv
NEXT_PUBLIC_API_BASE_URL=https://api.example.org/api/v1
```

The client sends a JSON `POST` to `${NEXT_PUBLIC_API_BASE_URL}/inquiries`. The value is
included in the browser bundle and is not a place for credentials. Do not add API keys,
database credentials, or mail-provider secrets to any `NEXT_PUBLIC_*` variable. The
sample localhost value in `.env.example` is for local development only; production must
be pointed at a real, HTTPS service.

The endpoint must accept the current form fields, including `subject` and
`organizationWebsite`, allow cross-origin requests from the deployed website, validate
every field server-side, apply rate limiting and spam controls, store inquiry data
securely, and return safe error responses. Browser-side validation is for usability and
is not a security boundary.

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

Before accepting live requests, configure the service URL in the website's deployment
environment, verify the API is reachable over HTTPS, confirm its CORS policy and
server-side protections, and test both successful and failed submissions. If the
variable is absent in production, the website reports that the inquiry service is not
configured instead of showing a false success state.
