import Link from "next/link";

type FooterVariant = "home" | "product" | "contact";

interface SiteFooterProps {
  variant: FooterVariant;
}

const footerLinks = [
  { label: "หน้าแรก", href: "/" },
  { label: "สินค้าทั้งหมด", href: "/watches/rolex-submariner" },
  { label: "บริการของร้าน", href: "/contact" },
  { label: "ติดต่อเรา", href: "/contact" },
];

export function SiteFooter({ variant }: SiteFooterProps) {
  if (variant === "product") {
    return (
      <footer className="bg-inverse-surface w-full mt-auto border-t border-outline-variant">
        <div className="w-full py-stack-xl px-gutter grid grid-cols-1 md:grid-cols-4 gap-stack-lg max-w-container mx-auto">
          <div className="md:col-span-1">
            <Link href="/" className="font-display-lg text-headline-sm text-inverse-on-surface mb-stack-md block tracking-tight">
              KORN &amp; COINS
            </Link>
            <p className="font-body-md text-body-md text-surface-variant/70 mb-stack-lg">ศูนย์รวมพระเครื่อง เหรียญ และของสะสมสำหรับนักสะสมทุกระดับ</p>
            <p className="font-body-md text-body-md text-surface-variant/70 text-sm">© 2026 KORN &amp; COINS. สงวนลิขสิทธิ์</p>
          </div>
          <FooterColumn title="เมนู" links={footerLinks.slice(0, 2)} />
          <FooterColumn title="บริการ" links={footerLinks.slice(2)} />
        </div>
      </footer>
    );
  }

  if (variant === "contact") {
    return (
      <footer className="bg-inverse-surface full-width border-t border-outline mt-auto">
        <div className="w-full py-stack-xl px-gutter grid grid-cols-1 md:grid-cols-4 gap-stack-lg max-w-container mx-auto">
          <div className="flex flex-col space-y-stack-sm md:col-span-2">
            <span className="font-display-lg text-headline-sm text-inverse-on-surface">KORN &amp; COINS</span>
            <p className="font-body-md text-body-md text-surface-variant/70 max-w-md">รับซื้อ ขาย ประเมิน และตรวจสอบของสะสมด้วยความใส่ใจและประสบการณ์จริง</p>
          </div>
          <FooterColumn title="ข้อมูลร้าน" links={footerLinks.slice(2)} />
          <div className="flex flex-col justify-end md:items-end">
            <p className="font-body-md text-body-md text-surface-variant/50 text-sm">© 2026 KORN &amp; COINS. สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-inverse-surface w-full py-stack-xl px-gutter">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-4 gap-stack-lg border-t border-outline py-8">
        <div className="md:col-span-1">
          <div className="font-display-lg text-headline-sm text-inverse-on-surface mb-4">KORN &amp; COINS</div>
          <p className="font-body-md text-body-md text-surface-variant/70">พื้นที่สำหรับคนรักพระเครื่อง เหรียญ และเรื่องราวของของสะสม</p>
        </div>
        <div className="md:col-span-3 flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-8">
          {footerLinks.map((link) => (
            <Link key={link.label} className="font-label-caps text-label-caps text-surface-variant/70 hover:text-primary-fixed transition-colors duration-200" href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="text-center font-body-md text-body-md text-surface-variant/70 pb-4">© 2026 KORN &amp; COINS. สงวนลิขสิทธิ์</div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div className="flex flex-col gap-stack-sm">
      <h4 className="font-label-caps text-label-caps text-primary-fixed-dim font-bold mb-2">{title}</h4>
      {links.map((link) => (
        <Link key={link.label} className="font-body-md text-body-md text-surface-variant/70 hover:text-primary-fixed transition-colors duration-200 outline-none focus:underline focus:underline-offset-4" href={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
