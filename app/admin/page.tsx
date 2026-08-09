import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminDashboard } from "../../components/admin-dashboard";
import { AdminPinGate } from "../../components/admin-pin-gate";
import { isAdminAuthConfigured, isAdminSessionValid, ADMIN_SESSION_COOKIE } from "../../lib/admin-auth";
import { getCatalogProducts } from "../../lib/catalog-repository";
import { isDatabaseConfigured } from "../../lib/postgres";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | KORN & COINS",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (isAdminSessionValid(sessionToken)) {
    const products = await getCatalogProducts();
    return <AdminDashboard databaseConfigured={isDatabaseConfigured()} products={products} />;
  }

  return <AdminPinGate configured={isAdminAuthConfigured()} />;
}
