import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Award, Download, Lock, CheckCircle, Loader2, Trophy,
  CreditCard, Smartphone, AlertCircle, ShieldCheck, X, Phone, Banknote,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { apiFetch } from '../services/api';
import { useAuthStore } from '../store/authStore';
import CertificateTemplate from '../components/CertificateTemplate';

const CERT_COURSES = [
  { id: 3, title: 'Vibe Coding',            accentColor: '#f59e0b', icon: '⚡', tagline: 'AI-Powered full-stack project',     path: '/courses/3' },
  { id: 4, title: 'Frontend Development',   accentColor: '#8b5cf6', icon: '🎨', tagline: 'UI design & React applications',    path: '/courses/4' },
  { id: 5, title: 'Backend Development',    accentColor: '#10b981', icon: '⚙️', tagline: 'APIs, servers & authentication',    path: '/courses/5' },
  { id: 6, title: 'Database Engineering',   accentColor: '#6366f1', icon: '🗄️', tagline: 'SQL, Supabase & data modelling',   path: '/courses/6' },
  { id: 7, title: 'Full Stack Application', accentColor: '#f43f5e', icon: '🚀', tagline: 'End-to-end production deployment', path: '/courses/7' },
];

const PASS_PCT      = 75;
const CERT_FEE_KES  = 500;
const CERT_FEE_KOBO = CERT_FEE_KES * 100; // Paystack uses kobo (lowest unit)

function formatOrdinal(day) {
  if (day % 100 >= 11 && day % 100 <= 13) return `${day}th`;
  return `${day}${({ 1: 'st', 2: 'nd', 3: 'rd' })[day % 10] || 'th'}`;
}

function formatAwardedDate(date) {
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  return `Awarded this ${formatOrdinal(date.getDate())} day of ${month}, ${date.getFullYear()}`;
}

async function createCertificateId({ ownerId, courseId, studentName, issuedAt }) {
  const issueDate = [
    issuedAt.getFullYear(),
    String(issuedAt.getMonth() + 1).padStart(2, '0'),
    String(issuedAt.getDate()).padStart(2, '0'),
  ].join('-');
  const payload = [
    'CodeWorks Academy Certificate',
    'certificate-id-v1',
    ownerId,
    courseId,
    studentName.trim(),
    issueDate,
  ].join('|');

  if (window.crypto?.subtle) {
    const digest = await window.crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(payload),
    );
    const bytes = Array.from(new Uint8Array(digest));
    const hash = bytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return `CW-${issueDate.replace(/-/g, '')}-${hash.slice(0, 20).toUpperCase()}`;
  }

  // The browser supports Web Crypto in production; this fallback keeps the
  // download usable in older preview environments.
  let hash = 2166136261;
  for (const character of payload) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return `CW-${issueDate.replace(/-/g, '')}-${(hash >>> 0).toString(16).padStart(8, '0').toUpperCase()}`;
}

