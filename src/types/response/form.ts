type ScheduleTime = {
  start: string;
  end: string;
  timezone: string;
};

type Schedule = {
  id: number;
  days_of_week: string[];
  closed: boolean;
  scheduleable_id: number;
  scheduleable_type: string;
  schedule_type: string;
  schedule_time: ScheduleTime[];
};

type Document = {
  id: number;
  document_type: string;
  document_url: string;
  documentable_id: number;
  documentable_type: string;
  name: string;
};

type ImageAttributes = {
  id: number;
  image_type: string;
  image_url: string;
  name: string;
  position: number;
  scope_type: string;
  status: string;
};

type Menu = {
  id: number;
  description_ar: string;
  description_en: string;
  image: string | null;
  is_inherit_merchant_menu: boolean;
  menuable_id: number;
  menuable_type: string;
  name_ar: string;
  name_en: string;
  parent_id: number | null;
  status: string;
};

type StoreAddress = {
  id: number;
  city: string;
  country: string;
  detail_address: string;
  latitude: number;
  longitude: number;
  pincode: number;
  state: string;
  street: string;
};

type Store = {
  id: number;
  active_menu: Menu | null;
  address: StoreAddress;
  city: string;
  commission: number | null;
  country: string;
  cover_image: ImageAttributes;
  created_at: string;
  default_menu: Menu | null;
  event_shipping_zone: string | null;
  free_express: boolean;
  has_express: boolean | null;
  has_vat: boolean;
  images: ImageAttributes[];
  inactive_menu: Menu | null;
  inherit_merchant_schedule: boolean;
  is_banded: boolean | null;
  is_grid_view: boolean;
  is_online: boolean;
  is_ramadan: boolean;
  latitude: number;
  longitude: number;
  merchant: {
    timezone: string;
    default_schedule_attributes: Schedule[];
    ramadan_schedule_attributes: any[];
  };
  merchant_id: number;
  min_order: string;
  name_ar: string;
  name_en: string;
  on_top: boolean;
  order_beep: boolean;
  payment_method: string[];
  phone: string;
  preparation_time: number;
  ramadan_schedules: any[];
  region: string | null;
  restaurant_categories: any[] | null;
  schedules: Schedule[];
  status: string;
  temporary_time: string | null;
  type_of_order: string[];
  user_ids: number[];
  vat_number: string;
};

export type Merchant = {
  id: number;
  city: string;
  ctic_status: string;
  default_menu: Menu;
  default_schedule_attributes: Schedule[];
  documents_attributes: Document[];
  email: string;
  image_attributes: ImageAttributes;
  is_active: boolean;
  is_ramadan: boolean;
  menus: Menu[];
  name: string;
  phone: string;
  publish_status: string;
  ramadan_schedule_attributes: any[];
  shukah_merchant_id: string | null;
  status: boolean;
  stores: Store[];
  system_categories: {
    id: number;
    cover_image: ImageAttributes;
    image: ImageAttributes;
    name_ar: string;
    name_en: string;
  }[];
  timezone: string;
  user_id: number;
};

export type Regions = {
  id: string;
  nameAr: string;
  nameEn: string;
};

export type Cities = {
  id: string;
  nameAr: string;
  nameEn: string;
};
