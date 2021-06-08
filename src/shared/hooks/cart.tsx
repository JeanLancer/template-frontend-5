import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect
} from 'react';

interface ICartDataItem {
  product: any;
  quantity: number;
  subtotal: number;
}

export interface CartData {
  itens: ICartDataItem[];
  totalProducts: number;
  shippingValue: number;
  discountsValue: number;
  total: number;
}

interface CartForm {
  deliveryFields: {
    delivery_city: string;
    delivery_neighborhood: string;
    delivery_street: string;
    delivery_number: string;
    delivery_complement: string;
    observations: string;
    destinatary_name: string;
    destinatary_telephone: string;
    card_message: string;
  };
  deliverySchedule: {
    deliveryDate: Date;
    deliveryHour: string;
  };
  neighborhoodId: string;
  identifySender: boolean;
}

interface ICartContextData {
  cartData: CartData;
  cartForm: CartForm;

  addShippingValue: (value: number) => void;
  addToCart(product: any, quantity?: number, options?: any): void;
  removeToCart(product: any): void;
  hasOnCart(product: any): boolean;
  handleChangeCartForm: (key: string, value: any) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartContextData>({} as ICartContextData);

const CartProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const toast = useToast();

  const [cartData, setCartData] = useState<CartData>(() => ({
    itens: [],
    totalProducts: 0,
    discountsValue: 0,
    shippingValue: 0,
    total: 0
  }));

  const [cartForm, setCartForm] = useState<CartForm>(
    () =>
      ({
        deliveryFields: {
          delivery_city: null,
          delivery_neighborhood: null,
          delivery_street: null,
          delivery_number: null,
          delivery_complement: null,
          observations: null,
          destinatary_name: null,
          destinatary_telephone: null,
          card_message: null
        },
        deliverySchedule: {
          deliveryDate: null,
          deliveryHour: null
        },
        neighborhoodId: null,
        identifySender: true
      } as any)
  );

  const handleChangeCartForm = useCallback((key, value) => {
    setCartForm((oldState: any) => {
      return {
        ...oldState,
        [key]: value
      };
    });
  }, []);

  const addShippingValue = useCallback((value: number) => {
    setCartData(oldState => {
      const { totalProducts, discountsValue } = oldState;

      return {
        ...oldState,
        shippingValue: value,
        total: totalProducts + value - discountsValue
      };
    });
  }, []);

  const addToCart = useCallback(
    (product, quantity = 1, options = null) => {
      setCartData(oldState => {
        const { itens, shippingValue, discountsValue } = oldState;

        const hasOnCart = itens.find(item => item.product.id === product.id);

        if (!hasOnCart) {
          const updatedItems = itens;
          updatedItems.push({
            product,
            quantity,
            subtotal:
              Number(
                product.is_promotional
                  ? product.price_promotional
                  : product.price_sale
              ) * Number(quantity)
          });

          const updatedTotalProducts = updatedItems.reduce(
            (acc, currentValue) => {
              return acc + currentValue.subtotal;
            },
            0
          );

          const updatedTotal =
            updatedTotalProducts + shippingValue - discountsValue;

          const updatedCartData = {
            ...oldState,
            itens: updatedItems,
            totalProducts: updatedTotalProducts,
            total: updatedTotal
          };

          localStorage.setItem(
            `@eflorista-ecommerce:cart`,
            JSON.stringify(updatedCartData)
          );

          return updatedCartData;
        }

        return oldState;
      });

      if (options && options.redirect) {
        router.push('/checkout');
      } else {
        toast({
          title: 'Produto Adicionado',
          description: 'O produto foi adicionado ao seu carrinho.',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'bottom'
        });
      }
    },
    [router, toast]
  );

  const removeToCart = useCallback((product: any) => {
    setCartData(oldState => {
      const { itens, totalProducts, total } = oldState;

      const removedItem = itens.find(item => item.product.id === product.id);

      if (!removedItem) {
        return oldState;
      }

      const updatedItems = itens.filter(item => item.product.id !== product.id);

      const updatedTotalProducts = totalProducts - removedItem.subtotal;

      const updatedTotal = total - removedItem.subtotal;

      const updatedCartData = {
        ...oldState,
        itens: updatedItems,
        totalProducts: updatedTotalProducts,
        total: updatedTotal
      };

      localStorage.setItem(
        `@eflorista-ecommerce:cart`,
        JSON.stringify(updatedCartData)
      );

      return { ...updatedCartData };
    });
  }, []);

  const hasOnCart = useCallback(
    (product: any) => {
      return !!cartData.itens.find(item => item.product.id === product.id);
    },
    [cartData]
  );

  const clearCart = useCallback(() => {
    const data: CartData = {
      itens: [],
      totalProducts: 0,
      discountsValue: 0,
      shippingValue: 0,
      total: 0
    };

    setCartData(data);

    localStorage.clear();
  }, []);

  useEffect(() => {
    const sessionCartData = localStorage.getItem(`@eflorista-ecommerce:cart`);

    if (sessionCartData) {
      setCartData(JSON.parse(sessionCartData));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartData,
        cartForm,

        addShippingValue,
        addToCart,
        removeToCart,
        hasOnCart,
        handleChangeCartForm,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): ICartContextData => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export { CartProvider, useCart };
