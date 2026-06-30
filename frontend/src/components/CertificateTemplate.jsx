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
      <div style={{
        position: 'absolute', inset: 14,
        border: `2px solid ${accentColor}55`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 20,
        border: `1px solid ${accentColor}30`,
        pointerEvents: 'none',
      }} />

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
        return (
          <div key={i} style={{ position: 'absolute', width: 40, height: 40, ...pos, ...bdr }} />
        );
      })}

      {/* ── Left sidebar ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, width: 210, height: H,
        background: '#0f172a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 20,
      }}>
        {/* Logo mark */}
        <div style={{
          width: 78, height: 78, borderRadius: 18,
          background: '#0ea5e9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 50px #0ea5e960',
        }}>
          <span style={{
            fontSize: 38, fontWeight: 900, color: '#ffffff',
            fontFamily: 'Arial, sans-serif', lineHeight: 1,
          }}>Z</span>
        </div>

        <div style={{ width: 1, height: 48, background: '#1e293b' }} />

        <p style={{
          color: '#475569',
          fontSize: 10,
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontFamily: 'Arial, sans-serif',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          margin: 0,
        }}>CodeWorks Academy</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 20 }}>
          {[0,1,2,3,4,5,6].map(i => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: '50%',
              background: i === 3 ? '#0ea5e9' : '#1e293b',
            }} />
          ))}
        </div>
      </div>

      {/* ── Top accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 210, right: 0, height: 7,
        background: accentColor,
      }} />

      {/* ── Main content area ── */}
      <div style={{
        position: 'absolute', left: 210, top: 7, right: 0, bottom: 0,
        padding: '52px 72px',
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
          }}>CodeWorks Academy</p>

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

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
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

          {/* Seal */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 108, height: 108, borderRadius: '50%',
              border: `5px solid ${accentColor}`,
              background: `${accentColor}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 0 10px ${accentColor}12`,
            }}>
              <span style={{ fontSize: 42 }}>🏆</span>
            </div>
            <p style={{ margin: 0, fontSize: 9, color: '#94a3b8', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>
              Verified
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom-right decorative arc ── */}
      <div style={{
        position: 'absolute', bottom: -30, right: -30,
        width: 200, height: 200,
        borderRadius: '50%',
        border: `2px solid ${accentColor}25`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -10, right: -10,
        width: 140, height: 140,
        borderRadius: '50%',
        border: `1px solid ${accentColor}18`,
        pointerEvents: 'none',
      }} />
    </div>
  );
});

export default CertificateTemplate;
