import Cookies from "js-cookie";
import React, { createContext, useEffect, useState, useCallback } from "react";

import { addToCartForLogInUser, getCartForLogInUser, removedProductFromCartForLoginUser } from "@/actions/cart";
import { useAuth } from "@/hooks/use-auth";
import { Cart, CartItem, CartProduct } from "@/interfaces/cart";
import { toast } from "@/lib/toast-store";

interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  isAdding: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  coupon: {
    isApplied: boolean;
    discount: number;
    value: string;
  };
  addToCart: (product: CartProduct, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  increaseQty: (itemId: string) => Promise<void>;
  decreaseQty: (itemId: string) => Promise<void>;
  setCoupon: (coupon: {
    isApplied: boolean;
    discount: number;
    value: string;
  }) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const CART_EXPIRE_DAYS = 7;

// Helper functions
const calculateItemTotal = (price: number, quantity: number): number => {
  return price * quantity;
};

const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.total, 0);
};

const generateCartItemId = (): string => {
  return `ci_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  // State initialization
  const [cart, setCart] = useState<Cart>({
    id: "guest_cart",
    cart_items: [],
    cart_total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [coupon, setCoupon] = useState({
    isApplied: false,
    discount: 0,
    value: "",
  });

  // Fetch cart data
  const fetchCart = useCallback(async (): Promise<Cart> => {
    if (!isAuthenticated) {
      const cartData = Cookies.get("cart");
      return cartData
        ? JSON.parse(cartData)
        : { id: "guest_cart", cart_items: [], cart_total: 0 };
    }

    try {
      const response = await getCartForLogInUser();
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      const cartData = Cookies.get("cart");
      return cartData
        ? JSON.parse(cartData)
        : { id: "guest_cart", cart_items: [], cart_total: 0 };
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const loadCartData = async () => {
      try {
        setIsLoading(true);
        const cartData = await fetchCart();
        setCart(cartData);
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartData();
  }, [isAuthenticated, fetchCart]);

  const addToCart = useCallback(
    async (product: CartProduct, quantity: number = 1) => {
      const billing_price = product.price;
      const total = calculateItemTotal(billing_price, quantity);

      const cartItem: CartItem = {
        id: generateCartItemId(),
        product,
        quantity,
        billing_price,
        total,
      };

      // Update UI immediately for better UX
      setCart((prevCart) => {
        const existingItemIndex = prevCart.cart_items.findIndex(
          (item) => item.product.id === product.id
        );

        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
          newItems = prevCart.cart_items.map((item, index) =>
            index === existingItemIndex
              ? {
                ...item,
                quantity: item.quantity + quantity,
                total: calculateItemTotal(
                  item.billing_price,
                  item.quantity + quantity
                ),
              }
              : item
          );
        } else {
          newItems = [...prevCart.cart_items, cartItem];
        }

        const updatedCart = {
          ...prevCart,
          cart_items: newItems,
          cart_total: calculateCartTotal(newItems),
        };

        // Save updated cart to cookies for guest users
        Cookies.set("cart", JSON.stringify(updatedCart), {
          expires: CART_EXPIRE_DAYS,
        });

        return updatedCart;
      });

      if (isAuthenticated) {
        setIsAdding(true);
        const res = await addToCartForLogInUser([{
          product_id: product.id,
          quantity,
        }]);

        if (!res.success) {
          toast.error(res.message);
          // Revert UI changes if API fails
          setCart((prevCart) => ({
            ...prevCart,
            cart_items: prevCart.cart_items.filter(
              (item) => item.id !== cartItem.id
            ),
          }));
        } else {
          toast.success(res.message);
        }
        setIsAdding(false);
      } else {
        toast.success("Product added to cart");
      }
    },
    [isAuthenticated]
  );

  const removeFromCart = useCallback(
    async (itemId: string) => {
      const item = cart.cart_items.find((item) => item.id === itemId);
      if (!item) return;

      // Update UI immediately
      setCart((prevCart) => {
        const newCartItems = prevCart.cart_items.filter(
          (item) => item.id !== itemId
        );
        const updatedCart = {
          ...prevCart,
          cart_items: newCartItems,
          cart_total: calculateCartTotal(newCartItems),
        };

        // Save updated cart to cookies
        Cookies.set("cart", JSON.stringify(updatedCart), {
          expires: CART_EXPIRE_DAYS,
        });

        return updatedCart;
      });

      // Sync with backend if logged in
      if (isAuthenticated) {
        setIsRemoving(true);
        const res = await removedProductFromCartForLoginUser(itemId);

        if (!res.success) {
          console.error("Failed to remove from cart via API:", res.message);
          toast.error(res.message);
          // Revert UI changes
          setCart((prevCart) => ({
            ...prevCart,
            cart_items: [...prevCart.cart_items, item],
            cart_total: calculateCartTotal(prevCart.cart_items),
          }));
        } else {
          toast.success(res.message);
        }

        // Reset loading state
        setIsRemoving(false);
      } else {
        toast.success("Product removed from cart");
      }
    },
    [cart, isAuthenticated]
  );

  const increaseQty = useCallback(
    async (itemId: string) => {
      const item = cart.cart_items.find((item) => item.id === itemId);
      if (!item) return;

      const newQuantity = item.quantity + 1;

      // Update UI immediately
      setCart((prevCart) => {
        const updatedItems = prevCart.cart_items.map((item) =>
          item.id === itemId
            ? {
              ...item,
              quantity: newQuantity,
              total: calculateItemTotal(item.billing_price, newQuantity),
            }
            : item
        );
        const updatedCart = {
          ...prevCart,
          cart_items: updatedItems,
          cart_total: calculateCartTotal(updatedItems),
        };

        // Save updated cart to cookies
        Cookies.set("cart", JSON.stringify(updatedCart), {
          expires: CART_EXPIRE_DAYS,
        });

        return updatedCart;
      });

      // Sync with backend if logged in
      if (isAuthenticated) {
        try {
          setIsUpdating(true);
          // await updateCartForLoggedInUser(itemId, { quantity: newQuantity });
        } catch (error) {
          console.error("Failed to update cart via API:", error);
          toast.error("Failed to increase quantity");
          // Revert UI changes
          setCart((prevCart) => ({
            ...prevCart,
            cart_items: prevCart.cart_items.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity } : item
            ),
            cart_total: calculateCartTotal(prevCart.cart_items),
          }));
        } finally {
          setIsUpdating(false);
        }
      }
    },
    [cart, isAuthenticated]
  );

  const decreaseQty = useCallback(
    async (itemId: string) => {
      const item = cart.cart_items.find((item) => item.id === itemId);
      if (!item || item.quantity <= 1) return;

      const newQuantity = item.quantity - 1;

      // Update UI immediately
      setCart((prevCart) => {
        const updatedItems = prevCart.cart_items.map((item) =>
          item.id === itemId
            ? {
              ...item,
              quantity: newQuantity,
              total: calculateItemTotal(item.billing_price, newQuantity),
            }
            : item
        );
        const updatedCart = {
          ...prevCart,
          cart_items: updatedItems,
          cart_total: calculateCartTotal(updatedItems),
        };

        // Save updated cart to cookies
        Cookies.set("cart", JSON.stringify(updatedCart), {
          expires: CART_EXPIRE_DAYS,
        });

        return updatedCart;
      });

      // Sync with backend if logged in
      if (isAuthenticated) {
        try {
          setIsUpdating(true);
          // await updateCartForLoggedInUser(itemId, { quantity: newQuantity });
        } catch (error) {
          console.error("Failed to update cart via API:", error);
          toast.error("Failed to decrease quantity");
          // Revert UI changes
          setCart((prevCart) => ({
            ...prevCart,
            cart_items: prevCart.cart_items.map((item) =>
              item.id === itemId ? { ...item, quantity: item.quantity } : item
            ),
            cart_total: calculateCartTotal(prevCart.cart_items),
          }));
        } finally {
          setIsUpdating(false);
        }
      } else {
        // For guest users, persist to cookies
        Cookies.set("cart", JSON.stringify(cart), {
          expires: CART_EXPIRE_DAYS,
        });
      }
    },
    [cart, isAuthenticated]
  );

  const clearCart = useCallback(async () => {
    // Store cart for potential revert
    const oldCart = cart;

    // Update UI immediately
    setCart({
      ...cart,
      cart_items: [],
      cart_total: 0,
    });

    Cookies.remove("cart");

    // Sync with backend if logged in
    if (isAuthenticated) {
      try {
        // for (const item of oldCart.cart_items) {
        //     await removeFromCartForLoggedInUser(item.id as string);
        // }
      } catch (error) {
        console.error("Failed to clear cart via API:", error);
        toast.error("Failed to clear cart");
        // Revert UI changes
        setCart(oldCart);
      }
    }
  }, [cart, isAuthenticated]);

  // const syncCartWithServer = useCallback(async () => {
  //   if (!isAuthenticated) return;

  //   try {
  //     const cookieCart = Cookies.get("cart");
  //     const localCart = cookieCart
  //       ? JSON.parse(cookieCart)
  //       : { id: "guest_cart", cart_items: [], cart_total: 0 };

  //     // Skip sync if the local cart is already equal to the server cart
  //     const cartIsAlreadySynced =
  //       JSON.stringify(localCart.cart_items) ===
  //       JSON.stringify(cart.cart_items);
  //     if (cartIsAlreadySynced) return;

  //     if (localCart.cart_items.length > 0) {
  //       // Merge guest cart with server by adding items individually
  //       // for (const item of localCart.cart_items) {
  //       //     try {
  //       //         await addToCartForLoggedInUser({
  //       //             product_id: item.product.id,
  //       //             quantity: item.quantity,
  //       //         });
  //       //     } catch (error) {
  //       //         console.error("Failed to merge item:", error);
  //       //     }
  //       // }

  //       // Clear guest cart after successful merge
  //       Cookies.remove("cart");
  //     }

  //     // Refresh with server cart
  //     const serverCart = await fetchCart();
  //     setCart(serverCart);
  //   } catch (error) {
  //     console.error("Error syncing cart with server:", error);
  //   }
  // }, [fetchCart, isAuthenticated, cart]);

  const value: CartContextType = {
    cart,
    isLoading,
    isAdding,
    isRemoving,
    isUpdating,
    coupon,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
    setCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
