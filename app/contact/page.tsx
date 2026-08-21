import Image from "next/image";
import { ContactForm } from "../../components/contact-form";
import { Icon, type IconName } from "../../components/icons";
import { PublicNav } from "../../components/public-nav";
import { SiteFooter } from "../../components/site-footer";
import { getCatalogProducts } from "../../lib/catalog-repository";

export const metadata = {
  title: "ติดต่อ KORN & COINS | พระเครื่องและเหรียญสะสม",
};

const mapUrl = "https://www.google.com/maps/search/?api=1&query=B+Work+Coworking+%26+Office+Space+Si+Rat";

export default async function ContactPage() {
  const catalogProducts = await getCatalogProducts();

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <PublicNav searchProducts={catalogProducts} variant="contact" mobileMenu />

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
                  <p className="font-body-md text-body-md text-on-background">B Work Coworking &amp; Office Space<br />ย่านศรีรัช–แจ้งวัฒนะ</p>
                  <a className="font-label-caps text-label-caps text-primary-container hover:text-primary underline mt-2 inline-flex items-center gap-1 transition-colors" href={mapUrl} rel="noreferrer" target="_blank">
                    เปิดแผนที่ <Icon name="external-link" size={14} />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="relative h-36 border border-outline-variant overflow-hidden">
                    <Image fill className="object-cover" sizes="(min-width: 1024px) 14vw, 45vw" src="/images/map-screenshot.jpg" alt="แผนที่บริเวณ B Work Coworking & Office Space" />
                  </div>
                  <div className="relative h-36 border border-outline-variant overflow-hidden">
                    <Image fill className="object-cover" sizes="(min-width: 1024px) 14vw, 45vw" src="/images/hand-drawn-map.jpg" alt="แผนที่วาดมือแนะนำทางเข้าร้าน" />
                  </div>
                </div>
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
                  <ul className="space-y-4">
                    <Consultation icon="mail" label="พระเครื่องและวัตถุมงคล" href="mailto:amkorn.n@gmail.com" />
                    <Consultation icon="phone" label="เหรียญสะสม" href="tel:0887889878" />
                    <Consultation icon="map-pin" label="นัดหมายเข้าชมร้าน" href={mapUrl} external />
                  </ul>
                </div>
                <div className="mt-stack-lg pt-stack-md border-t border-outline-variant text-center">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">โทรหาเรา</p>
                  <a className="font-headline-md text-headline-md text-primary tracking-wider hover:text-primary-container transition-colors" href="tel:0887889878">088-788-9878</a>
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
                <a className="btn-primary" href="tel:0887889878">โทร 088-788-9878</a>
                <a className="btn-ghost" href="mailto:amkorn.n@gmail.com">amkorn.n@gmail.com</a>
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

function Consultation({ icon, label, href, external = false }: { icon: IconName; label: string; href: string; external?: boolean }) {
  return (
    <li className="flex justify-between items-center gap-3 border-b border-outline-variant/50 pb-2 last:border-b-0">
      <span className="flex items-center gap-2 font-body-md text-body-md font-semibold text-on-background">
        <Icon name={icon} size={16} className="text-on-surface-variant" />
        {label}
      </span>
      {external ? (
        <a className="font-body-md text-body-md text-primary-container hover:text-primary transition-colors inline-flex items-center gap-1" href={href} rel="noreferrer" target="_blank">แผนที่ <Icon name="external-link" size={14} /></a>
      ) : (
        <a className="font-body-md text-body-md text-primary-container hover:text-primary transition-colors" href={href}>{href.startsWith("tel:") ? "โทรหาเรา" : "ส่งอีเมล"}</a>
      )}
    </li>
  );
}
