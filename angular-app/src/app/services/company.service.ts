import { Injectable, signal } from '@angular/core';
import { Company } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly COOKIE_KEY = 'company_info';
  
  private companyNames = [
    'TechVision', 'InnovateCorp', 'DataStream', 'CloudNine Solutions',
    'Nexus Industries', 'Quantum Labs', 'Stellar Systems', 'Apex Dynamics',
    'Horizon Enterprises', 'Catalyst Group', 'Synergy Tech', 'Pinnacle Corp'
  ];

  private companyTypes = [
    'Tecnología', 'Consultoría', 'Desarrollo de Software', 'Servicios IT',
    'Inteligencia Artificial', 'Ciberseguridad', 'Cloud Computing',
    'E-commerce', 'Fintech', 'HealthTech', 'EdTech', 'Marketing Digital'
  ];

  company = signal<Company | null>(null);

  constructor() {
    this.loadOrCreateCompany();
  }

  private loadOrCreateCompany(): void {
    const stored = this.getCookie(this.COOKIE_KEY);
    if (stored) {
      this.company.set(JSON.parse(stored));
    } else {
      const newCompany = this.generateRandomCompany();
      this.company.set(newCompany);
      this.setCookie(this.COOKIE_KEY, JSON.stringify(newCompany), 365);
    }
  }

  private generateRandomCompany(): Company {
    const name = this.companyNames[Math.floor(Math.random() * this.companyNames.length)];
    const type = this.companyTypes[Math.floor(Math.random() * this.companyTypes.length)];
    
    return {
      name: name,
      type: type,
      address: 'Av. Principal #123, Ciudad Empresarial',
      phone: '+1 (555) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
      email: `contacto@${name.toLowerCase().replace(/\s/g, '')}.com`,
      website: `www.${name.toLowerCase().replace(/\s/g, '')}.com`,
      description: `${name} es una empresa líder en ${type.toLowerCase()}, comprometida con la innovación y excelencia en cada proyecto.`,
      foundedYear: 2010 + Math.floor(Math.random() * 14)
    };
  }

  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop()!.split(';').shift()!);
    }
    return null;
  }
}