/* ── Load Paystack script once ── */
function usePaystackScript() {
  const [ready, setReady] = useState(!!window.PaystackPop);
  useEffect(() => {
    if (window.PaystackPop) { setReady(true); return; }
    const s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.async = true;
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);
  return ready;
}

export default function Certificates() {
  const user    = useAuthStore(s => s.user);
  const session = useAuthStore(s => s.session);

  const studentName = user?.full_name?.trim() || 'Student';
  const userEmail   = user?.email || '';
  const ownerId     = user?.id || session?.user?.id || userEmail || 'unknown-owner';

  const paystackReady = usePaystackScript();

  const [assignments,   setAssignments]   = useState([]);
  const [paidCourses,   setPaidCourses]   = useState({});   // { [courseId]: { paid, paid_at, channel } }
  const [loadingData,   setLoadingData]   = useState(true);
  const [generating,    setGenerating]    = useState(null); // course id being PDF-ed
  const [previewData,   setPreviewData]   = useState(null);
  const [payingCourse,  setPayingCourse]  = useState(null); // course id with Paystack open
  const [verifying,     setVerifying]     = useState(null); // course id being verified
  const [payError,      setPayError]      = useState(null);
  const [paySuccess,    setPaySuccess]    = useState(null); // course id just paid
  const [mpesaPayment, setMpesaPayment] = useState(null);   // { course, assignment }
  const [mpesaReference, setMpesaReference] = useState(null);
  const [mpesaState,    setMpesaState]    = useState('idle'); // idle, requesting, pending, success, failed
  const [mpesaMessage,  setMpesaMessage]  = useState('');
  const [mpesaError,    setMpesaError]    = useState('');

  const certRef = useRef(null);

  /* ── Fetch assignments + payment status ── */
  useEffect(() => {
    if (!session) return;
    Promise.all([
      apiFetch('/assignments').then(r => r.data || []),
      apiFetch('/payments/status').then(r => r.data || {}),
    ])
      .then(([asgn, paid]) => { setAssignments(asgn); setPaidCourses(paid); })
      .catch(console.error)
      .finally(() => setLoadingData(false));
  }, [session]);

  /* ── Derive earned certs ── */
  const earned = useMemo(() => {
    const map = {};
    for (const c of CERT_COURSES) {
      const hits = assignments
        .filter(a => a.course_id === c.id && a.total > 0)
        .map(a => ({ ...a, pct: Math.round((a.score / a.total) * 100) }))
        .filter(a => a.pct >= PASS_PCT)
        .sort((a, b) => b.pct - a.pct);
      if (hits.length) map[c.id] = hits[0];
    }
    return map;
  }, [assignments]);

  /* ── PDF capture ── */
  useEffect(() => {
    if (!previewData || !certRef.current) return;
    const timer = setTimeout(async () => {
      try {
        const canvas = await html2canvas(certRef.current, {
          scale: 2, useCORS: true, backgroundColor: '#ffffff', logging: false,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1122, 793] });
        pdf.addImage(imgData, 'PNG', 0, 0, 1122, 793);
        pdf.save(`CodeWork-Certificate-${previewData.courseTitle.replace(/\s+/g, '-')}.pdf`);
      } catch (e) {
        console.error('Certificate PDF error:', e);
      } finally {
        setGenerating(null);
        setPreviewData(null);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [previewData]);

  const prepareCertificateDownload = useCallback(async (course, assignment) => {
    setGenerating(course.id);
    const issuedAt = new Date();
    try {
      const certificateId = await createCertificateId({
        ownerId,
        courseId: course.id,
        studentName,
        issuedAt,
      });
      setPreviewData({
        courseTitle: course.title,
        dateStr: formatAwardedDate(issuedAt),
        certificateId,
      });
    } catch (error) {
      console.error('Certificate ID generation error:', error);
      setGenerating(null);
      setPayError('Could not prepare your certificate. Please try again.');
    }
  }, [ownerId, studentName]);

  /* ── Open Paystack popup ── */
  const openPaystack = useCallback((course, assignment, onPaidCallback) => {
    if (!paystackReady || !window.PaystackPop) {
      setPayError('Payment system is loading, please try again in a moment.');
      return;
    }
    setPayError(null);
    setPayingCourse(course.id);

    const reference = `CW-${course.id}-${Date.now()}`;

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: userEmail,
      amount: CERT_FEE_KOBO,
      currency: 'KES',
      ref: reference,
      channels: ['card', 'mobile_money'],   // card = Visa/Mastercard, mobile_money = M-Pesa
      label: studentName,
      metadata: {
        custom_fields: [
          { display_name: 'Student Name', variable_name: 'student_name', value: studentName },
          { display_name: 'Course',        variable_name: 'course',        value: course.title },
          { display_name: 'Certificate',   variable_name: 'certificate',   value: 'yes' },
        ],
      },
      callback: async (response) => {
        setPayingCourse(null);
        setVerifying(course.id);
        try {
          await apiFetch('/payments/verify', {
            method: 'POST',
            body: JSON.stringify({ reference: response.reference, course_id: course.id }),
          });
          setPaidCourses(prev => ({
            ...prev,
            [course.id]: { paid: true, paid_at: new Date().toISOString(), channel: response.channel },
          }));
          setPaySuccess(course.id);
          setTimeout(() => setPaySuccess(null), 4000);
          await onPaidCallback?.();
        } catch {
          setPayError('Payment was received but verification failed. Please contact support.');
        } finally {
          setVerifying(null);
        }
      },
      onClose: () => {
        setPayingCourse(null);
      },
    });

    handler.openIframe();
  }, [paystackReady, userEmail, studentName]);

  /* ── Open the focused M-Pesa prompt ── */
  const openMpesaPrompt = useCallback((course, assignment) => {
    setPayError(null);
    setMpesaError('');
    setMpesaMessage('');
    setMpesaReference(null);
    setMpesaState('idle');
    setMpesaPayment({ course, assignment });
  }, []);

  const closeMpesaPrompt = useCallback(() => {
    setMpesaPayment(null);
    setMpesaReference(null);
    setMpesaState('idle');
    setMpesaMessage('');
    setMpesaError('');
  }, []);

  /* ── Send the M-Pesa STK push request ── */
  const requestMpesa = useCallback(async ({ phone, amount }) => {
    if (!mpesaPayment) return;

    setMpesaError('');
    setMpesaState('requesting');
    try {
      const response = await apiFetch('/payments/mpesa/request', {
        method: 'POST',
        body: JSON.stringify({
          course_id: mpesaPayment.course.id,
          phone,
          amount: Number(amount),
        }),
      });
      setMpesaReference(response.data.reference);
      setMpesaMessage(response.data.display_text || 'Check your phone and enter your M-Pesa PIN to complete payment.');
      setMpesaState('pending');
    } catch (error) {
      setMpesaState('failed');
      setMpesaError(error?.message || 'We could not send the M-Pesa prompt. Check the number and try again.');
    }
  }, [mpesaPayment]);

  /* ── Watch Paystack until the M-Pesa customer finishes or the request expires ── */
  useEffect(() => {
    if (!mpesaReference || !mpesaPayment) return undefined;

    let stopped = false;
    let checking = false;

    const checkStatus = async () => {
      if (stopped || checking) return;
      checking = true;
      try {
        const response = await apiFetch(
          `/payments/mpesa/status/${encodeURIComponent(mpesaReference)}?course_id=${mpesaPayment.course.id}`,
        );
        if (stopped) return;

        if (response.status === 'success' && response.paid) {
          setMpesaState('success');
          setMpesaMessage('Payment confirmed. Your certificate is ready to download.');
          setPaidCourses(prev => ({
            ...prev,
            [mpesaPayment.course.id]: {
              paid: true,
              paid_at: new Date().toISOString(),
              channel: 'mobile_money',
            },
          }));
          setPaySuccess(mpesaPayment.course.id);
          setTimeout(() => setPaySuccess(null), 4000);
          setMpesaReference(null);
        } else if (response.status === 'failed') {
          setMpesaState('failed');
          setMpesaMessage(response.message || 'The M-Pesa payment was not completed.');
          setMpesaReference(null);
        }
      } catch (error) {
        console.error('M-Pesa status check error:', error);
      } finally {
        checking = false;
      }
    };

    checkStatus();
    const intervalId = setInterval(checkStatus, 5000);
    const timeoutId = setTimeout(() => {
      if (stopped) return;
      setMpesaState('failed');
      setMpesaMessage('The M-Pesa request expired. Please start a new payment request.');
      setMpesaReference(null);
    }, 180000);

    return () => {
      stopped = true;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [mpesaReference, mpesaPayment]);

  const payWithCardFromPrompt = useCallback(() => {
    if (!mpesaPayment) return;
    const { course, assignment } = mpesaPayment;
    closeMpesaPrompt();
    openPaystack(course, assignment, null);
  }, [mpesaPayment, closeMpesaPrompt, openPaystack]);

  /* ── Handle download (pay-gated) ── */
  const handleDownload = useCallback((course, assignment) => {
    if (generating) return;
    const isPaid = paidCourses[course.id]?.paid;
    if (!isPaid) {
      openPaystack(course, assignment, () => prepareCertificateDownload(course, assignment));
      return;
    }
    prepareCertificateDownload(course, assignment);
  }, [generating, paidCourses, openPaystack, prepareCertificateDownload]);

  const total   = CERT_COURSES.length;
  const counted = Object.keys(earned).length;

  return (
    <div className="space-y-8">

      {/* ── Page header ── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Certificates 🎓</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Score <span className="font-semibold text-sky-600">75%+</span> on a module assignment, then pay the{' '}
            <span className="font-semibold text-sky-600">KES {CERT_FEE_KES.toLocaleString()}</span> certificate fee to download your personalised certificate.
          </p>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-soft self-start">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="4" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="#0ea5e9" strokeWidth="4"
                strokeDasharray={`${(counted / total) * 125.6} 125.6`}
                strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-slate-800">
              {counted}/{total}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">Earned</p>
            <p className="text-lg font-black text-slate-900">{counted} Certificate{counted !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* ── Global pay error banner ── */}
      {payError && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{payError}</span>
          <button onClick={() => setPayError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* ── Certificate grid ── */}
      {loadingData ? (
        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm font-medium">Loading your results…</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CERT_COURSES.map(course => {
            const assignment = earned[course.id];
            const isEarned   = !!assignment;
            const isPaid     = !!paidCourses[course.id]?.paid;

            return isEarned
              ? <EarnedCard
                  key={course.id}
                  course={course}
                  assignment={assignment}
                  studentName={studentName}
                  isPaid={isPaid}
                  paying={payingCourse === course.id}
                  verifying={verifying === course.id}
                  justPaid={paySuccess === course.id}
                  generating={generating === course.id}
                  onPayNow={() => openMpesaPrompt(course, assignment)}
                  onDownload={() => handleDownload(course, assignment)}
                />
              : <LockedCard key={course.id} course={course} />;
          })}
        </div>
      )}

      {mpesaPayment && (
        <MpesaPromptModal
          course={mpesaPayment.course}
          status={mpesaState}
          message={mpesaMessage}
          error={mpesaError}
          onClose={closeMpesaPrompt}
          onSubmit={requestMpesa}
          onPayWithCard={payWithCardFromPrompt}
        />
      )}

      {/* ── Hidden certificate template (captured by html2canvas) ── */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1, pointerEvents: 'none' }}>
        {previewData && (
          <CertificateTemplate
            ref={certRef}
            studentName={studentName}
            dateStr={previewData.dateStr}
            certificateId={previewData.certificateId}
          />
        )}
      </div>
    </div>
  );
}

/* ── M-Pesa STK push prompt ── */
function MpesaPromptModal({ course, status, message, error, onClose, onSubmit, onPayWithCard }) {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(String(CERT_FEE_KES));
  const [validationError, setValidationError] = useState('');
  const isBusy = status === 'requesting' || status === 'pending';
  const isComplete = status === 'success';

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const digits = phone.replace(/\D/g, '');
    const enteredAmount = Number(amount);

    if (!/^((0\d{9})|(254\d{9}))$/.test(digits)) {
      setValidationError('Enter a valid Safaricom number, for example 0712345678.');
      return;
    }
    if (!Number.isFinite(enteredAmount) || enteredAmount !== CERT_FEE_KES) {
      setValidationError(`Enter the certificate fee of KES ${CERT_FEE_KES.toLocaleString()}.`);
      return;
    }

    setValidationError('');
    onSubmit({ phone, amount: enteredAmount });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" role="presentation">
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mpesa-payment-title"
      >
        <div className="flex items-start justify-between bg-gradient-to-r from-emerald-600 to-green-500 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-100">Certificate payment</p>
              <h2 id="mpesa-payment-title" className="text-xl font-black">Pay with M-Pesa</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
            aria-label="Close M-Pesa payment"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-bold text-emerald-900">{course.title} certificate</p>
            <p className="mt-1 text-xs leading-relaxed text-emerald-700">
              Enter your Safaricom number and we will send an M-Pesa payment prompt to your phone.
            </p>
          </div>

          {status === 'pending' ? (
            <div className="space-y-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <Loader2 className="mt-0.5 h-5 w-5 flex-shrink-0 animate-spin text-amber-600" />
                <div>
                  <p className="text-sm font-bold text-amber-900">Check your phone</p>
                  <p className="mt-1 text-xs leading-relaxed text-amber-800">
                    {message || `A payment prompt was sent to your M-Pesa number. Enter your PIN to authorize KES ${CERT_FEE_KES.toLocaleString()}.`}
                  </p>
                </div>
              </div>
              <p className="text-center text-xs font-semibold text-amber-700">Waiting for payment confirmation…</p>
            </div>
          ) : status === 'success' ? (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm font-bold">Payment successful</p>
                <p className="mt-1 text-xs">{message || 'Your certificate is ready to download.'}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="mpesa-phone" className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-emerald-600" /> Safaricom M-Pesa phone number
                </label>
                <input
                  id="mpesa-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => { setPhone(event.target.value); setValidationError(''); }}
                  placeholder="0712 345 678"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  disabled={isBusy}
                  required
                />
                <p className="mt-1.5 text-xs text-slate-400">Use a number registered on Safaricom M-Pesa.</p>
              </div>

              <div>
                <label htmlFor="mpesa-amount" className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-600">
                  <Banknote className="h-3.5 w-3.5 text-emerald-600" /> Amount (KES)
                </label>
                <input
                  id="mpesa-amount"
                  type="number"
                  inputMode="numeric"
                  min={CERT_FEE_KES}
                  step="1"
                  value={amount}
                  onChange={(event) => { setAmount(event.target.value); setValidationError(''); }}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  disabled={isBusy}
                  required
                />
                <p className="mt-1.5 text-xs text-slate-400">Certificate fee: KES {CERT_FEE_KES.toLocaleString()}</p>
              </div>

              {(validationError || error || (status === 'failed' && message)) && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span>{validationError || error || message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isBusy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-bold text-white shadow-md transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'requesting' ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending prompt…</>
                ) : (
                  <><Smartphone className="h-4 w-4" /> Request Now</>
                )}
              </button>
            </form>
          )}

          {isComplete ? (
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition hover:bg-slate-800"
            >
              Done
            </button>
          ) : !isBusy ? (
            <button
              type="button"
              onClick={onPayWithCard}
              className="w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              Pay with Visa / Mastercard instead
            </button>
          ) : null}

          <p className="text-center text-[11px] leading-relaxed text-slate-400">
            You will receive a Safaricom prompt. Enter your M-Pesa PIN only on your phone, never in this form.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Earned certificate card ── */
function EarnedCard({ course, assignment, studentName, isPaid, paying, verifying, justPaid, generating, onPayNow, onDownload }) {
  const dateStr = fmtDate(assignment.submitted_at);

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-soft border-2 bg-white flex flex-col"
      style={{ borderColor: `${course.accentColor}60` }}
    >
      {/* Glow blob */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: course.accentColor }} />

      {/* Colour top stripe */}
      <div className="h-1.5 w-full" style={{ background: course.accentColor }} />

      <div className="p-6 flex flex-col gap-5 flex-1">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0"
              style={{ background: `${course.accentColor}18`, border: `1.5px solid ${course.accentColor}40` }}>
              {course.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Certificate of Completion</p>
              <h3 className="font-black text-slate-900 text-lg leading-tight">{course.title}</h3>
            </div>
          </div>
          {isPaid ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" /> Paid
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
              <CheckCircle className="w-3.5 h-3.5" /> Qualified
            </div>
          )}
        </div>

        {/* Certificate preview */}
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-5 flex gap-4 items-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
            style={{ background: `${course.accentColor}20`, border: `3px solid ${course.accentColor}` }}>
            <Trophy className="w-7 h-7" style={{ color: course.accentColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 truncate">{studentName}</p>
            <p className="text-xs text-slate-500 mt-0.5">{course.tagline}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs font-black px-2 py-0.5 rounded-lg"
                style={{ background: `${course.accentColor}18`, color: course.accentColor }}>
                {assignment.pct}% Score
              </span>
              <span className="text-xs text-slate-400">{dateStr}</span>
            </div>
          </div>
        </div>

        {/* Payment panel — show when not paid */}
        {!isPaid && (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Certificate Fee</p>

            {/* Checklist */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Course assignment submitted</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Passed with {assignment.pct}% (minimum 75%)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-amber-700">
                <CreditCard className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Certificate fee: <strong>KES {CERT_FEE_KES.toLocaleString()}</strong></span>
              </div>
            </div>

            {/* Payment method badges */}
            <div className="flex gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                <Smartphone className="w-3 h-3" /> M-Pesa
              </span>
              <span className="flex items-center gap-1.5 bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                <CreditCard className="w-3 h-3" /> Visa / Mastercard
              </span>
            </div>

            {/* Pay Now button */}
            <button
              onClick={onPayNow}
              disabled={paying || verifying}
              className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all text-white shadow-md disabled:opacity-70 hover:opacity-90 active:scale-[0.98]"
              style={{ background: course.accentColor, boxShadow: `0 4px 16px ${course.accentColor}50` }}
            >
              {verifying ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Verifying payment…</>
              ) : paying ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Opening payment…</>
              ) : (
                <><CreditCard className="w-4 h-4" /> Pay Now — KES {CERT_FEE_KES.toLocaleString()}</>
              )}
            </button>
          </div>
        )}

        {/* Success flash */}
        {justPaid && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-2.5 text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" /> Payment confirmed! Your certificate is ready to download.
          </div>
        )}

        {/* Download button */}
        <button
          onClick={onDownload}
          disabled={generating || paying || verifying}
          className={[
            'w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all shadow-md',
            'disabled:opacity-70 hover:opacity-90 active:scale-[0.98]',
            isPaid ? 'text-white' : 'text-white',
          ].join(' ')}
          style={{
            background: isPaid
              ? course.accentColor
              : '#64748b',
            boxShadow: isPaid ? `0 4px 16px ${course.accentColor}50` : 'none',
          }}
        >
          {generating ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Generating PDF…</>
          ) : verifying ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</>
          ) : isPaid ? (
            <><Download className="w-4 h-4" /> Download Certificate PDF</>
          ) : (
            <><CreditCard className="w-4 h-4" /> Pay &amp; Download Certificate</>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── Locked certificate card ── */
function LockedCard({ course }) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-soft border-2 border-slate-100 bg-white/60 flex flex-col opacity-70">
      <div className="h-1.5 w-full bg-slate-200" />
      <div className="p-6 flex flex-col gap-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-slate-100 border border-slate-200 flex-shrink-0 grayscale">
              {course.icon}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Certificate of Completion</p>
              <h3 className="font-black text-slate-500 text-lg leading-tight">{course.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
            <Lock className="w-3.5 h-3.5" /> Locked
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 border border-dashed border-slate-200 p-5 flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
            <Lock className="w-7 h-7 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">Not yet earned</p>
          <p className="text-xs text-slate-400">
            Score <span className="font-bold text-slate-600">75%+</span> on the {course.title} assignment to unlock this certificate
          </p>
        </div>
        <Link
          to={course.path}
          className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-all bg-slate-100 hover:bg-slate-200 text-slate-600"
        >
          Start Module →
        </Link>
      </div>
    </div>
  );
}
