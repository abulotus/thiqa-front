(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/tailadmin-dashboard/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiFetch",
    ()=>apiFetch
]);
const API_URL = "https://api.thiqascore.com";
async function apiFetch(endpoint, options = {}) {
    const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("access_token") : "TURBOPACK unreachable";
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {},
            ...options.headers || {}
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "API request failed");
    }
    return response.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreditAccountsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tailadmin-dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tailadmin-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tailadmin-dashboard/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function calculateDueDate(startDate, installmentCount) {
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
function CreditAccountsPage() {
    _s();
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        customer_id: "",
        account_type: "fixed_installment",
        product_type: "",
        principal_amount: "",
        total_payable: "",
        installment_count: "",
        installment_value: "",
        start_date: "",
        billing_cycle: "",
        credit_limit: ""
    });
    const displayedDueDate = calculateDueDate(form.start_date, form.installment_count);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CreditAccountsPage.useEffect": ()=>{
            loadCreditAccounts();
            loadCustomers();
        }
    }["CreditAccountsPage.useEffect"], []);
    async function loadCustomers() {
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/merchant/customers");
            setCustomers(data);
        } catch (err) {
            setError(err.message);
        }
    }
    async function loadCreditAccounts() {
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/merchant/credit-accounts");
            setAccounts(data);
        } catch (err) {
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
            credit_limit: ""
        });
    }
    function startEdit(account) {
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
            credit_limit: String(account.credit_limit || "")
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        const isFixed = form.account_type === "fixed_installment";
        const payload = {
            customer_id: form.customer_id,
            account_type: form.account_type,
            product_type: form.product_type,
            principal_amount: Number(form.principal_amount || 0),
            total_payable: Number(form.total_payable || form.principal_amount || 0),
            installment_count: isFixed ? Number(form.installment_count) : null,
            installment_value: isFixed ? Number(form.installment_value) : null,
            start_date: form.start_date ? `${form.start_date}T00:00:00Z` : null,
            due_date: isFixed && displayedDueDate ? `${displayedDueDate}T00:00:00Z` : null,
            billing_cycle: isFixed ? null : form.billing_cycle,
            credit_limit: isFixed ? null : Number(form.credit_limit || 0)
        };
        try {
            if (editingId) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/merchant/credit-accounts/${editingId}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload)
                });
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/merchant/credit-accounts", {
                    method: "POST",
                    body: JSON.stringify(payload)
                });
            }
            resetForm();
            await loadCreditAccounts();
        } catch (err) {
            setError(err.message);
        }
    }
    async function markAsSettled(id) {
        if (!confirm("Mark this credit account as settled?")) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/merchant/credit-accounts/${id}/settle`, {
                method: "PATCH"
            });
            await loadCreditAccounts();
        } catch (err) {
            setError(err.message);
        }
    }
    function getCustomerName(customerId) {
        const customer = customers.find((c)=>c.id === customerId);
        if (!customer) return customerId;
        return `${customer.full_name_ar}${customer.full_name_en ? ` / ${customer.full_name_en}` : ""}`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold",
                    children: "Manage Credit Accounts"
                }, void 0, false, {
                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                    lineNumber: 215,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 rounded bg-red-100 p-3 text-red-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "mb-8 max-w-xl space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "w-full rounded border p-3",
                        value: form.customer_id,
                        onChange: (e)=>setForm({
                                ...form,
                                customer_id: e.target.value
                            }),
                        required: true,
                        disabled: !!editingId,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select customer"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            customers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: customer.id,
                                    children: [
                                        customer.full_name_ar,
                                        customer.full_name_en ? ` / ${customer.full_name_en}` : "",
                                        " - ",
                                        customer.mobile_number
                                    ]
                                }, customer.id, true, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "w-full rounded border p-3",
                        value: form.account_type,
                        onChange: (e)=>setForm({
                                ...form,
                                account_type: e.target.value,
                                installment_count: "",
                                installment_value: "",
                                billing_cycle: "",
                                credit_limit: ""
                            }),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "fixed_installment",
                                children: "Fixed instalment account"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "open_ended",
                                children: "Open-ended / utility account"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "w-full rounded border p-3",
                        placeholder: "Product type e.g. phone, water bill, electricity",
                        value: form.product_type,
                        onChange: (e)=>setForm({
                                ...form,
                                product_type: e.target.value
                            })
                    }, void 0, false, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "w-full rounded border p-3",
                        type: "number",
                        step: "0.01",
                        placeholder: "Principal amount",
                        value: form.principal_amount,
                        onChange: (e)=>setForm({
                                ...form,
                                principal_amount: e.target.value,
                                total_payable: e.target.value
                            }),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "w-full rounded border p-3",
                        type: "number",
                        step: "0.01",
                        placeholder: "Total payable",
                        value: form.total_payable,
                        onChange: (e)=>setForm({
                                ...form,
                                total_payable: e.target.value
                            }),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "w-full rounded border p-3",
                        type: "date",
                        value: form.start_date,
                        onChange: (e)=>setForm({
                                ...form,
                                start_date: e.target.value
                            }),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this),
                    form.account_type === "fixed_installment" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "w-full rounded border p-3",
                                type: "number",
                                placeholder: "Installment count",
                                value: form.installment_count,
                                onChange: (e)=>setForm({
                                        ...form,
                                        installment_count: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "w-full rounded border p-3",
                                type: "number",
                                step: "0.01",
                                placeholder: "Installment value",
                                value: form.installment_value,
                                onChange: (e)=>setForm({
                                        ...form,
                                        installment_value: e.target.value
                                    }),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 318,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "w-full rounded border bg-gray-100 p-3",
                                type: "date",
                                value: displayedDueDate,
                                readOnly: true
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 330,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    form.account_type === "open_ended" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "w-full rounded border p-3",
                                type: "number",
                                step: "0.01",
                                placeholder: "Credit limit / expected monthly bill",
                                value: form.credit_limit,
                                onChange: (e)=>setForm({
                                        ...form,
                                        credit_limit: e.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 341,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "w-full rounded border p-3",
                                value: form.billing_cycle,
                                onChange: (e)=>setForm({
                                        ...form,
                                        billing_cycle: e.target.value
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select billing cycle"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 359,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "monthly",
                                        children: "Monthly"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 360,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "weekly",
                                        children: "Weekly"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "irregular",
                                        children: "Irregular"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 362,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "rounded bg-blue-600 px-4 py-2 text-white",
                                children: editingId ? "Update Credit Account" : "Add Credit Account"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this),
                            editingId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: resetForm,
                                className: "rounded bg-gray-500 px-4 py-2 text-white",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 376,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Customer Name"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Type"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 391,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Product"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 392,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Principal"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 393,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Total Payable"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Instalments"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 395,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Cycle"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 396,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Balance"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Due Date"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 398,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 399,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "border p-2 text-left",
                                    children: "Actions"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                    lineNumber: 400,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: accounts.map((account)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: getCustomerName(account.customer_id)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: account.account_type
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: account.product_type
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 409,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: account.principal_amount
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 410,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: account.total_payable
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 411,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: account.account_type === "fixed_installment" ? `${account.installment_count} × ${account.installment_value}` : "-"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 412,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: account.billing_cycle || "-"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 417,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: account.balance_remaining
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 418,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: account.due_date ? account.due_date.slice(0, 10) : "-"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 419,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "border p-2",
                                        children: account.status
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 422,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "space-x-2 border p-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>startEdit(account),
                                                className: "rounded bg-yellow-500 px-3 py-1 text-white",
                                                children: "Edit"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                                lineNumber: 424,
                                                columnNumber: 17
                                            }, this),
                                            account.status !== "SETTLED" && account.account_type === "fixed_installment" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>markAsSettled(account.id),
                                                className: "rounded bg-green-600 px-3 py-1 text-white",
                                                children: "Settle"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                        lineNumber: 423,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, account.id, true, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                                lineNumber: 406,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                        lineNumber: 404,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/(admin)/(others-pages)/credit-accounts/page.tsx",
        lineNumber: 212,
        columnNumber: 5
    }, this);
}
_s(CreditAccountsPage, "B/Ot88KJhyEgxJbVIrFFT0IRG0w=");
_c = CreditAccountsPage;
var _c;
__turbopack_context__.k.register(_c, "CreditAccountsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_tailadmin-dashboard_src_97c95655._.js.map