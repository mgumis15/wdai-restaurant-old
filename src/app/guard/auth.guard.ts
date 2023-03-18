import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


constructor(private authService:AuthService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(next.url[0].path=="Login"||next.url[0].path=="Register"){
        
      if(this.authService.isLogged()){
        
        this.router.navigate["/Home"]
        return false
      }else{
        return true
      }
      }
     
    return this.authService.haveAccess(next.url[0].path)
  }
  
}
