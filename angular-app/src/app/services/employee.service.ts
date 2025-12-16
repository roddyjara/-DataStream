import { Injectable, signal } from '@angular/core';
import { Employee, EmployeeHistory } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly STORAGE_KEY = 'employees';

  employees = signal<Employee[]>([]);

  constructor() {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.employees.set(JSON.parse(stored));
    } else {
      this.employees.set(this.getInitialEmployees());
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.employees()));
  }

  private getInitialEmployees(): Employee[] {
    return [
      {
        id: 'EMP001',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'empleado@empresa.com',
        phone: '+1 555-0101',
        position: 'Desarrollador Senior',
        department: 'Tecnología',
        hireDate: new Date('2022-03-15'),
        salary: 55000,
        status: 'active',
        history: [
          { id: '1', date: new Date('2022-03-15'), action: 'Contratación', description: 'Ingreso a la empresa como Desarrollador Junior' },
          { id: '2', date: new Date('2023-06-01'), action: 'Promoción', description: 'Ascendido a Desarrollador Senior' },
          { id: '3', date: new Date('2024-01-15'), action: 'Capacitación', description: 'Completó curso de Angular Avanzado' },
        ]
      },
      {
        id: 'EMP002',
        firstName: 'María',
        lastName: 'García',
        email: 'maria@empresa.com',
        phone: '+1 555-0102',
        position: 'Analista de Datos',
        department: 'Análisis',
        hireDate: new Date('2021-08-20'),
        salary: 48000,
        status: 'active',
        history: [
          { id: '1', date: new Date('2021-08-20'), action: 'Contratación', description: 'Ingreso como Analista Junior' },
          { id: '2', date: new Date('2022-12-10'), action: 'Promoción', description: 'Ascendida a Analista de Datos' },
        ]
      },
      {
        id: 'EMP003',
        firstName: 'Carlos',
        lastName: 'López',
        email: 'carlos@empresa.com',
        phone: '+1 555-0103',
        position: 'Gerente de Proyectos',
        department: 'Gestión',
        hireDate: new Date('2020-01-10'),
        salary: 72000,
        status: 'active',
        history: [
          { id: '1', date: new Date('2020-01-10'), action: 'Contratación', description: 'Ingreso como Coordinador de Proyectos' },
          { id: '2', date: new Date('2021-07-01'), action: 'Promoción', description: 'Ascendido a Gerente de Proyectos' },
        ]
      }
    ];
  }

  getAll(): Employee[] {
    return this.employees();
  }

  getById(id: string): Employee | undefined {
    return this.employees().find(e => e.id === id);
  }

  getByEmail(email: string): Employee | undefined {
    return this.employees().find(e => e.email === email);
  }

  create(employee: Omit<Employee, 'id' | 'history'>): void {
    const newEmployee: Employee = {
      ...employee,
      id: 'EMP' + String(this.employees().length + 1).padStart(3, '0'),
      history: [
        { id: '1', date: new Date(), action: 'Contratación', description: `Ingreso a la empresa como ${employee.position}` }
      ]
    };
    this.employees.update(emps => [...emps, newEmployee]);
    this.saveToStorage();
  }

  update(id: string, data: Partial<Employee>): void {
    this.employees.update(emps => 
      emps.map(e => e.id === id ? { ...e, ...data } : e)
    );
    this.saveToStorage();
  }

  delete(id: string): void {
    this.employees.update(emps => emps.filter(e => e.id !== id));
    this.saveToStorage();
  }

  addHistoryEntry(employeeId: string, entry: Omit<EmployeeHistory, 'id'>): void {
    this.employees.update(emps => 
      emps.map(e => {
        if (e.id === employeeId) {
          return {
            ...e,
            history: [...e.history, { ...entry, id: String(e.history.length + 1) }]
          };
        }
        return e;
      })
    );
    this.saveToStorage();
  }
}
