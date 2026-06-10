"use client";

import Link from "next/link";

export default function BackToDashboard() {
  return (
    <Link
      href="/dashboard"
      className="inline-block rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
    >
      ← Back to Dashboard
    </Link>
  );
}