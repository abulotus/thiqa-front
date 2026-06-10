export function getCurrentUser() {
  if (typeof window === "undefined") return null;

  return {
    role: localStorage.getItem("role"),
    merchantId: localStorage.getItem("merchant_id"),
    email: localStorage.getItem("email"),
  };
}

export function isSuperAdmin() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("role") === "super_admin";
}
export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("merchant_id");
  localStorage.removeItem("email");
}

