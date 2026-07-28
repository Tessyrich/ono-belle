/**
 * Products are now served by the live API. This module is kept as a thin
 * compatibility re-export; import from `@/lib/product` directly in new code.
 */
export {
  type Product,
  formatNaira,
  formatPrice,
  mapProduct,
  PRODUCT_PLACEHOLDER,
} from "@/lib/product";
