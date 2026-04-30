"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Download,
  RefreshCw,
  Search,
  Package,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";

const STATUS_COLORS: Record<OrderStatus, string> = {
  "Waiting Confirmation": "bg-amber-100 text-amber-700 border-amber-200",
  "Payment Confirmed": "bg-blue-100 text-blue-700 border-blue-200",
  "Completed": "bg-green-100 text-green-700 border-green-200",
  "Cancelled": "bg-red-100 text-red-600 border-red-200",
};

const ALL_STATUSES: OrderStatus[] = [
  "Waiting Confirmation",
  "Payment Confirmed",
  "Completed",
  "Cancelled",
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "">("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const json = await res.json();
    setOrders(json.orders ?? []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (id: string, status: OrderStatus) => {
    setUpdatingId(id);
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setUpdatingId(null);
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const exportCSV = () => {
    window.open("/api/admin/export", "_blank");
  };

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.name.toLowerCase().includes(q) ||
      o.whatsapp.includes(q) ||
      o.product.toLowerCase().includes(q);
    const matchStatus = !filterStatus || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: orders.length,
    waiting: orders.filter((o) => o.status === "Waiting Confirmation").length,
    confirmed: orders.filter((o) => o.status === "Payment Confirmed").length,
    completed: orders.filter((o) => o.status === "Completed").length,
  };

  const productCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.product] = (acc[o.product] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-rose-50/30">
      {/* Header */}
      <header className="bg-white border-b border-rose-100 sticky top-0 z-40 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="font-playfair italic text-lg font-semibold text-charcoal">
              june <span className="text-rose-500">de belle</span>
            </p>
            <span className="hidden sm:block text-gray-300">|</span>
            <span className="hidden sm:block font-sans text-sm text-gray-500">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              className="p-2 rounded-lg hover:bg-rose-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} className="text-gray-500" />
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 btn-outline py-2 px-4 text-xs"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 font-sans text-sm text-gray-500 hover:text-rose-600 transition-colors px-3 py-2 rounded-lg hover:bg-rose-50"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: stats.total, icon: Users, color: "rose" },
            { label: "Waiting", value: stats.waiting, icon: Clock, color: "amber" },
            { label: "Confirmed", value: stats.confirmed, icon: CheckCircle, color: "blue" },
            { label: "Completed", value: stats.completed, icon: Package, color: "green" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm">
              <div className={`w-9 h-9 rounded-xl bg-${color}-50 flex items-center justify-center mb-3`}>
                <Icon size={18} className={`text-${color}-500`} strokeWidth={1.5} />
              </div>
              <p className="font-playfair text-3xl font-bold text-charcoal">{value}</p>
              <p className="font-sans text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Product breakdown */}
        {Object.keys(productCounts).length > 0 && (
          <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm mb-6">
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-4">Orders by Product</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(productCounts).map(([product, count]) => (
                <div
                  key={product}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full border border-rose-100"
                >
                  <span className="font-sans text-sm font-medium text-rose-700">{product}</span>
                  <span className="font-sans text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, WhatsApp, product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "")}
            className="form-input sm:w-56"
          >
            <option value="">All Statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={24} className="text-rose-400 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package size={32} className="text-rose-200 mx-auto mb-3" />
              <p className="font-sans text-sm text-gray-400">
                {search || filterStatus ? "No orders match your filter." : "No orders yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-rose-100 bg-rose-50/50">
                    {["#", "Name", "WhatsApp", "Product", "Colour", "Date", "Status", "Action"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-3 font-sans text-xs uppercase tracking-wider text-gray-400 font-medium whitespace-nowrap"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                  {filtered.map((order, idx) => (
                    <tr key={order.id} className="hover:bg-rose-50/30 transition-colors">
                      <td className="px-4 py-3 font-sans text-xs text-gray-400">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-sans text-sm font-medium text-charcoal whitespace-nowrap">
                          {order.name}
                        </p>
                        {order.email && (
                          <p className="font-sans text-xs text-gray-400 mt-0.5">{order.email}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`https://wa.me/${order.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-sm text-rose-600 hover:underline whitespace-nowrap"
                        >
                          {order.whatsapp}
                        </a>
                      </td>
                      <td className="px-4 py-3 font-sans text-sm text-charcoal whitespace-nowrap">
                        {order.product}
                      </td>
                      <td className="px-4 py-3 font-sans text-sm text-gray-500 whitespace-nowrap">
                        {order.variant}
                      </td>
                      <td className="px-4 py-3 font-sans text-xs text-gray-400 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        <br />
                        {new Date(order.created_at).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Asia/Jakarta",
                        })} WIB
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`badge border font-medium ${STATUS_COLORS[order.status]} whitespace-nowrap`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                          className="font-sans text-xs border border-rose-200 rounded-lg px-2 py-1.5 bg-white text-charcoal focus:outline-none focus:ring-1 focus:ring-rose-300 disabled:opacity-50"
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="font-sans text-xs text-gray-400 text-center mt-4">
          Showing {filtered.length} of {orders.length} orders
        </p>
      </div>
    </div>
  );
}
