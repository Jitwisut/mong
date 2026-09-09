import Image from "next/image";
import { ContactForm } from "../../components/contact-form";
import { Icon, type IconName } from "../../components/icons";
import { PublicNav } from "../../components/public-nav";
import { ShopMap } from "../../components/shop-map";
import { SiteFooter } from "../../components/site-footer";
import { shopContact, socialLinks } from "../../components/site-data";
import { getCatalogProducts } from "../../lib/catalog-repository";

export const metadata = {
  title: "ติดต่อ KORN & COINS | พระเครื่องและเหรียญสะสม",
};

export default async function ContactPage() {
  const catalogProducts = await getCatalogProducts();

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <PublicNav active="contact" searchProducts={catalogProducts} variant="contact" mobileMenu />

      <main className="flex-grow w-full">
        <section className="text-center px-margin-mobile md:px-margin-desktop pt-12 md:pt-stack-xl pb-stack-lg animate-fade-in opacity-0">
          <p className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-stack-sm">KORN &amp; COINS · ติดต่อเรา</p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-stack-sm">ติดต่อ KORN &amp; COINS</h1>
          <span aria-hidden="true" className="mx-auto mb-stack-sm block h-px w-16 bg-primary" />
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">สอบถามราคา ขอประเมิน ฝากขาย หรือนัดหมายเข้าชมของสะสม ทีมงานพร้อมให้คำแนะนำ</p>
        </section>

        <div className="max-w-container mx-auto px-margin-mobile md:px-margin-desktop pb-12 md:pb-stack-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <ContactForm />

            <div className="lg:col-span-5 flex flex-col gap-gutter lg:sticky lg:top-24">
              <section className="bg-surface-container p-stack-lg border border-outline-variant animate-fade-in opacity-0 delay-200">
                <h2 className="font-headline-md text-headline-md text-on-background mb-stack-md flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/30 bg-primary/10 text-primary">
                    <Icon name="map-pin" size={18} />
                  </span>
                  หน้าร้านและการนัดหมาย
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">แนะนำให้นัดหมายล่วงหน้า เพื่อให้ทีมงานเตรียมข้อมูลและดูแลคุณได้เต็มที่</p>
                <div className="border-l-2 border-primary-container pl-4">
                  <h3 className="font-label-caps text-label-caps text-primary mb-1">KORN &amp; COINS</h3>
                  <p className="font-body-md text-body-md text-on-background">
                    {shopContact.addressFloor}<br />{shopContact.addressPlace}
                  </p>
                  <a className="font-label-caps text-label-caps text-primary-container hover:text-primary underline mt-2 inline-flex min-h-11 items-center gap-1 transition-colors" href={shopContact.mapUrl} rel="noreferrer" target="_blank">
                    เปิดใน Google Maps <Icon name="external-link" size={14} />
                  </a>
                </div>
                <ShopMap />
              </section>

              <section className="bg-surface-container-high p-stack-lg border border-outline-variant animate-fade-in opacity-0 delay-300 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-background mb-stack-md flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-tertiary/30 bg-tertiary/10 text-tertiary">
                      <Icon name="shield-check" size={18} />
                    </span>
                    ติดต่อทีมงานผู้เชี่ยวชาญ
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">สอบถามเรื่องพระเครื่อง เหรียญ หรือของสะสมได้โดยตรง</p>
                  <ul className="space-y-2">
                    <Channel icon="phone" label="เบอร์โทรศัพท์" value={shopContact.phone} href={shopContact.phoneHref} />
                    <Channel icon="mail" label="อีเมล" value={shopContact.email} href={shopContact.emailHref} />
                  </ul>

                  <p className="mt-stack-lg mb-stack-sm font-label-caps text-label-caps text-on-surface-variant">ช่องทางออนไลน์</p>
                  <ul className="space-y-2">
                    {socialLinks.map((social) => (
                      <Channel
                        external
                        href={social.href}
                        icon={social.key as IconName}
                        key={social.key}
                        label={social.label}
                        value={social.handle}
                      />
                    ))}
                  </ul>
                </div>
                <div className="mt-stack-lg pt-stack-md border-t border-outline-variant text-center">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">โทรหาเรา</p>
                  <a className="font-headline-md text-headline-md text-primary tracking-wider hover:text-primary-container transition-colors" href={shopContact.phoneHref}>{shopContact.phone}</a>
                </div>
              </section>
            </div>
          </div>
        </div>

        <section className="border-t border-outline-variant animate-fade-in opacity-0 delay-300">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="order-2 lg:order-1 flex flex-col justify-center gap-stack-md bg-surface px-margin-mobile md:px-margin-desktop py-16">
              <p className="font-label-caps text-label-caps text-primary tracking-[0.2em]">แวะมาที่ร้าน</p>
              <h2 className="font-headline-lg text-headline-lg text-on-surface max-w-md">แวะมาพูดคุยเรื่องของสะสมกับเรา</h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">ทีมงานยินดีต้อนรับทุกวัน พร้อมชงชาคุยเรื่องพระเครื่องและของสะสมกับคุณ</p>
              <div className="flex flex-wrap gap-4 pt-stack-sm">
                <a className="btn-primary" href={shopContact.phoneHref}>โทร {shopContact.phone}</a>
                <a className="btn-ghost" href={shopContact.emailHref}>{shopContact.email}</a>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative min-h-[280px] lg:min-h-[380px] group overflow-hidden">
              <Image fill className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 50vw, 100vw" src="/images/shop-counter.jpg" alt="บรรยากาศร้าน KORN & COINS และป้ายบริการรับซื้อขายเหรียญ" />
              <div aria-hidden="true" className="absolute inset-0 hidden lg:block bg-gradient-to-l from-transparent via-transparent to-surface/10" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="contact" />
    </div>
  );
}

function Channel({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li className="border-b border-outline-variant/50 last:border-b-0">
      <a
        className="flex min-h-11 items-center justify-between gap-3 py-2 transition-colors hover:text-primary"
        href={href}
        {...(external ? { rel: "noreferrer", target: "_blank" } : {})}
      >
        <span className="flex items-center gap-2 font-body-md text-body-md font-semibold text-on-background">
          <Icon name={icon} size={16} className="text-on-surface-variant" />
          {label}
        </span>
        <span className="inline-flex items-center gap-1 font-body-md text-body-md text-primary-container">
          {value}
          {external ? <Icon name="external-link" size={14} /> : null}
        </span>
      </a>
    </li>
  );
}
