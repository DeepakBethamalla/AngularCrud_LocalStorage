import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeObj : EmployeeObj;
  employeeArr : EmployeeObj[] = []; 

  constructor() { 
    this.employeeObj = new EmployeeObj();
  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  onSave() {
    this.employeeArr.push(this.employeeObj);
    const isData = localStorage.getItem("EmpData");
    if(isData == null){
      const newArr = [];
      newArr.push(this.employeeObj);
      localStorage.setItem("EmpData",JSON.stringify(newArr));
    }else{
      const oldData = JSON.parse(isData);
      oldData.push(this.employeeObj);
      localStorage.setItem("EmpData",JSON.stringify(oldData));
    }
    this.employeeObj = new EmployeeObj();
    this.getAllEmployee();
  }

  getAllEmployee(){
    const isData = localStorage.getItem("EmpData");
    if(isData != null){
      const localData = JSON.parse(isData);
      this.employeeArr = localData;
    }
  }

  onEdit(item : EmployeeObj){
    this.employeeObj = item;
  }

  onDelete(item:EmployeeObj){
    const isData = localStorage.getItem("EmpData");
    if(isData != null){
      const localData = JSON.parse(isData);
      for(let index = 0; index< localData.length;index++){
        if(localData[index].EmpId == item.EmpId){
          localData.splice(0,1);
        }
      }
      localStorage.setItem("EmpData",JSON.stringify(localData));
      this.getAllEmployee();
    }
  }
  
}

export class EmployeeObj{
  EmpId : number;
  EmpName : string;
  EmpAge : Number;
  EmpCompany : string;
  EmpSalary: Number;

  constructor(){
    this.EmpId = 0;
    this.EmpName = "";
    this.EmpAge = 0;
    this.EmpCompany = "";
    this.EmpSalary = 0;
  }

}
