/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'uz' | 'ru' | 'en';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Common
  'app.name': { uz: 'ROBOSTORE', ru: 'РОБОМАРКЕТ', en: 'ROBOSTORE' },
  'app.country': { uz: 'Uzbekistan', ru: 'Узбекистан', en: 'Uzbekistan' },
  
  // Navigation
  'nav.all': { uz: 'Barchasi', ru: 'Все', en: 'All' },
  'nav.arduino': { uz: 'Arduino', ru: 'Arduino', en: 'Arduino' },
  'nav.sensors': { uz: 'Sensorlar', ru: 'Сенсоры', en: 'Sensors' },
  'nav.modules': { uz: 'Modullar', ru: 'Модули', en: 'Modules' },
  'nav.lego': { uz: 'LEGO Robot', ru: 'LEGO Робот', en: 'LEGO Robot' },
  'nav.used': { uz: 'Ikkilamchi', ru: 'Б/У', en: 'Used' },
  'nav.catalog': { uz: 'Katalog', ru: 'Каталог', en: 'Catalog' },
  'nav.about': { uz: 'Biz haqimizda', ru: 'О нас', en: 'About us' },
  
  // Cart
  'cart.title': { uz: 'Savat', ru: 'Корзина', en: 'Cart' },
  'cart.empty': { uz: "Savatingiz hozircha bo'sh", ru: 'Ваша корзина пуста', en: 'Your cart is empty' },
  'cart.total': { uz: 'Umumiy', ru: 'Итого', en: 'Total' },
  'cart.checkout': { uz: 'Buyurtma berish', ru: 'Оформить заказ', en: 'Checkout' },
  
  // Checkout
  'checkout.title': { uz: 'Rasmiylashtirish', ru: 'Оформление заказа', en: 'Checkout' },
  'checkout.amount': { uz: "To'lanadigan summa", ru: 'Сумма к оплате', en: 'Total to pay' },
  'checkout.name': { uz: 'F.I.O', ru: 'Ф.И.О', en: 'Full Name' },
  'checkout.phone': { uz: 'Telefon', ru: 'Телефон', en: 'Phone' },
  'checkout.address': { uz: 'Manzil', ru: 'Адрес', en: 'Address' },
  'checkout.submit': { uz: 'Buyurtmani yuborish', ru: 'Отправить заказ', en: 'Submit Order' },
  'checkout.success': { uz: 'Buyurtmangiz qabul qilindi!', ru: 'Ваш заказ принят!', en: 'Order received!' },
  'checkout.orderNumber': { uz: 'Buyurtma raqami', ru: 'Номер заказа', en: 'Order Number' },
  'checkout.backToStore': { uz: 'Dukonga qaytish', ru: 'Вернуться в магазин', en: 'Back to store' },
  
  // Hero
  'hero.subtitle': { uz: 'Kelajakni biz bilan quring', ru: 'Строй будущее с нами', en: 'Build the future with us' },
  'hero.title1': { uz: 'Elektronika va', ru: 'Электроника и', en: 'Electronics &' },
  'hero.title2': { uz: 'Robototexnika', ru: 'Робототехника', en: 'Robotics' },
  'hero.desc': { uz: "Arduino, datchiklar, modullar va LEGO Technic to'plamlarining eng katta tanlovi.", ru: 'Самый большой выбор Arduino, датчиков, модулей и наборов LEGO Technic.', en: 'The largest selection of Arduino, sensors, modules, and LEGO Technic sets.' },
  
  // Features
  'feat.delivery': { uz: 'Tezkor yetkazib berish', ru: 'Быстрая доставка', en: 'Fast Delivery' },
  'feat.delivery.desc': { uz: "O'zbekiston bo'ylab 24 soat ichida.", ru: 'По Узбекистану в течение 24 часов.', en: 'Within 24 hours across Uzbekistan.' },
  'feat.quality': { uz: 'Sifat kafolati', ru: 'Гарантия качества', en: 'Quality Guarantee' },
  'feat.quality.desc': { uz: "Barcha mahsulotlar sinovdan o'tgan.", ru: 'Все товары прошли проверку.', en: 'All products are tested.' },
  'feat.return': { uz: 'Qulay qaytarish', ru: 'Удобный возврат', en: 'Easy Returns' },
  'feat.return.desc': { uz: '14 kun ichida almashtirish imkoniyati.', ru: 'Возможность обмена в течение 14 дней.', en: 'Exchange possible within 14 days.' },
  
  // Catalog
  'store.catalog': { uz: 'Mahsulotlar Katalogi', ru: 'Каталог товаров', en: 'Product Catalog' },
  'store.catalog.desc': { uz: 'Loyihangiz uchun eng mos qismlarni tanlang.', ru: 'Выберите лучшие запчасти для вашего проекта.', en: 'Choose the best parts for your project.' },
  'store.used': { uz: 'Ikkilamchi', ru: 'Б/У', en: 'Used' },
  'store.specs': { uz: 'Xususiyatlar', ru: 'Характеристики', en: 'Specifications' },
  'store.desc': { uz: 'Tavsif', ru: 'Описание', en: 'Description' },
  'store.addToCart': { uz: "Savatchaga qo'shish", ru: 'В корзину', en: 'Add to Cart' }
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved && ['uz', 'ru', 'en'].includes(saved) ? saved : 'uz';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
