import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, LogOut, User, Croissant } from 'lucide-react';
import { CartDropdown } from './CartDropdown';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

export function Header() {
  const { items, toggleCart } = useCartStore();
  const { user, setUser, logout } = useUserStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = useCallback(() => {
    logout();
    googleLogout();
  }, [logout]);

  return (
    <header className="sticky top-0 z-50 bg-amber-100 shadow-sm">
      <div className="container px-4 py-3 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-amber-800 hover:text-amber-700 transition-colors">
          <Croissant className="h-6 w-6" />
          <span>Andolini</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center">
                    <User size={16} className="text-amber-800" />
                  </div>
                )}
                <span className="hidden md:inline text-sm text-amber-900">
                  {user.name}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-amber-700 hover:text-amber-900 text-sm flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Salir</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:block">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  // Decode JWT token to get user info
                  const base64Url = credentialResponse.credential?.split('.')[1];
                  if (base64Url) {
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = decodeURIComponent(
                      atob(base64)
                        .split('')
                        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                        .join('')
                    );
                    const userData = JSON.parse(jsonPayload);
                    setUser({
                      name: userData.name,
                      email: userData.email,
                      picture: userData.picture,
                      googleId: userData.sub
                    });
                  }
                }}
                onError={() => {
                  console.error('Login Failed');
                }}
                text="signin"
                shape="rectangular"
                theme="outline"
                size="medium"
                width="120"
                logo_alignment="left"
              />
            </div>
          )}
          
          <div className="relative">
            <button 
              className="p-1 relative" 
              aria-label="Carrito de compras" 
              onClick={toggleCart}
            >
              <ShoppingBag size={24} className="text-amber-800" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <CartDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}