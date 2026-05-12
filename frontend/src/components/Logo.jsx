export default function Logo({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polyline
        points="2,3 13,3 2,9 13,9 2,15 13,15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
