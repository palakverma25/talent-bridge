import Link from "next/link";
import { getUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions";

export async function Header() {
  const user = await getUser();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          TalentBridge
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-700">
          <Link href="/jobs" className="hover:text-zinc-950">Jobs</Link>
          
          {user?.role === "candidate" && (
            <>
              <Link href="/saved-jobs" className="hover:text-zinc-950">Saved</Link>
              <Link href="/applications" className="hover:text-zinc-950">Applications</Link>
              <Link href="/dashboard/candidate" className="hover:text-zinc-950">Dashboard</Link>
            </>
          )}

          {user?.role === "employer" && (
            <>
              <Link href="/dashboard/employer" className="hover:text-zinc-950">Dashboard</Link>
              <Link href="/post-job" className="hover:text-zinc-950">Post Job</Link>
            </>
          )}

          {!user ? (
            <Link href="/auth/sign-in" className="rounded-md bg-zinc-900 px-3 py-1.5 text-white">
              Sign in
            </Link>
          ) : (
            <form action={logoutAction}>
              <button type="submit" className="rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-700 hover:bg-zinc-50">
                Log out
              </button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
