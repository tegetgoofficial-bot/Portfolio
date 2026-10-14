import { useState } from "react";
import './style/Contact.css';

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <p>
      <span className="contact-label">{label}</span>
      <button
        type="button"
        className="copy-btn"
        onClick={handleCopy}
        title="Click to copy"
      >
        <span className="copy-value">{value}</span>
        <span className="copy-status" aria-live="polite">
          {copied ? "Copied!" : ""}
        </span>
      </button>
    </p>
  );
}

function Contact({ name, email, phone }) {
  return (
    <div className="contact-section">
      <h3 className="contact-name">{name}</h3>
      <CopyField label="Email" value={email} />
      <CopyField label="Phone" value={phone} />
    </div>
  );
}

export default Contact
