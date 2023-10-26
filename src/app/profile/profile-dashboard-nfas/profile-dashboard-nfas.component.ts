import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-dashboard-nfas',
  templateUrl: './profile-dashboard-nfas.component.html',
  styleUrls: ['./profile-dashboard-nfas.component.scss'],
})
export class ProfileDashboardNfasComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  status = false;
  addToggle() {
    this.status = !this.status;
  }
}
