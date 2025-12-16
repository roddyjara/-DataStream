import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { AuthService } from '../../../services/auth.service';
import { EmployeeService } from '../../../services/employee.service';
import { Client } from '../../../models/client.model';
import { Employee } from '../../../models/user.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private authService = inject(AuthService);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  clientForm: FormGroup;
  isEdit = false;
  clientId: string | null = null;
  employees = this.employeeService.getEmployees();

  constructor() {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\-\s\(\)]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      serviceDate: ['', Validators.required],
      scheduledTime: ['', Validators.required],
      actualTime: [''],
      assignedEmployeeId: ['', Validators.required],
      observations: ['']
    });
  }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get('id');
    if (this.clientId) {
      this.isEdit = true;
      const client = this.clientService.getClientById(this.clientId);
      if (client) {
        this.clientForm.patchValue({
          ...client,
          serviceDate: client.serviceDate.toISOString().split('T')[0] // Formato YYYY-MM-DD
        });
      }
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const formValue = this.clientForm.value;
      const currentUser = this.authService.currentUser();

      const clientData = {
        ...formValue,
        serviceDate: new Date(formValue.serviceDate),
        status: this.isEdit ? undefined : 'pending' as const,
        createdBy: currentUser?.id || ''
      };

      if (this.isEdit && this.clientId) {
        this.clientService.updateClient(this.clientId, clientData);
      } else {
        this.clientService.addClient(clientData);
      }

      this.router.navigate(['/clientes']);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.clientForm.controls).forEach(key => {
      const control = this.clientForm.get(key);
      control?.markAsTouched();
    });
  }

  cancel() {
    this.router.navigate(['/clientes']);
  }

  getErrorMessage(field: string): string {
    const control = this.clientForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Email inválido';
    }
    if (control?.hasError('minlength')) {
      return 'Mínimo 2 caracteres';
    }
    if (control?.hasError('pattern')) {
      return 'Formato inválido';
    }
    return '';
  }
}