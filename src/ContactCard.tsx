import React from 'react';

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  external?: boolean;
}

function ContactCard({ icon, label, href, external }: ContactCardProps) {
  return (
    <a
      className="contact-card"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="contact-card-inner">
        <span className="contact-card-icon">{icon}</span>
        <span className="contact-card-label">{label}</span>
      </span>
    </a>
  );
}

export default ContactCard;
