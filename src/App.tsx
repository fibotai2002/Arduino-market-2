/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Truck, 
  RotateCw,
  ShoppingBag,
  ChevronRight,
  LayoutGrid,
  Activity,
  Box,
  Terminal,
  RefreshCcw,
  Plus,
  X
} from 'lucide-react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { CartProvider, useCart } from './store/CartContext';
import { ThemeProvider } from './store/ThemeContext';
import { I18nProvider, useI18n } from './store/I18nContext';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import { Category, Product } from './types';

const ProductCard = ({ product, onQuickView }: { product: Product; onQuickView: (p: Product) => void }) => {
  const { addToCart } = useCart();
  const { t } = useI18n();

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pixel-card group overflow-hidden flex flex-col h-full"
    >
      <div className="relative aspect-square bg-[#F8F9FA] dark:bg-gray-800 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.isUsed && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider rounded-sm shadow-sm">
            {t('store.used')}
          </div>
        )}
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white text-black rounded-full shadow-lg flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1 dark:text-white">
        <div className="flex justify-between items-start gap-2">
          <span className="tech-header">{product.category}</span>
          <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">{product.price.toLocaleString()} so'm</span>
        </div>
        <h3 className="mt-2 font-bold text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">
          {product.description}
        </p>
        <button 
          onClick={() => onQuickView(product)}
          className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#141414]/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
        >
          {t('store.specs')} <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};

const ProductModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const { addToCart } = useCart();
  const { t } = useI18n();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full transition-colors dark:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="w-full md:w-1/2 aspect-square bg-gray-100 dark:bg-gray-800">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col dark:text-white">
          <span className="tech-header mb-2">{product.category}</span>
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <div className="text-2xl font-mono mb-6 text-blue-600 dark:text-blue-400">{product.price.toLocaleString()} so'm</div>
          
          <div className="space-y-6 flex-1">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-mono opacity-40 mb-2">{t('store.desc')}</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest font-mono opacity-40 mb-2">{t('store.specs')}</h4>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-gray-100 dark:border-gray-800 py-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{key}</span>
                    <span className="font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t dark:border-gray-800 flex gap-4">
            <button 
              onClick={() => { addToCart(product); onClose(); }}
              className="flex-1 bg-black dark:bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              {t('store.addToCart')}
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StoreContent = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { t } = useI18n();

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }} 
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
      
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto dark:text-white"
          >
            <div className="tech-header mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {t('hero.subtitle')}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
              {t('hero.title1')} <br/> <span className="text-blue-600 dark:text-blue-400">{t('hero.title2')}</span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl">
              {t('hero.desc')}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-black dark:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                {t('nav.catalog')} <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                {t('nav.about')}
              </button>
            </div>
          </motion.div>
        </header>

        {/* Features Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 dark:text-white">
          <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-black/5 dark:border-white/10 hover:border-blue-500/20 transition-colors">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Truck className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">{t('feat.delivery')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('feat.delivery.desc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-black/5 dark:border-white/10 hover:border-blue-500/20 transition-colors">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="text-green-600 dark:text-green-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">{t('feat.quality')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('feat.quality.desc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-black/5 dark:border-white/10 hover:border-blue-500/20 transition-colors">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <RotateCw className="text-purple-600 dark:text-purple-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">{t('feat.return')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('feat.return.desc')}</p>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalog" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 dark:text-white">
            <div>
              <h2 className="text-3xl font-bold">{t('store.catalog')}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{t('store.catalog.desc')}</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto invisible-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as Category | 'all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeCategory === cat.id 
                      ? 'bg-black text-white dark:bg-blue-600 shadow-lg' 
                      : 'bg-white text-black dark:bg-gray-800 dark:text-white border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white'
                  }`}
                >
                  {cat.id === 'used' && <RefreshCcw className="w-4 h-4" />}
                  {cat.id === 'arduino' && <Cpu className="w-4 h-4" />}
                  {cat.id === 'sensors' && <Activity className="w-4 h-4" />}
                  {cat.id === 'lego' && <Box className="w-4 h-4" />}
                  {cat.id === 'modules' && <Terminal className="w-4 h-4" />}
                  {cat.id === 'all' && <LayoutGrid className="w-4 h-4" />}
                  {t(`nav.${cat.id}`)}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={setSelectedProduct} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <footer className="bg-[#141414] dark:bg-black text-white py-20 mt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
                <Cpu className="text-black w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight block leading-none">{t('app.name')}</span>
                <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">{t('app.country')}</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Biz robototexnika va elektronika ixlosmandlari uchun yuqori sifatli qismlar va ta'lim to'plamlarini taqdim etamiz. Talabalar, muhandislar va havaskorlar uchun eng yaxshi hamkor.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest opacity-50">Bo'limlar</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Arduino</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sensorlar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Modullar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LEGO Technic</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-amber-500">Ikkilamchi Bozor</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest opacity-50">Kontakt</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>Toshkent sh., Chilonzor tumani</li>
              <li>+998 90 123 45 67</li>
              <li>support@robostore.uz</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-center text-xs text-gray-500 font-mono">
          © {new Date().getFullYear()} {t('app.name')} {t('app.country')}. BARCHA HUQUQLAR HIMOYA QILINGAN.
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <CartProvider>
          <StoreContent />
        </CartProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
