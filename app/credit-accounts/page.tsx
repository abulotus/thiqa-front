"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import BackToDashboard from "@/components/BackToDashboard";

type Customer = {
  id: string;
  full_name_ar: string;
  full_name_en?: string;
  mobile_number: string;
};

type CreditAccount = {
  id: string;
  customer_id: string;
  account_type?: string;
  billing_cycle?: string;
  credit_limit?: number;
  product_type?: string;
  principal_amount: number;
  total_payable: number;
  installment_count?: number;
  installment_value?: number;
  balance_remaining: number;
  start_date?: string;
  due_date?: string;
  status?: string;
};

function calculateDueDate(startDate: string, installmentCount: string) {
  if (!startDate || !installmentCount) return "";

  const count = Number(installmentCount);
  if (Number.isNaN(count) || count <= 0) return "";

  const [year, month, day] = startDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  date.setMonth(date.getMonth() + count);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

export default function CreditAccountsPage() {
  const [accounts, setAccounts] = useState<CreditAccount[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    customer_id: "",
    account_type: "fixed_installment",
    product_type: "",
    principal_amount: "",
    total_payable: "",
    installment_count: "",
    installment_value: "",
    start_date: "",
    billing_cycle: "",
    credit_limit: "",
  });

  const displayedDueDate = calculateDueDate(
    form.start_date,
    form.installment_count
  );

  useEffect(() => {
    loadCreditAccounts();
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const data = await apiFetch("/merchant/customers");
      setCustomers(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function loadCreditAccounts() {
    try {
      const data = await apiFetch("/merchant/credit-accounts");
      setAccounts(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      customer_id: "",
      account_type: "fixed",
      product_type: "",
      principal_amount: "",
      total_payable: "",
      installment_count: "",
      installment_value: "",
      start_date: "",
      billing_cycle: "",
      credit_limit: "",
    });
  }

  function startEdit(account: CreditAccount) {
    setEditingId(account.id);

    setForm({
      customer_id: account.customer_id,
      account_type: account.account_type || "fixed_installment",
      product_type: account.product_type || "",
      principal_amount: String(account.principal_amount || ""),
      total_payable: String(account.total_payable || ""),
      installment_count: String(account.installment_count || ""),
      installment_value: String(account.installment_value || ""),
      start_date: account.start_date?.slice(0, 10) || "",
      billing_cycle: account.billing_cycle || "",
      credit_limit: String(account.credit_limit || ""),
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const isFixed = form.account_type === "fixed_installment";

const payload = {
  customer_id: form.customer_id,
  account_type: form.account_type,
  product_type: form.product_type,

  principal_amount: Number(form.principal_amount || 0),
  total_payable: Number(form.total_payable || form.principal_amount || 0),

  installment_count: isFixed
    ? Number(form.installment_count)
    : null,

  installment_value: isFixed
    ? Number(form.installment_value)
    : null,

  start_date: form.start_date
    ? `${form.start_date}T00:00:00Z`
    : null,

  due_date: isFixed && displayedDueDate
    ? `${displayedDueDate}T00:00:00Z`
    : null,

  billing_cycle: isFixed ? null : form.billing_cycle,

  credit_limit: isFixed
    ? null
    : Number(form.credit_limit || 0),
};

    try {
      if (editingId) {
        await apiFetch(`/merchant/credit-accounts/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch("/merchant/credit-accounts", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      resetForm();
      await loadCreditAccounts();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function markAsSettled(id: string) {
    if (!confirm("Mark this credit account as settled?")) return;

    try {
      await apiFetch(`/merchant/credit-accounts/${id}/settle`, {
        method: "PATCH",
      });

      await loadCreditAccounts();
    } catch (err: any) {
      setError(err.message);
    }
  }

  function getCustomerName(customerId: string) {
  const customer = customers.find((c) => c.id === customerId);

  if (!customer) return customerId;

  return `${customer.full_name_ar}${
    customer.full_name_en ? ` / ${customer.full_name_en}` : ""
  }`;
}

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
         
          <h1 className="text-2xl font-bold">Manage Credit Accounts</h1>
      
           <BackToDashboard />
           
        </div>
      

      {error && (
        <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="mb-8 max-w-xl space-y-4">
        <select
          className="w-full rounded border p-3"
          value={form.customer_id}
          onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
          required
          disabled={!!editingId}
        >
          <option value="">Select customer</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.full_name_ar}
              {customer.full_name_en ? ` / ${customer.full_name_en}` : ""}
              {" - "}
              {customer.mobile_number}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded border p-3"
          value={form.account_type}
          onChange={(e) =>
            setForm({
              ...form,
              account_type: e.target.value,
              installment_count: "",
              installment_value: "",
              billing_cycle: "",
              credit_limit: "",
            })
          }
        >
          <option value="fixed_installment">Fixed instalment account</option>
          <option value="open_ended">Open-ended / utility account</option>
        </select>

        <input
          className="w-full rounded border p-3"
          placeholder="Product type e.g. phone, water bill, electricity"
          value={form.product_type}
          onChange={(e) => setForm({ ...form, product_type: e.target.value })}
        />

        <input
          className="w-full rounded border p-3"
          type="number"
          step="0.01"
          placeholder="Principal amount"
          value={form.principal_amount}
          onChange={(e) =>
            setForm({
              ...form,
              principal_amount: e.target.value,
              total_payable: e.target.value,
            })
          }
          required
        />

        <input
          className="w-full rounded border p-3"
          type="number"
          step="0.01"
          placeholder="Total payable"
          value={form.total_payable}
          onChange={(e) => setForm({ ...form, total_payable: e.target.value })}
          required
        />

        <input
          className="w-full rounded border p-3"
          type="date"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          required
        />

        {form.account_type === "fixed_installment" && (
          <>
            <input
              className="w-full rounded border p-3"
              type="number"
              placeholder="Installment count"
              value={form.installment_count}
              onChange={(e) =>
                setForm({ ...form, installment_count: e.target.value })
              }
              required
            />

            <input
              className="w-full rounded border p-3"
              type="number"
              step="0.01"
              placeholder="Installment value"
              value={form.installment_value}
              onChange={(e) =>
                setForm({ ...form, installment_value: e.target.value })
              }
              required
            />

            <input
              className="w-full rounded border bg-gray-100 p-3"
              type="date"
              value={displayedDueDate}
              readOnly
            />
          </>
        )}

        {form.account_type === "open_ended" && (
          <>
            <input
              className="w-full rounded border p-3"
              type="number"
              step="0.01"
              placeholder="Credit limit / expected monthly bill"
              value={form.credit_limit}
              onChange={(e) =>
                setForm({ ...form, credit_limit: e.target.value })
              }
            />

            <select
              className="w-full rounded border p-3"
              value={form.billing_cycle}
              onChange={(e) =>
                setForm({ ...form, billing_cycle: e.target.value })
              }
            >
              <option value="">Select billing cycle</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="irregular">Irregular</option>
            </select>
          </>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {editingId ? "Update Credit Account" : "Add Credit Account"}
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
            <th className="border p-2 text-left">Customer Name</th>
            <th className="border p-2 text-left">Type</th>
            <th className="border p-2 text-left">Product</th>
            <th className="border p-2 text-left">Principal</th>
            <th className="border p-2 text-left">Total Payable</th>
            <th className="border p-2 text-left">Instalments</th>
            <th className="border p-2 text-left">Cycle</th>
            <th className="border p-2 text-left">Balance</th>
            <th className="border p-2 text-left">Due Date</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
             <td className="border p-2">{getCustomerName(account.customer_id)}</td>
              <td className="border p-2">{account.account_type}</td>
              <td className="border p-2">{account.product_type}</td>
              <td className="border p-2">{account.principal_amount}</td>
              <td className="border p-2">{account.total_payable}</td>
              <td className="border p-2">
                {account.account_type === "fixed_installment"
                  ? `${account.installment_count} × ${account.installment_value}`
                  : "-"}
              </td>
              <td className="border p-2">{account.billing_cycle || "-"}</td>
              <td className="border p-2">{account.balance_remaining}</td>
              <td className="border p-2">
                {account.due_date ? account.due_date.slice(0, 10) : "-"}
              </td>
              <td className="border p-2">{account.status}</td>
              <td className="space-x-2 border p-2">
                <button
                  onClick={() => startEdit(account)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                {account.status !== "SETTLED" &&
                  account.account_type === "fixed_installment" && (
                    <button
                      onClick={() => markAsSettled(account.id)}
                      className="rounded bg-green-600 px-3 py-1 text-white"
                    >
                      Settle
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