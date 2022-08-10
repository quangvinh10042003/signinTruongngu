import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isBool = true;
  formInfo = new FormGroup({
    fullName:new FormControl('',
    [Validators.required]),
    phone:new FormControl('',[
      Validators.required,
      Validators.pattern("[0-9]{10}")
    ]),
    email:new FormControl('',[
      Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),
      // Validators.email
    ]),
    password:new FormControl('',[
      Validators.required
    ]),
  })

  constructor(private http:HttpClient,private accService:AccountService,private route:Router) { }

  ngOnInit(): void {
  }
  get form():any{
    return this.formInfo.controls;
  }
  dnoneEye(){
    let eye = document.getElementById('eye') as HTMLDivElement | null;
    let password = document.getElementById('password') as HTMLInputElement | null;
    if(password?.value == ''){
      eye?.classList.add('d-none');
    }else{
      eye?.classList.remove('d-none');
    }
  }
  signUp():void{
    this.http.post<any>(" http://localhost:3000/signupForm",this.formInfo.value).subscribe((data)=>{
      this.formInfo.reset();
      this.route.navigate(['login']);
    })
  }
  showpass():void{
    let eye = document.getElementById('eye') as HTMLDivElement | null;
    if(this.isBool){
      document.getElementById('password')?.setAttribute("type","text");
      eye?.setAttribute('class','fa-solid fa-eye-slash eyes');
      this.isBool = false
    }else{
      document.getElementById('password')?.setAttribute("type","password")
      this.isBool = true;
      eye?.setAttribute('class','fa-solid fa-eye eyes');
    }

  }

}
