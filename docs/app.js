const navLinks = Array.from(document.querySelectorAll(".section-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const snippets = {
  sms: {
    curl: `curl --location 'https://cloudapi.aizan.com/mae/sms/v1/outbound' \\
  --header 'Authorization: Bearer {Token}' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "source": "12262122660",
    "destination": "14166888292",
    "messageText": "Hello World!"
  }'`,
    ruby: `require "net/http"
require "json"

uri = URI("https://cloudapi.aizan.com/mae/sms/v1/outbound")
req = Net::HTTP::Post.new(uri)
req["Authorization"] = "Bearer {Token}"
req["Content-Type"] = "application/json"
req.body = {
  source: "12262122660",
  destination: "14166888292",
  messageText: "Hello World!"
}.to_json`,
    python: `import requests

requests.post(
    "https://cloudapi.aizan.com/mae/sms/v1/outbound",
    headers={"Authorization": "Bearer {Token}"},
    json={
        "source": "12262122660",
        "destination": "14166888292",
        "messageText": "Hello World!",
    },
)`,
    php: `<?php
$payload = [
  "source" => "12262122660",
  "destination" => "14166888292",
  "messageText" => "Hello World!"
];`,
    java: `HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://cloudapi.aizan.com/mae/sms/v1/outbound"))
  .header("Authorization", "Bearer {Token}")
  .header("Content-Type", "application/json")
  .POST(HttpRequest.BodyPublishers.ofString("{...}"))
  .build();`,
    node: `await fetch("https://cloudapi.aizan.com/mae/sms/v1/outbound", {
  method: "POST",
  headers: {
    Authorization: "Bearer {Token}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    source: "12262122660",
    destination: "14166888292",
    messageText: "Hello World!"
  })
});`,
    go: `reqBody := strings.NewReader(\`{
  "source": "12262122660",
  "destination": "14166888292",
  "messageText": "Hello World!"
}\`)`
  },
  mms: {
    curl: `curl --location 'https://cloudapi.aizan.com/mae/mms/v1/outbound' \\
  --header 'Authorization: Bearer {Token}' \\
  --data '{
    "source": "12262122660",
    "destination": "14166888292",
    "messageText": "Hello!",
    "mediaId": ["6b512106-d537-493d-9ecd-5f597d0bbe97"]
  }'`,
    ruby: `payload = {
  source: "12262122660",
  destination: "14166888292",
  messageText: "Hello!",
  mediaId: ["6b512106-d537-493d-9ecd-5f597d0bbe97"]
}.to_json`,
    python: `requests.post(
    "https://cloudapi.aizan.com/mae/mms/v1/outbound",
    headers={"Authorization": "Bearer {Token}"},
    json={
        "source": "12262122660",
        "destination": "14166888292",
        "messageText": "Hello!",
        "mediaId": ["6b512106-d537-493d-9ecd-5f597d0bbe97"],
    },
)`,
    php: `<?php
$payload = [
  "source" => "12262122660",
  "destination" => "14166888292",
  "messageText" => "Hello!",
  "mediaId" => ["6b512106-d537-493d-9ecd-5f597d0bbe97"]
];`,
    java: `HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://cloudapi.aizan.com/mae/mms/v1/outbound"))
  .header("Authorization", "Bearer {Token}")
  .POST(HttpRequest.BodyPublishers.ofString("{...}"))
  .build();`,
    node: `await fetch("https://cloudapi.aizan.com/mae/mms/v1/outbound", {
  method: "POST",
  headers: { Authorization: "Bearer {Token}" },
  body: JSON.stringify({
    source: "12262122660",
    destination: "14166888292",
    messageText: "Hello!",
    mediaId: ["6b512106-d537-493d-9ecd-5f597d0bbe97"]
  })
});`,
    go: `reqBody := strings.NewReader(\`{
  "source": "12262122660",
  "destination": "14166888292",
  "messageText": "Hello!",
  "mediaId": ["6b512106-d537-493d-9ecd-5f597d0bbe97"]
}\`)`
  },
  media: {
    curl: `curl --location 'https://cloudapi.aizan.com/mae/media/v1/files' \\
  --header 'media-part: application/octet-stream' \\
  --header 'media-part: image' \\
  --header 'Authorization: Bearer {Token}' \\
  --data '{
    "controlPart": {
      "fileName": "unnamed.png",
      "fileType": "image"
    },
    "mediaPart": {
      "contentType": "application/octet-stream",
      "mediaContent": "<Base64>"
    }
  }'`,
    ruby: `payload = {
  controlPart: { fileName: "unnamed.png", fileType: "image" },
  mediaPart: {
    contentType: "application/octet-stream",
    mediaContent: "<Base64>"
  }
}.to_json`,
    python: `requests.post(
    "https://cloudapi.aizan.com/mae/media/v1/files",
    headers={
        "Authorization": "Bearer {Token}",
        "media-part": "image",
    },
    json={"controlPart": {"fileName": "unnamed.png", "fileType": "image"}},
)`,
    php: `<?php
$payload = [
  "controlPart" => ["fileName" => "unnamed.png", "fileType" => "image"],
  "mediaPart" => ["contentType" => "application/octet-stream"]
];`,
    java: `HttpRequest request = HttpRequest.newBuilder()
  .uri(URI.create("https://cloudapi.aizan.com/mae/media/v1/files"))
  .header("Authorization", "Bearer {Token}")
  .header("media-part", "image")
  .POST(HttpRequest.BodyPublishers.ofString("{...}"))
  .build();`,
    node: `await fetch("https://cloudapi.aizan.com/mae/media/v1/files", {
  method: "POST",
  headers: {
    Authorization: "Bearer {Token}",
    "media-part": "image"
  },
  body: JSON.stringify({
    controlPart: { fileName: "unnamed.png", fileType: "image" }
  })
});`,
    go: `reqBody := strings.NewReader(\`{
  "controlPart": { "fileName": "unnamed.png", "fileType": "image" },
  "mediaPart": { "contentType": "application/octet-stream" }
}\`)`
  },
  delivery: {
    curl: `curl --location 'https://cloudapi.aizan.com/mae/customer-provided-url' \\
  --header 'Authorization: Bearer {Token}' \\
  --data '{
    "messageId": "48c90962-9318-4510-a434-67a77ec355b0",
    "deliveryStatus": "DELIVERED",
    "from": "12262122660",
    "to": "14166888292"
  }'`,
    ruby: `payload = {
  messageId: "48c90962-9318-4510-a434-67a77ec355b0",
  deliveryStatus: "DELIVERED",
  from: "12262122660",
  to: "14166888292"
}.to_json`,
    python: `callback = {
    "messageId": "48c90962-9318-4510-a434-67a77ec355b0",
    "deliveryStatus": "DELIVERED",
    "from": "12262122660",
    "to": "14166888292",
}`,
    php: `<?php
$callback = [
  "messageId" => "48c90962-9318-4510-a434-67a77ec355b0",
  "deliveryStatus" => "DELIVERED",
  "from" => "12262122660",
  "to" => "14166888292"
];`,
    java: `String callbackBody = """
{
  "deliveryStatus": "DELIVERED",
  "from": "12262122660",
  "to": "14166888292"
}
""";`,
    node: `const callbackBody = {
  messageId: "48c90962-9318-4510-a434-67a77ec355b0",
  deliveryStatus: "DELIVERED",
  from: "12262122660",
  to: "14166888292"
};`,
    go: `type DeliveryCallback struct {
  MessageID string \`json:"messageId"\`
  DeliveryStatus string \`json:"deliveryStatus"\`
  From string \`json:"from"\`
  To string \`json:"to"\`
}`
  },
  inbound: {
    curl: `curl --location 'https://cloudapi.aizan.com/mae/customer-provided-url' \\
  --header 'Authorization: Bearer {Token}' \\
  --data '{
    "messageId": "48c90962-9318-4510-a434-67a77ec355b0",
    "from": "12262122660",
    "to": "14166888292",
    "message": "Hello World!"
  }'`,
    ruby: `payload = {
  messageId: "48c90962-9318-4510-a434-67a77ec355b0",
  from: "12262122660",
  to: "14166888292",
  message: "Hello World!"
}.to_json`,
    python: `callback = {
    "messageId": "48c90962-9318-4510-a434-67a77ec355b0",
    "from": "12262122660",
    "to": "14166888292",
    "message": "Hello World!",
}`,
    php: `<?php
$callback = [
  "messageId" => "48c90962-9318-4510-a434-67a77ec355b0",
  "from" => "12262122660",
  "to" => "14166888292",
  "message" => "Hello World!"
];`,
    java: `String callbackBody = """
{
  "from": "12262122660",
  "to": "14166888292",
  "message": "Hello World!"
}
""";`,
    node: `const callbackBody = {
  messageId: "48c90962-9318-4510-a434-67a77ec355b0",
  from: "12262122660",
  to: "14166888292",
  message: "Hello World!"
};`,
    go: `type InboundCallback struct {
  MessageID string \`json:"messageId"\`
  From string \`json:"from"\`
  To string \`json:"to"\`
  Message string \`json:"message"\`
}`
  }
};

const responseSnippets = {
  auth: {
    200: `{
  "access_token": "[Bearer Token]",
  "expires_in": "[Expiry Time]",
  "token_type": "Bearer"
}`,
    400: `{
  "error": "invalid_client"
}`
  },
  sms: {
    200: `{
  "source": "224900451452",
  "destination": "490045145222",
  "messageText": "Hello",
  "messageId": "e77a9a77-4f18-4f7b-ae92-6d7984558fb3"
}`,
    401: `{
  "status": 401,
  "message": "Unauthorized access!"
}`,
    400: `{
  "status": 400,
  "message": "Source number is not authorized"
}`
  },
  mms: {
    200: `{
  "source": "224900451452",
  "destination": "490045145222",
  "messageText": "Hello",
  "messageId": "e77a9a77-4f18-4f7b-ae92-6d7984558fb3",
  "mediaId": [
    "6b512106-d537-493d-9ecd-5f597d0bbe97"
  ]
}`,
    401: `{
  "status": 401,
  "message": "Unauthorized access!"
}`,
    400: `{
  "status": 400,
  "message": "Source number is not authorized"
}`,
    500: `Internal Server Error`
  },
  media: {
    200: `{
  "mediaId": "59d6b444-2b05-4b2e-9d03-e91118784217",
  "fileName": "59d6b444-2b05-4b2e-9d03-e91118784217.png",
  "type": "image",
  "createdDts": "2023-09-26T07:10:00.106354"
}`,
    400: `{
  "status": 400,
  "message": "Invalid Request"
}`,
    500: `Internal Server Error`
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0.1, 0.25, 0.5]
  }
);

