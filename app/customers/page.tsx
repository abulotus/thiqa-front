"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import BackToDashboard from "@/components/BackToDashboard";
import { isSuperAdmin } from "@/lib/auth";

type Customer = {
  id: string;
  full_name_ar: string;
  full_name_en?: string;
  mobile_number: string;
  national_id?: string;
  city?: string;
  address?: string;
  risk_level?: string;
  status?: string;
};

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [superAdmin, setSuperAdmin] = useState(false);
  const [form, setForm] = useState({
    full_name_ar: "",
    full_name_en: "",
    mobile_number: "",
    national_id: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    loadCustomers();
    setSuperAdmin(isSuperAdmin());
  }, []);

  async function loadCustomers() {
    try {
      const data = await apiFetch("/merchant/customers");
      setCustomers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      full_name_ar: "",
      full_name_en: "",
      mobile_number: "",
      national_id: "",
      city: "",
      address: "",
    });
  }

  function editCustomer(customer: Customer) {
    setEditingId(customer.id);

    setForm({
      full_name_ar: customer.full_name_ar || "",
      full_name_en: customer.full_name_en || "",
      mobile_number: customer.mobile_number || "",
      national_id: customer.national_id || "",
      city: customer.city || "",
      address: customer.address || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function saveCustomer(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        await apiFetch(`/merchant/customers/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(form),
        });
      } else {
        await apiFetch("/merchant/customers", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }

      resetForm();
      loadCustomers();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function deactivateCustomer(id: string) {
    if (!confirm("Deactivate this customer?")) return;

    try {
      await apiFetch(`/merchant/customers/${id}`, {
        method: "DELETE",
      });

      loadCustomers();
    } catch (err: any) {
      setError(err.message);
    }
  }
   const totalPages = Math.ceil(customers.length / pageSize);

const paginatedCustomers = customers.slice(
  (page - 1) * pageSize,
  page * pageSize
);
  return (
    <main className="max-w-7xl mx-auto p-8">

    <div className="mb-6 flex items-center justify-between">
   
    <h1 className="text-2xl font-bold">Manage Customers</h1>

     <BackToDashboard />
     
  </div>
    
      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={saveCustomer}
        className="mb-8 rounded border p-6 bg-white shadow"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Customer" : "Add Customer"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            className="border rounded p-3"
            placeholder="Arabic Name"
            value={form.full_name_ar}
            onChange={(e) =>
              setForm({ ...form, full_name_ar: e.target.value })
            }
            required
          />

          <input
            className="border rounded p-3"
            placeholder="English Name"
            value={form.full_name_en}
            onChange={(e) =>
              setForm({ ...form, full_name_en: e.target.value })
            }
          />

          <input
            className="border rounded p-3"
            placeholder="Mobile"
            value={form.mobile_number}
            onChange={(e) =>
              setForm({ ...form, mobile_number: e.target.value })
            }
            required
          />

          <input
            className="border rounded p-3"
            placeholder="National ID"
            value={form.national_id}
            onChange={(e) =>
              setForm({ ...form, national_id: e.target.value })
            }
          />

          <input
            className="border rounded p-3"
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
          />

          <input
            className="border rounded p-3"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
  <button
    type="submit"
    className="rounded bg-blue-600 px-5 py-2 text-white"
  >
    {editingId ? "Update Customer" : "Add Customer"}
  </button>

  {editingId && (
    <button
      type="button"
      onClick={resetForm}
      className="rounded bg-gray-500 px-5 py-2 text-white"
    >
      Cancel
    </button>
  )}

  {superAdmin && !editingId && (
    <span className="rounded-full border border-yellow-300 bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800">
      ⚠️ Hey super admin, adding customers should be done by merchants only!
    </span>
  )}
</div>
      </form>

      <div className="rounded border bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Arabic Name</th>
              <th className="p-3 text-left">English Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">National ID</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan={7} className="p-6 text-center">
                  Loading...
                </td>
              </tr>

            ) : (

              paginatedCustomers.map((customer) => (

                <tr key={customer.id} className="border-t">

                  <td className="p-3">{customer.full_name_ar}</td>

                  <td className="p-3">{customer.full_name_en}</td>

                  <td className="p-3">{customer.mobile_number}</td>

                  <td className="p-3">{customer.national_id}</td>

                  <td className="p-3">{customer.city}</td>

                  <td className="p-3">{customer.status}</td>

                  <td className="p-3 space-x-2">

                    <button
                      onClick={() => editCustomer(customer)}
                      className="rounded bg-yellow-500 px-3 py-1 text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deactivateCustomer(customer.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white"
                    >
                      Deactivate
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>
        <div className="mt-4 flex items-center justify-between">
  <button
    onClick={() => setPage((p) => Math.max(p - 1, 1))}
    disabled={page === 1}
    className="rounded bg-gray-600 px-4 py-2 text-white disabled:bg-gray-300"
  >
    Previous
  </button>

  <span className="text-sm text-gray-700">
    Page {page} of {totalPages || 1}
  </span>

  <button
    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
    disabled={page === totalPages || totalPages === 0}
    className="rounded bg-gray-600 px-4 py-2 text-white disabled:bg-gray-300"
  >
    Next
  </button>
</div>
      </div>

    </main>
  );
}