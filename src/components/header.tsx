import Link from "next/link";
import { getUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions";

export async function Header() {
  const user = await getUser();

  return (
    <header className="glass-header">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl tracking-tight gradient-text">
          TalentBridge
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          <Link href="/jobs" className="hover:text-violet-600 transition-colors">Jobs</Link>
          
          {user?.role === "candidate" && (
            <>
              <Link href="/saved-jobs" className="hover:text-violet-600 transition-colors">Saved</Link>
              <Link href="/applications" className="hover:text-violet-600 transition-colors">Applications</Link>
              <Link href="/dashboard/candidate" className="hover:text-violet-600 transition-colors">Dashboard</Link>
            </>
          )}

          {user?.role === "employer" && (
            <>
              <Link href="/dashboard/employer" className="hover:text-violet-600 transition-colors">Dashboard</Link>
              <Link href="/post-job" className="hover:text-violet-600 transition-colors">Post Job</Link>
            </>
          )}

          {!user ? (
            <Link href="/auth/sign-in" className="rounded-full gradient-bg px-5 py-2 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all">
              Sign in
            </Link>
          ) : (
            <form action={logoutAction}>
              <button type="submit" className="rounded-full border border-slate-200 bg-white px-5 py-2 text-slate-700 shadow-sm hover:bg-slate-50 hover:text-red-600 transition-all">
                Log out
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
