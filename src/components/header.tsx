import Link from "next/link";

const nav = [
  { href: "/jobs", label: "Jobs" },
  { href: "/saved-jobs", label: "Saved" },
  { href: "/applications", label: "Applications" },
  { href: "/dashboard/employer", label: "Employer" },
];

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          TalentBridge
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-700">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-zinc-950">
              {item.label}
            </Link>
          ))}
          <Link href="/auth/sign-in" className="rounded-md bg-zinc-900 px-3 py-1.5 text-white">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
