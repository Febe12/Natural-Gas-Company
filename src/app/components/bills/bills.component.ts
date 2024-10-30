import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  form: FormGroup;
  n_users_id: number = 0;
  users: any = {};
  invoice_value: number = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private billService: BillService
  ) {
    this.form = this.formBuilder.group({
      bills_id: ['', Validators.required],
      bill_Data: ['', Validators.required],
      consumption_value: ['', Validators.required],
      thevalueofInstallment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.n_users_id = +this.route.snapshot.paramMap.get('n_users_id')! || 0;
    this.getUserById(this.n_users_id);

    // Subscribe to consumption_value changes to update invoice_value
    this.form.get('consumption_value')!.valueChanges.subscribe(value => {
      this.invoice_value = value * 3;
    });
  }

  getUserById(userId: number): void {
    this.userService.getuserbyid(userId).subscribe(
      (res) => {
        this.users = res;
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  onsign() {
    if (this.form.valid) {
      // Manually add invoice_value to the form data
      const formData = {
        ...this.form.value,
        n_users_id: this.n_users_id,
        invoice_value: this.invoice_value
      };

      this.billService.addbill(formData).subscribe(
        {
          next: (res) => {
            console.log('Bill added successfully', res);
            this.form.reset();
          },
          error: (err) => {
            console.error('Error adding bill', err);
          }
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const billData: Bill = {
        ...this.form.value,
        n_users_id: this.n_users_id // Include n_users_id in the form data
      };

      this.billService.addbill(billData).subscribe(
        {
          next: (res) => {
            console.log('Bill added successfully', res);
            this.form.reset();
          },
          error: (err) => {
            console.error('Error adding bill', err);
          }
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
