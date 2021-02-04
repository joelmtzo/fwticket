import {Injectable} from '@angular/core';
import {of} from 'rxjs';

interface CartItem {
  id?: number;
  title?: string;
  ticketType?: string;
  eventTicketId?: number;
  quantity?: number;
  price?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  items: CartItem[] = [];

  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart'));

    if (!this.items) {
      this.items = [];
    }

    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  get total(): number {
    return this.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  }

  alreadyExist(id: number): CartItem {
    return this.items.find((item) => item.id === id);
  }

  getItem(id: number): CartItem {
    return this.items.find((item) => item.id === id);
  }

  getItems(): any {
    return of(this.items);
  }

  getCount(): number {
    return (this.items)
      ? this.items.reduce((acc, item) => acc + item.quantity, 0)
      : 0;
  }

  add(product): void {
    let item: CartItem = {id: product.id};

    if (this.alreadyExist(item.id)) {
      item = this.getItem(item.id);
      item.quantity++;
      localStorage.setItem('cart', JSON.stringify(this.items));
      return;
    }

    item = {
      id: product.id,
      title: product.title,
      ticketType: product.ticketType,
      eventTicketId: product.id,
      quantity: 1,
      price: product.price
    };

    this.items.push(item);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  updateQty(item: CartItem, qty: number): void {
    this.items.map(idx => {
      if (idx === item) {
        idx.quantity += qty;
      }

      if (idx.quantity === 0) {
        this.delete(idx);
      }
    });
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  empty(): void {
    this.items = [];
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  delete(item: CartItem): void {
    const index = this.items.findIndex(idx => idx === item);
    this.items.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
