import Image from "next/image";
import { ContactForm } from "../../components/contact-form";
import { Icon } from "../../components/icons";
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

      <main className="flex-grow w-full max-w-container mx-auto px-margin-mobile md:px-margin-desktop py-stack-xl">
        <section className="text-center mb-stack-xl animate-fade-in opacity-0">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-stack-sm">ติดต่อ KORN &amp; COINS</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">สอบถามราคา ขอประเมิน ฝากขาย หรือนัดหมายเข้าชมของสะสม ทีมงานพร้อมให้คำแนะนำ</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <ContactForm />

          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <section className="bg-surface-container p-stack-lg border border-outline-variant animate-fade-in opacity-0 delay-200">
              <h2 className="font-headline-md text-headline-md text-on-background mb-stack-md flex items-center">
                <Icon name="map-pin" className="mr-2 font-light" />
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
                <h2 className="font-headline-md text-headline-md text-on-background mb-stack-md flex items-center">
                  <Icon name="shield-check" className="mr-2 font-light" />
                  ติดต่อทีมงานผู้เชี่ยวชาญ
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">สอบถามเรื่องพระเครื่อง เหรียญ หรือของสะสมได้โดยตรง</p>
                <ul className="space-y-4">
                  <Consultation label="พระเครื่องและวัตถุมงคล" href="mailto:amkorn.n@gmail.com" />
                  <Consultation label="เหรียญสะสม" href="tel:0887889878" />
                  <Consultation label="นัดหมายเข้าชมร้าน" href={mapUrl} external />
                </ul>
              </div>
              <div className="mt-stack-lg pt-stack-md border-t border-outline-variant text-center">
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">โทรหาเรา</p>
                <a className="font-headline-md text-headline-md text-primary tracking-wider hover:text-primary-container transition-colors" href="tel:0887889878">088-788-9878</a>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-stack-xl h-64 md:h-96 w-full border border-outline-variant animate-fade-in opacity-0 delay-300 relative group overflow-hidden">
          <Image fill className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105" sizes="100vw" src="/images/shop-counter.jpg" alt="บรรยากาศร้าน KORN & COINS และป้ายบริการรับซื้อขายเหรียญ" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 max-w-xl">
            <p className="font-headline-md text-headline-md text-on-surface">แวะมาพูดคุยเรื่องของสะสมกับเรา</p>
          </div>
        </div>
      </main>

      <SiteFooter variant="contact" />
    </div>
  );
}

function Consultation({ label, href, external = false }: { label: string; href: string; external?: boolean }) {
  return (
    <li className="flex justify-between items-center gap-3 border-b border-outline-variant/50 pb-2 last:border-b-0">
      <span className="font-body-md text-body-md font-semibold text-on-background">{label}</span>
      {external ? (
        <a className="font-body-md text-body-md text-primary-container hover:text-primary transition-colors inline-flex items-center gap-1" href={href} rel="noreferrer" target="_blank">แผนที่ <Icon name="external-link" size={14} /></a>
      ) : (
        <a className="font-body-md text-body-md text-primary-container hover:text-primary transition-colors" href={href}>{href.startsWith("tel:") ? "โทรหาเรา" : "ส่งอีเมล"}</a>
      )}
    </li>
  );
}
