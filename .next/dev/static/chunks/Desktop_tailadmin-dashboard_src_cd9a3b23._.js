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
"[project]/Desktop/tailadmin-dashboard/src/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "isSuperAdmin",
    ()=>isSuperAdmin,
    "logout",
    ()=>logout
]);
function getCurrentUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return {
        role: localStorage.getItem("role"),
        merchantId: localStorage.getItem("merchant_id"),
        email: localStorage.getItem("email")
    };
}
function isSuperAdmin() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("role") === "super_admin";
}
function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("merchant_id");
    localStorage.removeItem("email");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/tailadmin-dashboard/src/components/customers/CustomersTable.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/tailadmin-dashboard/src/components/customers/CustomerModal.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CustomersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tailadmin-dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tailadmin-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tailadmin-dashboard/src/lib/api.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/BackToDashboard'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tailadmin-dashboard/src/lib/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$components$2f$customers$2f$CustomersTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tailadmin-dashboard/src/components/customers/CustomersTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$components$2f$customers$2f$CustomerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tailadmin-dashboard/src/components/customers/CustomerModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const emptyForm = {
    full_name_ar: "",
    full_name_en: "",
    mobile_number: "",
    national_id: "",
    city: "",
    address: ""
};
function CustomersPage() {
    _s();
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const pageSize = 15;
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [editingCustomer, setEditingCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [superAdmin, setSuperAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CustomersPage.useEffect": ()=>{
            loadCustomers();
            setSuperAdmin((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSuperAdmin"])());
        }
    }["CustomersPage.useEffect"], []);
    async function loadCustomers() {
        try {
            setLoading(true);
            setError("");
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/merchant/customers");
            setCustomers(data);
        } catch (err) {
            setError(err.message || "Failed to load customers");
        } finally{
            setLoading(false);
        }
    }
    function openAddModal() {
        setEditingCustomer(null);
        setForm(emptyForm);
        setIsModalOpen(true);
    }
    function openEditModal(customer) {
        setEditingCustomer(customer);
        setForm({
            full_name_ar: customer.full_name_ar || "",
            full_name_en: customer.full_name_en || "",
            mobile_number: customer.mobile_number || "",
            national_id: customer.national_id || "",
            city: customer.city || "",
            address: customer.address || ""
        });
        setIsModalOpen(true);
    }
    async function saveCustomer(e) {
        e.preventDefault();
        try {
            setError("");
            if (editingCustomer) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/merchant/customers/${editingCustomer.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(form)
                });
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/merchant/customers", {
                    method: "POST",
                    body: JSON.stringify(form)
                });
            }
            setIsModalOpen(false);
            setEditingCustomer(null);
            setForm(emptyForm);
            await loadCustomers();
        } catch (err) {
            setError(err.message || "Failed to save customer");
        }
    }
    async function deactivateCustomer(id) {
        if (!confirm("Deactivate this customer?")) return;
        try {
            setError("");
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/merchant/customers/${id}`, {
                method: "DELETE"
            });
            await loadCustomers();
        } catch (err) {
            setError(err.message || "Failed to deactivate customer");
        }
    }
    const totalPages = Math.ceil(customers.length / pageSize);
    const paginatedCustomers = customers.slice((page - 1) * pageSize, page * pageSize);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-semibold text-gray-800 dark:text-white/90",
                                children: "Customers"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-gray-500 dark:text-gray-400",
                                children: "View, add, update, and deactivate customer records."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BackToDashboard, {}, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: openAddModal,
                                className: "rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600",
                                children: "Add Customer"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700 dark:border-error-500/30 dark:bg-error-500/10 dark:text-error-400",
                children: error
            }, void 0, false, {
                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                lineNumber: 164,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$components$2f$customers$2f$CustomersTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                customers: paginatedCustomers,
                loading: loading,
                page: page,
                totalPages: totalPages,
                onPageChange: setPage,
                onEdit: openEditModal,
                onDeactivate: deactivateCustomer
            }, void 0, false, {
                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tailadmin$2d$dashboard$2f$src$2f$components$2f$customers$2f$CustomerModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isModalOpen,
                superAdmin: superAdmin,
                editingCustomer: editingCustomer,
                form: form,
                setForm: setForm,
                onClose: ()=>setIsModalOpen(false),
                onSubmit: saveCustomer
            }, void 0, false, {
                fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/tailadmin-dashboard/src/app/customers/page.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
_s(CustomersPage, "jQVLWVW2vmkUod5Cn6gymfM2ul0=");
_c = CustomersPage;
var _c;
__turbopack_context__.k.register(_c, "CustomersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_tailadmin-dashboard_src_cd9a3b23._.js.map