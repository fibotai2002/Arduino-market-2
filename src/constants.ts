/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Arduino Uno R3',
    description: 'Eng mashhur mikrokontroller platasi. Robototexnika va avtomatlashtirish uchun ideal.',
    price: 120000,
    category: 'arduino',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=1000&auto=format&fit=crop',
    stock: 25,
    specs: {
      'Mikrokontroller': 'ATmega328P',
      'Kuchlanish': '5V',
      'Kirish kuchlanishi': '7-12V',
      'Raqamli I/O': '14',
      'Analog kiritish': '6'
    },
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'Ultrasonik Sensor HC-SR04',
    description: 'Masofani o\'lchash uchun yuqori aniqlikdagi sensor.',
    price: 25000,
    category: 'sensors',
    image: 'https://images.unsplash.com/photo-1559811814-127ae81144f0?q=80&w=1000&auto=format&fit=crop',
    stock: 100,
    specs: {
      'Masofa': '2cm - 400cm',
      'O\'lchash burchagi': '15 gradus',
      'Tok': '15mA'
    },
    createdAt: Date.now()
  },
  {
    id: '3',
    name: 'LEGO Technic Motor Set',
    description: 'Robotlaringizni harakatga keltirish uchun rasmiy LEGO motorlar to\'plami.',
    price: 450000,
    category: 'lego',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop',
    stock: 10,
    specs: {
      'Brend': 'LEGO',
      'Seriya': 'Technic',
      'Batareya': '6x AA'
    },
    createdAt: Date.now()
  },
  {
    id: '4',
    name: 'Ishlatilgan Raspberry Pi 4 (4GB)',
    description: 'Yaxshi holatda, ozroq ishlatilgan mini kompyuter.',
    price: 650000,
    category: 'used',
    image: 'https://images.unsplash.com/photo-1610484826917-0f101a7bf7f4?q=80&w=1000&auto=format&fit=crop',
    stock: 1,
    isUsed: true,
    specs: {
      'RAM': '4GB LPDDR4',
      'CPU': 'Quad-core Cortex-A72',
      'Holati': '9/10'
    },
    createdAt: Date.now()
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'Barchasi', icon: 'LayoutGrid' },
  { id: 'arduino', name: 'Arduino', icon: 'Cpu' },
  { id: 'sensors', name: 'Sensorlar', icon: 'Activity' },
  { id: 'modules', name: 'Modullar', icon: 'Terminal' },
  { id: 'lego', name: 'LEGO Robot', icon: 'Box' },
  { id: 'used', name: 'Ikkilamchi', icon: 'RefreshCcw' }
];
