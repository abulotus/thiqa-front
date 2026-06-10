"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { isSuperAdmin, logout } from "@/lib/auth";
import { apiFetch } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.replace("/");
      return;
    }

    setSuperAdmin(isSuperAdmin());
    setMounted(true);
  }, [router]);

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error(error);
    }

    logout();
    router.replace("/");
  };

  if (!mounted) {
    return (
      <main className="flex h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main dir="rtl" className="font-ar p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {superAdmin ? "Super Admin Dashboard" : "Merchant Dashboard"}
        </h1>

        <button
          onClick={handleLogout}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>

      <div className="space-y-4">
        {superAdmin && (
          <>
            <Link
              href="/admin/merchants"
              className="block rounded bg-red-700 p-4 text-white"
            >
              إدارة مزودي الخدمة
            </Link>

            <Link
              href="/admin/integrations"
              className="block rounded bg-red-700 p-4 text-white"
            >
              إدارة API الخارجية
            </Link>
          </>
        )}

        <Link
          href="/customers"
          className="block rounded bg-blue-600 p-4 text-white"
        >
          إدارة المستخدمين
        </Link>

        <Link
          href="/credit-accounts"
          className="block rounded bg-purple-600 p-4 text-white"
        >
          إدارة الاحسابات الائتمانية
        </Link>

        <Link
          href="/payments"
          className="block rounded bg-gray-800 p-4 text-white"
        >
          إدارة الدفعات
        </Link>
      </div>
    </main>
  );
}