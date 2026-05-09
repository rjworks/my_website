# Hello Page API

An API that updates the code displayed on the `/hello` page of the personal website.

## Base URL

- Local: `http://localhost:3000`
- Production: _(replace with deployed URL)_

## Authentication

Pass the secret as a Bearer token in the `Authorization` header.
The secret is set via the `HELLO_API_SECRET` environment variable on the server.
If no secret is configured on the server, the header can be omitted.

```
Authorization: Bearer <secret>
```

## Endpoints

### GET /api/hello
Returns the current content being displayed.

**Response**
```json
{
  "code": "print('hello')",
  "language": "python",
  "filename": "hello.py"
}
```

### POST /api/hello
Updates the content displayed on the `/hello` page.

**Headers**
```
Content-Type: application/json
Authorization: Bearer <secret>
```

**Body**
```json
{
  "code": "string (required) — the code to display",
  "language": "string (optional, default: javascript) — language name e.g. python, typescript",
  "filename": "string (optional, default: hello.js) — filename shown in the UI"
}
```

**Response**
```json
{ "ok": true }
```

**Error responses**
```json
{ "error": "Unauthorized" }        // 401 — wrong or missing secret
{ "error": "Invalid JSON body" }   // 400 — malformed request
{ "error": "`code` (string) is required" } // 400 — missing code field
```

## Implementation task

In this project, implement a function that:
1. Calls the Claude API to generate code based on a given prompt
2. Sends the generated code to `POST /api/hello` so it appears on the `/hello` page

Use the `anthropic` Python SDK. Use `json.dumps` to serialize the request body so
special characters (newlines, quotes, backslashes) in Claude's output are safely encoded.

**Example skeleton:**
```python
import anthropic
import urllib.request
import json

HELLO_API_URL = "http://localhost:3000/api/hello"
HELLO_API_SECRET = "your-secret"

client = anthropic.Anthropic()

def generate_and_publish(prompt: str, language: str = "python", filename: str = "output.py"):
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    code = message.content[0].text

    body = json.dumps({
        "code": code,
        "language": language,
        "filename": filename
    }).encode()

    req = urllib.request.Request(
        HELLO_API_URL,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {HELLO_API_SECRET}"
        },
        method="POST"
    )

    with urllib.request.urlopen(req) as res:
        return json.loads(res.read().decode())
```
