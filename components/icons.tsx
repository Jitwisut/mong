import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  CirclePlus,
  ExternalLink,
  Gavel,
  Heart,
  History,
  ImagePlus,
  Images,
  Info,
  Landmark,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  PlayCircle,
  ReceiptText,
  Search,
  Send,
  Settings,
  Shield,
  ShieldCheck,
  Tag,
  Tags,
  Truck,
  UserRound,
  X,
} from "lucide-react";

export type IconName =
  | "search"
  | "heart"
  | "user"
  | "menu"
  | "verified"
  | "truck"
  | "shield"
  | "dashboard"
  | "add-circle"
  | "inventory"
  | "receipt"
  | "settings"
  | "category"
  | "images"
  | "info"
  | "history"
  | "landmark"
  | "chevron-down"
  | "chevron-right"
  | "arrow-right"
  | "external-link"
  | "check"
  | "mail"
  | "map-pin"
  | "phone"
  | "send"
  | "close"
  | "image-plus"
  | "tag"
  | "gavel"
  | "building"
  | "play-circle"
  | "shield-check";

const iconMap: Record<IconName, LucideIcon> = {
  search: Search,
  heart: Heart,
  user: UserRound,
  menu: Menu,
  verified: BadgeCheck,
  truck: Truck,
  shield: Shield,
  dashboard: LayoutDashboard,
  "add-circle": CirclePlus,
  inventory: Package,
  receipt: ReceiptText,
  settings: Settings,
  category: Tags,
  images: Images,
  info: Info,
  history: History,
  landmark: Landmark,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
  "external-link": ExternalLink,
  check: CheckCircle2,
  mail: Mail,
  "map-pin": MapPin,
  phone: Phone,
  send: Send,
  close: X,
  "image-plus": ImagePlus,
  tag: Tag,
  gavel: Gavel,
  building: Building2,
  "play-circle": PlayCircle,
  "shield-check": ShieldCheck,
};

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, className, size = 20, strokeWidth = 1.6 }: IconProps) {
  const IconComponent = iconMap[name];

  return <IconComponent aria-hidden="true" className={className} size={size} strokeWidth={strokeWidth} />;
}
