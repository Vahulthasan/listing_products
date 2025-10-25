import { Package } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-square bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-20 h-20 text-orange-300" />
        )}
        {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Low Stock
          </div>
        )}
        {product.stock_quantity === 0 && (
          <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
          {product.tamil_name && (
            <p className="text-sm text-orange-600 font-medium mt-1">
              {product.tamil_name}
            </p>
          )}
        </div>

        {product.brand && (
          <p className="text-xs text-gray-500 mb-2">
            Brand: <span className="font-semibold text-gray-700">{product.brand}</span>
          </p>
        )}

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-green-700">
            ₹{product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">/ {product.unit}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs text-gray-600">
            Stock: <span className="font-semibold">{product.stock_quantity}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
