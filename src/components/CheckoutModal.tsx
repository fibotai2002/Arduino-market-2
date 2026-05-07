/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useI18n } from '../store/I18nContext';

const CheckoutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { placeOrder, total, cart } = useCart();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderId = await placeOrder(formData);
      
      // Attempt to send to Telegram Bot
      try {
        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
        
        if (!botToken || !chatId) {
          alert("Diqqat: Telegram bot sozlamalari (VITE_TELEGRAM_BOT_TOKEN, VITE_TELEGRAM_CHAT_ID) kiritilmagan. Buyurtma faqat lokal saqlandi.");
        } else {
          const message = `
📦 <b>Yangi Buyurtma: ${orderId}</b>

👤 Mijoz: ${formData.name}
📞 Telefon: ${formData.phone}
📍 Manzil: ${formData.address}

🛒 <b>Mahsulotlar:</b>
${cart.map(item => `- ${item.name} x${item.quantity} (${(item.price * item.quantity).toLocaleString()} so'm)`).join('\n')}

💰 <b>Umumiy summa: ${total.toLocaleString()} so'm</b>
          `;
          
          const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'HTML'
            })
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.description || response.statusText);
          }

          alert("Buyurtma adminga (Telegram botga) muvaffaqiyatli yuborildi!");
        }
      } catch (tgError) {
        console.error("Telegramga yuborishda xatolik:", tgError);
        alert(`Telegramga xabar yuborishda xatolik: ${tgError instanceof Error ? tgError.message : "Noma'lum xatolik"}.\nIltimos bot tokenini va chat ID ni tekshiring.`);
      }
      
      setSuccess(orderId);
    } catch (err) {
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {success ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-2">{t('checkout.success')}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  {t('checkout.orderNumber')}: <span className="font-mono font-bold text-black dark:text-white">{success}</span>. 
                </p>
                <button 
                  onClick={() => { setSuccess(null); onClose(); }}
                  className="w-full bg-black dark:bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors"
                >
                  {t('checkout.backToStore')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold dark:text-white">{t('checkout.title')}</h2>
                  <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full dark:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-black/5 dark:border-white/10 dark:text-white">
                    <span className="text-sm font-medium opacity-50 uppercase tracking-widest font-mono">{t('checkout.amount')}:</span>
                    <span className="font-bold text-xl">{total.toLocaleString()} so'm</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">{t('checkout.name')}</label>
                      <input 
                        required
                        type="text"
                        placeholder="Zokirjonov Abdulvosit"
                        className="w-full p-4 bg-[#F8F9FA] dark:bg-gray-900 rounded-xl border border-black/5 dark:border-white/10 focus:border-blue-500 dark:text-white focus:outline-none transition-colors"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">{t('checkout.phone')}</label>
                      <input 
                        required
                        type="tel"
                        placeholder="+998 90 123 45 67"
                        className="w-full p-4 bg-[#F8F9FA] dark:bg-gray-900 rounded-xl border border-black/5 dark:border-white/10 focus:border-blue-500 dark:text-white focus:outline-none transition-colors"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 ml-1">{t('checkout.address')}</label>
                      <textarea 
                        required
                        placeholder="Toshkent sh., Chilonzor tumani..."
                        rows={3}
                        className="w-full p-4 bg-[#F8F9FA] dark:bg-gray-900 rounded-xl border border-black/5 dark:border-white/10 focus:border-blue-500 dark:text-white focus:outline-none transition-colors resize-none"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-black dark:bg-blue-600 text-white py-4 rounded-xl font-bold mt-8 flex items-center justify-center gap-2 hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {t('checkout.submit')}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
