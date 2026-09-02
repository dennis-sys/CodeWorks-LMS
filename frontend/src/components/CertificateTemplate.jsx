import React, { forwardRef } from 'react';

const CertificateTemplate = forwardRef(function CertificateTemplate(
  { studentName, dateStr, certificateId },
  ref
) {
  const W = 1122;
  const H = 793;
  const nameSize = studentName.length > 26 ? 42 : studentName.length > 19 ? 52 : 64;

  return (
    <div
      ref={ref}
      style={{
        width: W,
        height: H,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        flexShrink: 0,
        background: '#ffffff',
      }}
    >
      <img
        src="/certificate-completion-template.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* The supplied artwork already contains every static certificate element.
          These white overlays replace only its sample name and sample date. */}
      <div
        style={{
          position: 'absolute',
          left: 245,
          top: 302,
          width: 635,
          height: 101,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
        }}
      >
        <span
          style={{
            color: '#0b3b61',
            fontFamily: "'Brush Script MT', 'Segoe Script', 'URW Chancery L', cursive",
            fontSize: nameSize,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            textAlign: 'center',
            transform: 'translateY(-2px)',
          }}
        >
          {studentName}
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 300,
          top: 506,
          width: 522,
          height: 46,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          color: '#0b3b61',
          fontFamily: 'Arial, sans-serif',
          fontSize: 15,
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {dateStr}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 320,
          top: 560,
          width: 482,
          height: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          color: '#0b3b61',
          fontFamily: 'Arial, sans-serif',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 0.7,
          whiteSpace: 'nowrap',
        }}
      >
        Certificate ID: {certificateId}
      </div>
    </div>
  );
});

export default CertificateTemplate;