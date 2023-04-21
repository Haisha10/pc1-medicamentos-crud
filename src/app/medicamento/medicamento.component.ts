
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from '../models/medicamento.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgForm } from '@angular/forms';
import { HttpDataService } from '../services/http-data.service';
import * as _ from 'lodash'


@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})

export class MedicamentoComponent {

  @ViewChild('medicamentoForm', { static: false })
  medicamentoForm!: NgForm;

  medicamentoData!: Medicamento;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'manufacturingDate', 'description', 'quantity', 'price', 'total', 'actions']

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  isEditMode = false;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private HttpDataService: HttpDataService) {
    this.medicamentoData = {} as Medicamento
  }

  ngOnInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllMedicamentos();
  }

  cancelEdit() {
    this.isEditMode = false;
    this.medicamentoForm.resetForm();
  }

  onSubmit() {
    if (this.medicamentoForm.form.valid) {
      console.log('Valid');
      if (this.isEditMode) {
        console.log('Update');
        this.updateMedicamento();
      }
      else {
        console.log('Create');
        this.addMedicamento();
      }
      this.cancelEdit();
    }
    else {
      console.log('Invalid data');
    }
  }

  getAllMedicamentos() {
    this.HttpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }

  editItem(element: any) {
    this.medicamentoData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  deleteItem(id: string) {
    this.HttpDataService.deleteItem(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addMedicamento() {
    this.medicamentoData.id = 0;
    this.HttpDataService.createItem(this.medicamentoData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response });
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        return o;
      });
    });
  }

  updateMedicamento() {
    this.HttpDataService.updateItem(this.medicamentoData.id, this.medicamentoData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if (o.id == response.id) {
          o = response;
        }
        return o;
      })
    })
  }
}
