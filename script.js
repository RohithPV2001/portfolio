

function copyToClipboard(elementId, msgId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = (el.innerText || el.textContent || "").trim();
  if (!text) return;

  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { 
      document.execCommand("copy"); 
      showCopied(msgId); 
    } finally { 
      document.body.removeChild(ta); 
    }
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showCopied(msgId))
      .catch(fallback);
  } else {
    fallback();
  }
  console.log("✅ script.js loaded");

}

document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault(); // prevent redirect
  const form = e.target;
  const status = document.getElementById("form-status");
  status.textContent = "Sending...";

  const data = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/xwpnpnvd", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    });
    if (response.ok) {
      status.textContent = "Message sent successfully!";
      status.style.color = "lightgreen";
      form.reset();
    } else {
      status.textContent = "Oops! Something went wrong.";
      status.style.color = "red";
    }
  } catch (error) {
    status.textContent = "Failed to send. Please try again later.";
    status.style.color = "red";
  }
});

