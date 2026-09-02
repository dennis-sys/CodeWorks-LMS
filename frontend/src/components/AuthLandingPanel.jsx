import React from 'react';
import { Brain, Network, Zap } from 'lucide-react';
import Logo from './Logo';
import NeuralNet from './NeuralNet';

const features = [
  { icon: Brain, label: 'AI-Powered', sub: 'Smart guidance' },
  { icon: Network, label: 'Full Stack', sub: '7 live courses' },
  { icon: Zap, label: 'Live Sessions', sub: 'Engage with experts' },
];

export default function AuthLandingPanel({
  onSignIn,
  onCreateAccount,
  description = 'CodeWorks Academy Program is an online coding course that focuses on software development and artificial intelligence upskilling for the new generation of low code software engineers.',
}) {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#030712] text-white">
      <NeuralNet />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#030712]/60 via-transparent to-[#030712]/80" />

      <div className="relative z-10 flex min-h-screen flex-col p-6 sm:p-10">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 shadow-lg shadow-sky-500/40">
            <Logo className="h-5 w-5" />
          </div>
          <span className="text-lg font-black tracking-tight">CodeWorks Academy</span>
        </div>

        <div className="mt-auto max-w-xl pt-16">
          <div className="mb-5">
            <h1 className="mb-2 text-3xl font-black leading-tight sm:text-4xl">
              Learn. Build. Deploy
              <br />
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Ship real, secure and scalable software products.
              </span>
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {features.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm sm:p-3"
              >
                <Icon className="h-4 w-4 text-sky-400" />
                <p className="text-[11px] font-bold text-white sm:text-xs">{label}</p>
                <p className="text-[9px] text-slate-500 sm:text-[10px]">{sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={onSignIn}
              className="w-full rounded-xl bg-sky-500 py-3.5 font-bold text-white shadow-lg shadow-sky-950/40 transition-all hover:bg-sky-600 active:scale-[0.98]"
            >
              Sign In
            </button>
            <p className="text-center text-sm text-slate-400">
              New to CodeWorks?{' '}
              <button
                type="button"
                onClick={onCreateAccount}
                className="font-semibold text-sky-400 hover:text-sky-300 hover:underline"
              >
                Create a free account
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}