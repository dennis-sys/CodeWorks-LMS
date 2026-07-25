import React, { forwardRef } from 'react';

const CertificateTemplate = forwardRef(function CertificateTemplate(
  { studentName, courseTitle, dateStr, pct, accentColor = '#f59e0b' },
  ref
) {
  const W = 1122;
  const H = 793;

  return (
    <div
      ref={ref}
      style={{
        width: W,
        height: H,
        background: '#ffffff',
        fontFamily: "Georgia, 'Times New Roman', serif",
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      {/* ── Decorative outer border ── */}
      <div style={{ position: 'absolute', inset: 14, border: `2px solid ${accentColor}55`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 20, border: `1px solid ${accentColor}30`, pointerEvents: 'none' }} />

      {/* ── Corner ornaments ── */}
      {[
        { top: 14, left: 14 },
        { top: 14, right: 14 },
        { bottom: 14, left: 14 },
        { bottom: 14, right: 14 },
      ].map((pos, i) => {
        const bdr = {
          borderTop: i < 2 ? `3px solid ${accentColor}` : 'none',
          borderBottom: i >= 2 ? `3px solid ${accentColor}` : 'none',
          borderLeft: i % 2 === 0 ? `3px solid ${accentColor}` : 'none',
          borderRight: i % 2 === 1 ? `3px solid ${accentColor}` : 'none',
        };
        return <div key={i} style={{ position: 'absolute', width: 40, height: 40, ...pos, ...bdr }} />;
      })}

      {/* ── Left sidebar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 210, height: H,
        background: '#0f172a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 20,
      }}>
        {/* CodeWork Academy Logo */}
        <div style={{
          width: 88, height: 88, borderRadius: 20,
          background: `linear-gradient(135deg, #0ea5e9 0%, ${accentColor} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 50px ${accentColor}60`,
          flexDirection: 'column',
          gap: 2,
        }}>
          <span style={{
            fontSize: 28, fontWeight: 900, color: '#ffffff',
            fontFamily: 'Arial Black, Arial, sans-serif', lineHeight: 1,
            letterSpacing: -1,
          }}>CW</span>
          <div style={{ width: 36, height: 2, background: '#ffffff80', borderRadius: 1 }} />
        </div>

        <div style={{ width: 1, height: 40, background: '#1e293b' }} />

        {/* Academy name rotated */}
        <p style={{
          color: '#64748b',
          fontSize: 10,
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontFamily: 'Arial, sans-serif',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          margin: 0,
        }}>CodeWork Academy</p>

        <div style={{ width: 1, height: 40, background: '#1e293b' }} />

        {/* Decorative dots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 10 }}>
          {[0,1,2,3,4,5,6].map(i => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: '50%',
              background: i === 3 ? accentColor : '#1e293b',
            }} />
          ))}
        </div>
      </div>

      {/* ── Top accent bar ── */}
      <div style={{ position: 'absolute', top: 0, left: 210, right: 0, height: 7, background: accentColor }} />

      {/* ── Main content area ── */}
      <div style={{
        position: 'absolute', left: 210, top: 7, right: 0, bottom: 0,
        padding: '48px 68px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>

        {/* Header */}
        <div>
          <p style={{
            margin: '0 0 12px',
            color: '#94a3b8',
            fontSize: 11,
            letterSpacing: 5,
            textTransform: 'uppercase',
            fontFamily: 'Arial, sans-serif',
          }}>CodeWork Academy</p>
          <p style={{ margin: '0 0 0', fontSize: 42, fontWeight: 400, color: '#0f172a', lineHeight: 1.1 }}>
            Certificate of
          </p>
          <p style={{ margin: '0 0 0', fontSize: 42, fontWeight: 700, color: accentColor, lineHeight: 1.1 }}>
            Completion
          </p>
        </div>

        {/* Body */}
        <div>
          <p style={{ margin: '0 0 10px', color: '#64748b', fontSize: 15, fontFamily: 'Arial, sans-serif' }}>
            This is to certify that
          </p>
          <p style={{
            margin: '0 0 18px',
            fontSize: 52,
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.1,
            borderBottom: `3px solid ${accentColor}`,
            paddingBottom: 14,
          }}>
            {studentName}
          </p>
          <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: 15, fontFamily: 'Arial, sans-serif' }}>
            has successfully completed the course
          </p>
          <p style={{ margin: 0, fontSize: 30, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
            {courseTitle}
          </p>
        </div>

        {/* Footer: date/score + signature + seal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>

          {/* Date & Score */}
          <div>
            <p style={{ margin: '0 0 4px', color: '#94a3b8', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>
              Date Issued
            </p>
            <p style={{ margin: '0 0 18px', fontSize: 18, fontWeight: 700, color: '#0f172a' }}>
              {dateStr}
            </p>
            <p style={{ margin: '0 0 4px', color: '#94a3b8', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>
              Achievement Score
            </p>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 900, color: accentColor }}>
              {pct}%
            </p>
          </div>

          {/* Founder Signature */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {/* Stylised cursive signature */}
            <svg width="180" height="60" viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 45 Q20 10, 38 30 Q50 45, 60 20 Q68 5, 80 28 Q90 48, 105 22 Q118 5, 132 30 Q142 48, 158 18 Q168 5, 175 35"
                stroke="#0f172a"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 50 Q50 52, 90 50 Q130 48, 170 50"
                stroke={accentColor}
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <div style={{ width: 160, height: 1, background: '#e2e8f0' }} />
            <p style={{ margin: '4px 0 0', fontSize: 14, fontWeight: 700, color: '#0f172a', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
              Denis Kobia
            </p>
            <p style={{ margin: '1px 0 0', fontSize: 10, color: '#94a3b8', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
              Founder, CodeWork Academy
            </p>
          </div>

          {/* Seal */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 108, height: 108, borderRadius: '50%',
              border: `5px solid ${accentColor}`,
              background: `${accentColor}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 10px ${accentColor}12`,
              flexDirection: 'column', gap: 4,
            }}>
              <span style={{ fontSize: 34 }}>🏆</span>
              <span style={{ fontSize: 8, color: accentColor, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>
                CERTIFIED
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 9, color: '#94a3b8', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>
              Verified
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom-right decorative arc ── */}
      <div style={{ position: 'absolute', bottom: -30, right: -30, width: 200, height: 200, borderRadius: '50%', border: `2px solid ${accentColor}25`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -10, right: -10, width: 140, height: 140, borderRadius: '50%', border: `1px solid ${accentColor}18`, pointerEvents: 'none' }} />
    </div>
  );
});

export default CertificateTemplate;
