import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-company-info',
  standalone: true,
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss'
})
export class CompanyInfoComponent {
  constructor(public companyService: CompanyService) {}
}

