import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Iuser } from '../../models/iuser';
import { log } from 'node:console';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit {
 n_users_id:number=0;
 users:any ={}
 constructor(public userservice:UsersService,public route:ActivatedRoute){

 }
 
 ngOnInit(): void {
  
  this.n_users_id=this.route.snapshot.paramMap.get('n_users_id')?Number(this.route.snapshot.paramMap.get('n_users_id')):0;
   console.log(this.n_users_id);

   this.getuserbyid()
 
  console.log(this.users);

 }
getuserbyid(){
  this.userservice.getuserbyid(this.n_users_id).subscribe(
    res=>{
      this.users=res

    }
  )
}

}
