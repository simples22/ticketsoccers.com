"use client";
import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import type { CartItem } from "@/lib/tevo/checkout";

interface State { eventId: number | null; eventName: string; items: CartItem[] }
type Action =
  | { type: "SET_EVENT"; eventId: number; eventName: string }
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; ticketGroupId: number }
  | { type: "CLEAR" };

const initial: State = { eventId: null, eventName: "", items: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_EVENT": return { ...state, eventId: action.eventId, eventName: action.eventName };
    case "ADD": {
      const items = state.items.filter((i) => i.ticketGroupId !== action.item.ticketGroupId);
      return { ...state, items: [...items, action.item] };
    }
    case "REMOVE": return { ...state, items: state.items.filter((i) => i.ticketGroupId !== action.ticketGroupId) };
    case "CLEAR": return initial;
    default: return state;
  }
}

const Ctx = createContext<{
  state: State;
  setEvent: (id: number, name: string) => void;
  add: (item: CartItem) => void;
  remove: (id: number) => void;
  clear: () => void;
  subtotal: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial, (i) => {
    if (typeof window === "undefined") return i;
    try { return JSON.parse(localStorage.getItem("ts_cart_state") ?? "") || i; } catch { return i; }
  });

  useEffect(() => {
    localStorage.setItem("ts_cart_state", JSON.stringify(state));
    document.cookie = `ts_cart=${state.items.length ? "1" : ""}; path=/; max-age=3600`;
  }, [state]);

  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Ctx.Provider value={{
      state,
      setEvent: (eventId, eventName) => dispatch({ type: "SET_EVENT", eventId, eventName }),
      add: (item) => dispatch({ type: "ADD", item }),
      remove: (ticketGroupId) => dispatch({ type: "REMOVE", ticketGroupId }),
      clear: () => dispatch({ type: "CLEAR" }),
      subtotal,
    }}>
      {children}
    </Ctx.Provider>
  );
}
export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}