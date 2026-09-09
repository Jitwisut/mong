import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Facebook,
  Instagram,
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
  | "facebook"
  | "instagram"
  | "tiktok"
  | "line"
  | "shield-check";

const iconMap: Record<IconName, LucideIcon | BrandIcon> = {
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
  facebook: Facebook,
  instagram: Instagram,
  tiktok: TikTokIcon,
  line: LineIcon,
  "shield-check": ShieldCheck,
};

interface BrandIconProps {
  className?: string;
  size?: number;
}

type BrandIcon = (props: BrandIconProps) => React.JSX.Element;

function TikTokIcon({ className, size = 20 }: BrandIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
      <path d="M16.5 0h-3.2v16.2a2.8 2.8 0 1 1-2.4-2.8V10a6.1 6.1 0 1 0 5.6 6.1V7.9a7.4 7.4 0 0 0 4.3 1.4V6a4.4 4.4 0 0 1-4.3-4.3V0Z" />
    </svg>
  );
}

function LineIcon({ className, size = 20 }: BrandIconProps) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
      <path d="M12 2C6.48 2 2 5.64 2 10.1c0 4 3.55 7.35 8.35 7.99.33.07.77.21.88.49.1.25.07.64.03.89l-.14.85c-.04.25-.2.99.87.54s5.76-3.39 7.86-5.81C21.29 13.44 22 11.86 22 10.1 22 5.64 17.52 2 12 2ZM8.1 12.5H6.02a.28.28 0 0 1-.28-.28V8.1a.28.28 0 1 1 .56 0v3.84H8.1a.28.28 0 1 1 0 .56Zm1.4-.28a.28.28 0 1 1-.56 0V8.1a.28.28 0 1 1 .56 0v4.12Zm4-.0a.28.28 0 0 1-.5.17L11 9.86v2.36a.28.28 0 1 1-.56 0V8.1a.28.28 0 0 1 .5-.17l2 2.53V8.1a.28.28 0 1 1 .56 0v4.12Zm3-2.34a.28.28 0 1 1 0 .56h-1.52v1.24h1.52a.28.28 0 1 1 0 .56h-1.8a.28.28 0 0 1-.28-.28V8.1a.28.28 0 0 1 .28-.28h1.8a.28.28 0 1 1 0 .56h-1.52v1.24h1.52Z" />
    </svg>
  );
}

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

const brandIcons = new Set<IconName>(["tiktok", "line"]);

export function Icon({ name, className, size = 20, strokeWidth = 1.6 }: IconProps) {
  const IconComponent = iconMap[name];

  if (brandIcons.has(name)) {
    const BrandComponent = IconComponent as BrandIcon;
    return <BrandComponent className={className} size={size} />;
  }

  const LucideComponent = IconComponent as LucideIcon;
  return <LucideComponent aria-hidden="true" className={className} size={size} strokeWidth={strokeWidth} />;
}
