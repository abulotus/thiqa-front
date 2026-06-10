"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSuperAdmin } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import BackToDashboard from "@/components/BackToDashboard";


type Merchant = {
  id: string;
  business_name_en: string;
  business_name_ar?: string;
  owner_name: string;
  phone_number?: string;
  city?: string;
  address?: string;
  registration_number?: string;
  status?: string;
};

export default function MerchantsAdminPage() {
  const router = useRouter();

  const [allowed, setAllowed] = useState(false);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
  business_name_en: "",
  business_name_ar: "",
  owner_name: "",
  phone_number: "",
  city: "",
  address: "",
  registration_number: "",

  email: "",
  password: "",
  role: "merchant_admin",
});


  useEffect(() => {
    if (!isSuperAdmin()) {
      router.push("/dashboard");
      return;
    }

    setAllowed(true);
    loadMerchants();
  }, []);


  async function loadMerchants() {
    try {
      const data = await apiFetch("/admin/merchants");
      setMerchants(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function resetForm() {
  setEditingId(null);

  setForm({
    business_name_en: "",
    business_name_ar: "",
    owner_name: "",
    phone_number: "",
    city: "",
    address: "",
    registration_number: "",

    email: "",
    password: "",
    role: "merchant_admin",
  });
}

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  try {
    if (editingId) {
      const updatePayload = {
        business_name_en: form.business_name_en,
        business_name_ar: form.business_name_ar,
        owner_name: form.owner_name,
        phone_number: form.phone_number,
        city: form.city,
        address: form.address,
        registration_number: form.registration_number,
      };

      await apiFetch(`/admin/merchants/${editingId}`, {
        method: "PATCH",
        body: JSON.stringify(updatePayload),
      });
    } else {
      await apiFetch("/admin/merchants", {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    resetForm();
    await loadMerchants();
  } catch (err: any) {
    setError(err.message);
  }
}

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this merchant?")) return;

    try {
      await apiFetch(`/admin/merchants/${id}`, {
        method: "DELETE",
      });

      await loadMerchants();
    } catch (err: any) {
      setError(err.message);
    }
  }

  function startEdit(merchant: Merchant) {
  setEditingId(merchant.id);

  setForm({
    business_name_en: merchant.business_name_en || "",
    business_name_ar: merchant.business_name_ar || "",
    owner_name: merchant.owner_name || "",
    phone_number: merchant.phone_number || "",
    city: merchant.city || "",
    address: merchant.address || "",
    registration_number: merchant.registration_number || "",

    email: "",
    password: "",
    role: "merchant_admin",
  });
}


  if (!allowed) {
    return <main className="p-8">Checking access...</main>;
  }

  return (
    <main className="p-8">

      <div className="mb-6 flex items-center justify-between">
    <BackToDashboard />
    </div>
         <h1 className="text-2xl font-bold mb-6">Manage Merchants</h1>

      {error && (
        <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-xl">
        <input
          className="w-full border p-3 rounded"
          placeholder="Business name English"
          value={form.business_name_en}
          onChange={(e) =>
            setForm({ ...form, business_name_en: e.target.value })
          }
          required
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Business name Arabic"
          value={form.business_name_ar}
          onChange={(e) =>
            setForm({ ...form, business_name_ar: e.target.value })
          }
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Owner name"
          value={form.owner_name}
          onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
          required
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Phone number"
          value={form.phone_number}
          onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <input
          className="w-full border p-3 rounded"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

<input
  className="w-full border p-3 rounded"
  type="email"
  placeholder="Login email"
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
  required={!editingId}
/>

<input
  className="w-full border p-3 rounded"
  type="password"
  placeholder="Login password"
  value={form.password}
  onChange={(e) => setForm({ ...form, password: e.target.value })}
  required={!editingId}
/>

<select
  className="w-full border p-3 rounded"
  value={form.role}
  onChange={(e) => setForm({ ...form, role: e.target.value })}
  disabled={!!editingId}
>
  <option value="merchant_admin">Merchant Admin</option>
  <option value="merchant_user">Merchant User</option>
</select>

{!editingId && (
  <>
    {/* email input */}
    {/* password input */}
    {/* role select */}
  </>
)}
        <input
          className="w-full border p-3 rounded"
          placeholder="Registration number"
          value={form.registration_number}
          onChange={(e) =>
            setForm({ ...form, registration_number: e.target.value })
          }
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {editingId ? "Update Merchant" : "Add Merchant"}
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
            <th className="border p-2 text-left">Business</th>
            <th className="border p-2 text-left">Owner</th>
            <th className="border p-2 text-left">Phone</th>
            <th className="border p-2 text-left">City</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {merchants.map((merchant) => (
            <tr key={merchant.id}>
              <td className="border p-2">{merchant.business_name_en}</td>
              <td className="border p-2">{merchant.owner_name}</td>
              <td className="border p-2">{merchant.phone_number}</td>
              <td className="border p-2">{merchant.city}</td>
              <td className="border p-2">{merchant.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => startEdit(merchant)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(merchant.id)}
                  className="rounded bg-red-600 px-3 py-1 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}