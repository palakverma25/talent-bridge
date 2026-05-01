import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { UserRole } from "@/types";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_super_secret_key_for_demo_mode_123"
);

const COOKIE_NAME = "auth_token";

export async function signToken(payload: { role: UserRole; email: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { role: UserRole; email: string };
  } catch (error) {
    return null;
  }
}

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyToken(token);
}

export const requireRole = async (allowedRoles: UserRole[]) => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    redirect("/auth/sign-in");
  }

  const payload = await verifyToken(token);

  if (!payload || !payload.role) {
    redirect("/auth/sign-in");
  }

  if (!allowedRoles.includes(payload.role)) {
    redirect(payload.role === "employer" ? "/dashboard/employer" : "/dashboard/candidate");
  }

  return { role: payload.role };
};
