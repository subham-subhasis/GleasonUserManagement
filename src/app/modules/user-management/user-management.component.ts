import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddUserComponent } from '../add-user/add-user.component';
export interface UserConfig {
  user: string;
  emailAddress: string;
  customer: string;
  roles: string;
}

const ELEMENT_DATA: UserConfig[] = [
  {user: 'User1', emailAddress: 'Hydrogen@gmail.com', customer: 'Abc', roles: 'H'},
  {user: 'User2', emailAddress: 'Helium@gmail.com', customer: 'Abc', roles: 'He'},
  {user: 'User3', emailAddress: 'Lithium@gmail.com', customer: 'Abc', roles: 'Li'},
  {user: 'User4', emailAddress: 'Beryllium@gmail.com', customer: 'Abc', roles: 'Be'},
  {user: 'User5', emailAddress: 'Boron@gmail.com', customer: 'Abc', roles: 'B'},
  {user: 'User6', emailAddress: 'Carbon@gmail.com', customer: 'Abc', roles: 'C'},
  {user: 'User7', emailAddress: 'Nitrogen@gmail.com', customer: 'Abc', roles: 'N'},
  {user: 'User8', emailAddress: 'Oxygen@gmail.com', customer: 'Abc', roles: 'O'},
  {user: 'User9', emailAddress: 'Fluorine@gmail.com', customer: 'Abc', roles: 'F'}
];

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  formData= { searchValue: '' };
  displayedColumns: string[] = ['user', 'emailAddress', 'customer', 'roles', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  adddUserPopUp() {
    const dataToSend= {};
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: dataToSend,
      width: '70vw',
      height: '70vh',
      backdropClass: 'backdropBackground',
      disableClose: true,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