sections.forEach((section) => observer.observe(section));

document.querySelector("#section-search").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();

  navLinks.forEach((link) => {
    const matches = !query || link.textContent.toLowerCase().includes(query);
    link.hidden = !matches;
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copy);

    if (!target) {
      return;
    }

    const text = target.textContent;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1100);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(target);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
});

function setLanguage(snippetKey, language) {
  const snippet = snippets[snippetKey]?.[language];
  const pre = document.querySelector(`[data-snippet="${snippetKey}"] pre`);
  const select = document.querySelector(`[data-language-select="${snippetKey}"]`);

  if (!snippet || !pre) {
    return;
  }

  pre.textContent = snippet;

  if (select) {
    select.value = language;
  }

  document.querySelectorAll(`[data-language-tab="${snippetKey}"]`).forEach((button) => {
    button.classList.toggle("is-active", button.dataset.language === language);
  });
}

document.querySelectorAll("[data-language-select]").forEach((select) => {
  select.addEventListener("change", () => {
    setLanguage(select.dataset.languageSelect, select.value);
  });
});

document.querySelectorAll("[data-language-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.languageTab, button.dataset.language);
  });
});

Object.keys(snippets).forEach((snippetKey) => setLanguage(snippetKey, "curl"));

function setResponseCode(responseKey, code) {
  const snippet = responseSnippets[responseKey]?.[code];
  const output = document.querySelector(`[data-response-output="${responseKey}"]`);

  if (!snippet || !output) {
    return;
  }

  output.textContent = snippet;

  document.querySelectorAll(`[data-response-tab="${responseKey}"]`).forEach((button) => {
    button.classList.toggle("is-active", button.dataset.responseCode === String(code));
  });
}

document.querySelectorAll("[data-response-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    setResponseCode(button.dataset.responseTab, button.dataset.responseCode);
  });
});

Object.keys(responseSnippets).forEach((responseKey) => setResponseCode(responseKey, "200"));
