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
  product_type?: string;
  total_payable: number;
  balance_remaining: number;
  status?: string;
};

type Payment = {
  id: string;
  credit_account_id: string;
  amount_paid: number;
  payment_method?: string;
  payment_date?: string;
  collector_name?: string;
  transaction_ref?: string;
  notes?: string;
};

export default function PaymentsPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [creditAccounts, setCreditAccounts] = useState<CreditAccount[]>([]);
  const [activeCreditAccounts, setActiveCreditAccounts] = useState<
    CreditAccount[]
  >([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    credit_account_id: "",
    amount_paid: "",
    payment_method: "cash",
    payment_date: "",
    collector_name: "",
    notes: "",
  });

  useEffect(() => {
    loadCustomers();
    loadCreditAccounts();
    loadPayments();
  }, []);

  useEffect(() => {
    if (!selectedCustomerId) {
      setActiveCreditAccounts([]);
      setForm((prev) => ({ ...prev, credit_account_id: "" }));
      return;
    }

    const filtered = creditAccounts.filter(
      (account) =>
        account.customer_id === selectedCustomerId &&
        account.status === "ACTIVE" &&
        Number(account.balance_remaining) > 0
    );

    setActiveCreditAccounts(filtered);
    setForm((prev) => ({ ...prev, credit_account_id: "" }));
  }, [selectedCustomerId, creditAccounts]);

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
      setCreditAccounts(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function loadPayments() {
    try {
      const data = await apiFetch("/merchant/payments");
      setPayments(data);
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

  function getCreditAccountDisplay(creditAccountId: string) {
    const account = creditAccounts.find((a) => a.id === creditAccountId);

    if (!account) return creditAccountId;

    const customerName = getCustomerName(account.customer_id);
    const product = account.product_type || "Credit Account";

    return `${customerName} — ${product} — Balance: ${account.balance_remaining}`;
  }

  function resetForm() {
    setEditingId(null);
    setSelectedCustomerId("");
    setActiveCreditAccounts([]);

    setForm({
      credit_account_id: "",
      amount_paid: "",
      payment_method: "cash",
      payment_date: "",
      collector_name: "",
      notes: "",
    });
  }

  function startEdit(payment: Payment) {
    setEditingId(payment.id);

    setForm({
      credit_account_id: payment.credit_account_id,
      amount_paid: String(payment.amount_paid),
      payment_method: payment.payment_method || "cash",
      payment_date: payment.payment_date?.slice(0, 10) || "",
      collector_name: payment.collector_name || "",
      notes: payment.notes || "",
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      amount_paid: Number(form.amount_paid),
      payment_date: form.payment_date
        ? `${form.payment_date}T00:00:00Z`
        : null,
    };

    try {
      if (editingId) {
        await apiFetch(`/merchant/payments/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch("/merchant/payments", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }

      resetForm();
      await loadCreditAccounts();
      await loadPayments();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function deletePayment(id: string) {
    if (!confirm("Delete this payment?")) return;

    try {
      await apiFetch(`/merchant/payments/${id}`, {
        method: "DELETE",
      });

      await loadCreditAccounts();
      await loadPayments();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Manage Payments</h1>        
           <BackToDashboard/>

      </div>

      {error && (
        <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="mb-8 max-w-xl space-y-4">
        {!editingId && (
          <>
            <select
              className="w-full rounded border p-3"
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              required
            >
              <option value="">Select customer</option>

              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.full_name_ar}
                  {customer.full_name_en
                    ? ` / ${customer.full_name_en}`
                    : ""}
                  {" - "}
                  {customer.mobile_number}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded border p-3"
              value={form.credit_account_id}
              onChange={(e) =>
                setForm({ ...form, credit_account_id: e.target.value })
              }
              required
              disabled={!selectedCustomerId}
            >
              <option value="">Select active credit account</option>

              {activeCreditAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.product_type || "Credit Account"}
                  {" - Balance Remaining: "}
                  {account.balance_remaining}
                  {" - Total Payable: "}
                  {account.total_payable}
                </option>
              ))}
            </select>
          </>
        )}

        {editingId && (
          <input
            className="w-full rounded border bg-gray-100 p-3"
            value={getCreditAccountDisplay(form.credit_account_id)}
            readOnly
          />
        )}

        <input
          className="w-full rounded border p-3"
          type="number"
          step="0.01"
          placeholder="Amount paid"
          value={form.amount_paid}
          onChange={(e) => setForm({ ...form, amount_paid: e.target.value })}
          required
        />

        <select
          className="w-full rounded border p-3"
          value={form.payment_method}
          onChange={(e) =>
            setForm({ ...form, payment_method: e.target.value })
          }
        >
          <option value="cash">Cash</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="card">Card</option>
          <option value="other">Other</option>
        </select>

        <input
          className="w-full rounded border p-3"
          type="date"
          value={form.payment_date}
          onChange={(e) => setForm({ ...form, payment_date: e.target.value })}
        />

        <input
          className="w-full rounded border p-3"
          placeholder="Collector name"
          value={form.collector_name}
          onChange={(e) =>
            setForm({ ...form, collector_name: e.target.value })
          }
        />

        <textarea
          className="w-full rounded border p-3"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {editingId ? "Update Payment" : "Add Payment"}
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
            <th className="border p-2 text-left">Customer / Credit Account</th>
            <th className="border p-2 text-left">Amount</th>
            <th className="border p-2 text-left">Method</th>
            <th className="border p-2 text-left">Date</th>
            <th className="border p-2 text-left">Collector</th>
            <th className="border p-2 text-left">Reference</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="border p-2">
                {getCreditAccountDisplay(payment.credit_account_id)}
              </td>
              <td className="border p-2">{payment.amount_paid}</td>
              <td className="border p-2">{payment.payment_method}</td>
              <td className="border p-2">
                {payment.payment_date?.slice(0, 10)}
              </td>
              <td className="border p-2">{payment.collector_name}</td>
              <td className="border p-2">{payment.transaction_ref}</td>
              <td className="space-x-2 border p-2">
                <button
                  onClick={() => startEdit(payment)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deletePayment(payment.id)}
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