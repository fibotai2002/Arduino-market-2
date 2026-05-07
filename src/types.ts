/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = 'arduino' | 'sensors' | 'lego' | 'electronics' | 'used' | 'modules';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
  specs: Record<string, string>;
  isUsed?: boolean;
  createdAt: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  };
}
