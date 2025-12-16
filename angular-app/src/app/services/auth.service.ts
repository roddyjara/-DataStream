import { Injectable, signal, computed } from '@angular/core';
import { User, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'current_user';
  
  private users: User[] = [
    { id: '1', email: 'roddyjara@datastream.com', password: 'admin123', role: 'admin' },
    { id: '2', email: 'francovivas@datastream.com', password: 'emp123', role: 'employee', employeeId: 'EMP001' },
    { id: '3', email: 'ramirotraverna@datastream.com', password: 'emp456', role: 'employee', employeeId: 'EMP002' },
  ];

  currentUser = signal<User | null>(null);
  isLoggedIn = computed(() => this.currentUser() !== null);
  isAdmin = computed(() => this.currentUser()?.role === 'admin');

  constructor() {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
    }
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser.set(user);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getRole(): UserRole | null {
    return this.currentUser()?.role ?? null;
  }

  addUser(user: User): void {
    this.users.push(user);
  }
}
