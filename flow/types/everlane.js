export type LineItemType = {
  id: number,
  title: string,
  is_deliverable: bool,
  is_preorder: bool,
  restock_date: string,
  image_url: string,
  size: string,
  color: string,
  total: string,
  quantity: number,
}

export type ShippingOptionType = {
  selected: ?boolean,
  description: string,
  cart_params: {
    delivery: boolean
  }
}

export type ContentPageType = {
  id: number,
  compiled_content: string,
  compiled_styles: string,
  compiled_config: Object,
}

export type VariantType = {
  orderable_state: 'waitlistable' | 'preorderable' | 'shippable' | 'sold_out'
}

export type ProductType = {
  id: number,
  permalink: string,
  title: string,
  short_description: string,
  price: number,
  gender: string,
  color: {
    name: string,
    primary_hex: string,
    secondary_hex: string
  },
  video: {
    id: number,
    name: string,
    source: string,
    urls:{
      [type: string]: string
    },
    created_at: string,
    updated_at: string,
    vimeo_url: string,
  },
  display_name: string,
  images: {
    square: Array<String>,
  },
  products_in_group: Array<ProductType>,
  variants: Array<VariantType>,
  desktop_content_page: ContentPageType,
  mobile_content_page: ContentPageType,
}

export type ProductGroupType = {
  id: number,
  title: string,
  price: number,
  product_permalink: string,
  product_count: number,
  images: {
    [type: string]: string
  },
  products: Array<ProductType>,
}

export type CollectionType = {
  id: number,
  permalink: string,
  title: string,
  gender: string,
  product_groups: ?Array<ProductGroupType>,
  collections: ?Array<CollectionType>,
}

export type HomepageType = {
  content_page: ContentPageType,
}

export type MenuType = {
  id: number,
  expanded: ?boolean,
  name: string,
  position: number,
  parent_id: number,
  important: boolean,
  img_url: string,
  url: string,
  submenus: Array<MenuType>,
}

export type AddressType = {
  state: string,
  id: number,
  full_name: string,
  company: string,
  street_address: string,
  extended_address: string,
  postal_code: string,
  first_name: string,
  last_name: string,
  city_line: string,
  primary: boolean,
  disabled: boolean,
  city: string,
  country: string,
  phone: ?string,
  delivery_instructions: ?string,
  region_code: string,
  region_name: string
}

export type CreditCardType = {
  id: number,
  primary: boolean,
  first_name: string,
  last_name: string,
  full_name: string,
  number: string,
  country: string,
  zip_code: string,
  expiration_month: string,
  expiration_year: string,
  type: string,
  disabled: boolean
}

export type VisitorType = {
  session_id: string,
  email: string,
  addresses: Array<AddressType>,
  credit_cards: Array<CreditCardType>,
  emailIsAvailable?: boolean,
}

export type UserType = {
  auth_token: string,
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  addresses: Array<AddressType>,
  credit_cards: Array<CreditCardType>,
}

export type OrderPreviewType = {
  subtotal: string,
  adjustments: Array<{label: string, amount: string}>,
  total: string,
}

export type EverlaneNowDetailsType = {
  phoneNumber: string,
  instructions: string,
  note: string,
}

export type ShipmentType = {
  id: number,
  state: string,
  fulfillment_center_id: number,
  allow_cancel: boolean,
  shipped_at: string,
  tracking_url: string,
  line_items: Array<LineItemType>,
}

export type OrderType = {
  id: number,
  state: string,
  number: string,
  purchase_number: number,
  shipping_premium: number,
  messenger_state_value: string,
  expedited: boolean,
  allow_cancel: boolean,
  international: boolean,
  virtual: boolean,
  allow_expedite: boolean,
  has_free_return: boolean,
  completed_at: string,
  returnable: boolean,
  price: number,
  total: number,
  display_price: string,
  display_subtotal: string,
  subtotal: number,
  latest_completed_order: boolean,
  total_adjustments: number,
  shipping_total: number,
  shipping_address: AddressType,
  payment_method_id: number,
  payment_method_type: string,
  shipments: Array<ShipmentType>,
  line_items: Array<ShipmentType>,
  returns: Array,
  return_units: Array,
  orphan_return_units: Array,
  orphan_received_return_units: Array,
  "returnable?": boolean,
  has_one_hour_delivery_items: boolean,
  notification_address: string,
  restock_fee: string,
}
