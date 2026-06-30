import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./Cartcontext";

const formatNaira = (amount) => `₦${amount.toLocaleString()}`;

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, increment, decrement, removeItem, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50
                       flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {items.length === 0 && (
                <p className="text-gray-400 text-sm text-center mt-10">
                  Your cart is empty.
                </p>
              )}

              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{formatNaira(item.price)}</p>

                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-6 h-6 rounded-full bg-gray-100 text-sm cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="w-6 h-6 rounded-full bg-gray-100 text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-gray-100">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-base font-bold text-slate-900">
                    {formatNaira(total)}
                  </span>
                </div>
                <button className="w-full bg-slate-900 text-white rounded-full py-3 text-sm font-semibold
                                   hover:bg-indigo-600 transition-colors duration-200 cursor-pointer">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;