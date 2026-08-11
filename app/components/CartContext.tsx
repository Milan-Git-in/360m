"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { formatPrice } from "../data/passes";

type CartItem = {
  passId: string;
  passTitle: string;
  tierId: string;
  tierName: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (passId: string, tierId: string) => void;
  updateQty: (passId: string, tierId: string, qty: number) => void;
  clear: () => void;
  totalCount: number;
  totalAmount: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "cart-lite:v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {}
  }, [items]);

  const addItem = (item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const found = prev.find(
        (p) => p.passId === item.passId && p.tierId === item.tierId,
      );
      if (found) {
        return prev.map((p) =>
          p.passId === item.passId && p.tierId === item.tierId
            ? { ...p, qty: p.qty + qty }
            : p,
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeItem = (passId: string, tierId: string) => {
    setItems((prev) =>
      prev.filter((p) => !(p.passId === passId && p.tierId === tierId)),
    );
  };

  const updateQty = (passId: string, tierId: string, qty: number) => {
    if (qty <= 0) return removeItem(passId, tierId);
    setItems((prev) =>
      prev.map((p) =>
        p.passId === passId && p.tierId === tierId ? { ...p, qty } : p,
      ),
    );
  };

  const clear = () => setItems([]);

  const totalCount = items.reduce((s, i) => s + i.qty, 0);
  const totalAmount = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear,
        totalCount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function buildWhatsAppMessage(
  items: CartItem[],
  opts?: { event?: string; date?: string | null },
) {
  const lines: string[] = [];
  lines.push("Hello! I would like to purchase passes:");
  if (opts?.event) lines.push(`Event: ${opts.event}`);
  if (opts?.date) lines.push(`Date: ${opts.date}`);
  lines.push("");
  lines.push("Items:");
  items.forEach((it) => {
    const subtotal = it.price * it.qty;
    lines.push(
      `- ${it.tierName} x${it.qty} ${formatPrice(it.price)} each Subtotal: ${formatPrice(subtotal)}`,
    );
  });
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  lines.push("");
  lines.push(`Total: ${formatPrice(total)}`);
  lines.push("");
  lines.push("Please share payment instructions and availability. Thank you!");
  return lines.join("\n");
}
