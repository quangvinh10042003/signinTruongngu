import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isBool = true;

  loginForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })

  constructor(private http:HttpClient,private accService:AccountService,private route:Router) { }

  ngOnInit(): void {
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
  login():void{
    this.http.get<any>("http://localhost:3000/signupForm").subscribe((data)=>{
      const user = data.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        
      })
      if(user){
        // alert("Đăng Nhập Thành Công ! ");
        
        this.loginForm.reset();
        localStorage.setItem('loginForm',JSON.stringify(user)),
        this.route.navigate(['/']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logged in successfully',
          showConfirmButton: false,
          timer: 1500
        })
        
      }else{
        Swal.fire({
          icon: 'error',
          title: 'wrong login information',
          text: 'please check again',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
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
