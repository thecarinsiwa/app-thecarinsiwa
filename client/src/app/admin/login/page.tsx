'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API_BASE_URL as API } from '@/lib/api';

const errors: Record<string, string> = {
  config: 'Authentification Google non configurée.',
  callback: 'Erreur de retour Google.',
  token: 'Impossible d’obtenir le jeton Google.',
  profile: 'Impossible de récupérer le profil.',
  email: 'Adresse email non fournie.',
  unauthorized: 'Cette adresse n’est pas autorisée à accéder à l’admin.',
  otp_send: 'Impossible d’envoyer le code par email.',
  server: 'Erreur serveur lors de la connexion Google. Réessayez ou contactez l’administrateur.',
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const step = searchParams.get('step');
  const errorParam = searchParams.get('error');

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (errorParam && errors[errorParam]) setError(errors[errorParam]);
  }, [errorParam]);

  const handleGoogleLogin = () => {
    window.location.href = `${API}/auth/google`;
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || code.length !== 6) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || 'Code invalide ou expiré.');
        return;
      }
      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Erreur de connexion.');
    } finally {
      setLoading(false);
    }
  };

  const isOtpStep = step === 'otp' && token;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 dark:bg-slate-900/30">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Connexion admin
          </h1>
          <a href="/" className="text-sm text-slate-500 hover:text-accent-green dark:hover:text-accent-green-light">Voir le site</a>
        </div>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {isOtpStep
            ? 'Entrez le code à 6 chiffres envoyé à votre adresse Google.'
            : 'Connectez-vous avec votre compte Google pour recevoir un code par email.'}
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-200">
            {error}
          </div>
        )}

        {isOtpStep ? (
          <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Code à 6 chiffres
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-2xl tracking-[0.5em] dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full rounded-xl bg-accent-green py-3 font-medium text-white disabled:opacity-50 dark:bg-accent-green-light"
            >
              {loading ? 'Vérification...' : 'Valider'}
            </button>
          </form>
        ) : (
          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-700"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Se connecter avec Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">Chargement...</div>}>
      <LoginContent />
    </Suspense>
  );
}
