

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
