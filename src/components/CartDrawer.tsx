/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useI18n } from '../store/I18nContext';

const CartDrawer = ({ isOpen, onClose, onCheckout }: { isOpen: boolean; onClose: () => void; onCheckout: () => void }) => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const { t } = useI18n();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b dark:border-white/10 flex items-center justify-between dark:text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-bold text-xl">{t('cart.title')}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                id="close-cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4 dark:text-white">
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <p>{t('cart.empty')}</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 dark:text-white">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">{item.price.toLocaleString()} so'm</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-md border dark:border-white/10 p-1 scale-90 -ml-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t dark:border-white/10 space-y-4">
                <div className="flex justify-between items-end dark:text-white">
                  <span className="text-sm opacity-50 uppercase tracking-widest font-mono">{t('cart.total')}</span>
                  <span className="text-2xl font-bold">{total.toLocaleString()} so'm</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-black dark:bg-blue-600 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                  id="checkout-btn"
                >
                  {t('cart.checkout')}
                  <ArrowRight className="w-4 h-4" />
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
