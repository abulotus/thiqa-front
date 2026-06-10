"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { apiFetch } from "@/lib/api";
import { isSuperAdmin } from "@/lib/auth";

type Merchant = {
  id: string;
  business_name_en: string;
  business_name_ar?: string;
};

type MerchantIntegration = {
  id: string;
  merchant_id: string;
  name: string;
  provider?: string;
  base_url: string;
  auth_type: string;
  purpose?: string;
  is_active: boolean;
};

export default function IntegrationsPage() {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [integrations, setIntegrations] = useState<MerchantIntegration[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    merchant_id: "",
    name: "",
    provider: "",
    base_url: "",
    api_key: "",
    auth_type: "api_key",
    purpose: "",
  });

  useEffect(() => {
    if (!isSuperAdmin()) {
      router.replace("/dashboard");
      return;
    }

    setAllowed(true);
    loadMerchants();
    loadIntegrations();
  }, [router]);

  async function loadMerchants() {
    try {
      const data = await apiFetch("/admin/merchants");
      setMerchants(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function loadIntegrations() {
    try {
      const data = await apiFetch("/admin/merchant-integrations");
      setIntegrations(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function getMerchantName(merchantId: string) {
    const merchant = merchants.find((m) => m.id === merchantId);

    if (!merchant) return merchantId;

    return `${merchant.business_name_en}${
      merchant.business_name_ar ? ` / ${merchant.business_name_ar}` : ""
    }`;
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      merchant_id: "",
      name: "",
      provider: "",
      base_url: "",
      api_key: "",
      auth_type: "api_key",
      purpose: "",
    });
  }

  function startEdit(item: MerchantIntegration) {
    setEditingId(item.id);

    setForm({
      merchant_id: item.merchant_id,
      name: item.name || "",
      provider: item.provider || "",
      base_url: item.base_url || "",
      api_key: "",
      auth_type: item.auth_type || "api_key",
      purpose: item.purpose || "",
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        await apiFetch(`/admin/merchant-integrations/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(form),
        });
      } else {
        await apiFetch("/admin/merchant-integrations", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }

      resetForm();
      await loadIntegrations();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function deactivateIntegration(id: string) {
    if (!confirm("Deactivate this merchant integration?")) return;

    try {
      await apiFetch(`/admin/merchant-integrations/${id}`, {
        method: "DELETE",
      });

      await loadIntegrations();
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (!allowed) {
    return <main className="p-8">Checking access...</main>;
  }

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="rounded bg-gray-600 px-4 py-2 text-white"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold">Manage Merchant APIs</h1>
      </div>

      {error && (
        <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="mb-8 max-w-xl space-y-4">
        <select
          className="w-full rounded border p-3"
          value={form.merchant_id}
          onChange={(e) => setForm({ ...form, merchant_id: e.target.value })}
          required
          disabled={!!editingId}
        >
          <option value="">Select merchant</option>

          {merchants.map((merchant) => (
            <option key={merchant.id} value={merchant.id}>
              {merchant.business_name_en}
              {merchant.business_name_ar
                ? ` / ${merchant.business_name_ar}`
                : ""}
            </option>
          ))}
        </select>

        <input
          className="w-full rounded border p-3"
          placeholder="Integration name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Provider"
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Base URL"
          value={form.base_url}
          onChange={(e) => setForm({ ...form, base_url: e.target.value })}
          required
        />

        <input
          className="w-full rounded border p-3"
          placeholder={
            editingId
              ? "Leave blank to keep existing secret"
              : "API key / token"
          }
          type="password"
          value={form.api_key}
          onChange={(e) => setForm({ ...form, api_key: e.target.value })}
        />

        <select
          className="w-full rounded border p-3"
          value={form.auth_type}
          onChange={(e) => setForm({ ...form, auth_type: e.target.value })}
        >
          <option value="api_key">API Key</option>
          <option value="bearer">Bearer Token</option>
          <option value="basic">Basic Auth</option>
          <option value="none">No Auth</option>
        </select>

        <textarea
          className="w-full rounded border p-3"
          placeholder="Purpose / notes"
          value={form.purpose}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {editingId ? "Update API" : "Add API"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded bg-gray-500 px-4 py-2 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Merchant</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Provider</th>
            <th className="border p-2 text-left">Base URL</th>
            <th className="border p-2 text-left">Auth</th>
            <th className="border p-2 text-left">Purpose</th>
            <th className="border p-2 text-left">Active</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {integrations.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{getMerchantName(item.merchant_id)}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.provider}</td>
              <td className="border p-2">{item.base_url}</td>
              <td className="border p-2">{item.auth_type}</td>
              <td className="border p-2">{item.purpose}</td>
              <td className="border p-2">
                <span
                  className={`rounded px-2 py-1 text-sm text-white ${
                    item.is_active ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {item.is_active ? "ACTIVE" : "INACTIVE"}
                </span>
              </td>
              <td className="space-x-2 border p-2">
                <button
                  onClick={() => startEdit(item)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                {item.is_active && (
                  <button
                    onClick={() => deactivateIntegration(item.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white"
                  >
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}