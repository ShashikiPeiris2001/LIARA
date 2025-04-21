import React from "react";

interface CartItemProps {
  item: {
    cartItemID: number;
    productID: number;
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string;
    size: string;
    pattern: string;
  };
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex items-start gap-4 border-b pb-6">
      <img
        src={item.imageUrl}
        alt={item.productName}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1 space-y-1">
        <h3 className="font-semibold text-gray-800">{item.productName}</h3>
        <p className="text-sm text-gray-500">{item.pattern}</p>
        <p className="text-sm text-gray-500">Size: {item.size}</p>
        <p className="text-sm font-semibold text-gray-800">
          LKR {item.price.toFixed(2)}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-600">Qty:</span>
          <div className="flex items-center border px-2 rounded">
            <span>-</span>
            <span className="px-2">{item.quantity}</span>
            <span>+</span>
          </div>
        </div>

        <button
          onClick={() => onRemove(item.cartItemID)}
          className="text-sm text-red-500 underline mt-1"
        >
          Remove
        </button>
      </div>
      <div className="text-right font-semibold text-gray-700 min-w-[100px]">
        LKR {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
