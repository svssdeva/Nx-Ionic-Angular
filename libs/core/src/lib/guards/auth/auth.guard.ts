import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { RedirectionService } from '../../services/redirection/redirection.service';

export const authGuard: CanActivateFn = (route, state) => {
  
    const authService: AuthService = inject(AuthService);
    const redirectionService: RedirectionService = inject(RedirectionService);
    const router: Router = inject(Router);
    if (authService.isLoggedIn()) {
      return true;
    }

    // Save the current URL as the redirect URL
    const encodedUrl = encodeURIComponent(state.url);
    redirectionService.setRedirectUrl(encodedUrl);

    // Redirect to the login page or any other desired route
    router.navigate(['/login']);
    return false;
};
