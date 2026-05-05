import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingBookingButton } from "@/components/FloatingBookingButton";
import { CookieConsent } from "@/components/CookieConsent";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar
        bookingUrl={settings.bookingUrl}
        instagramUrl={settings.instagramUrl}
        facebookUrl={settings.facebookUrl}
        address={settings.address}
      />
      <main className="flex-grow">{children}</main>
      <Footer
        bookingUrl={settings.bookingUrl}
        phone={settings.phone}
        address={settings.address}
        instagramUrl={settings.instagramUrl}
        facebookUrl={settings.facebookUrl}
        tiktokUrl={settings.tiktokUrl}
      />
      <FloatingBookingButton bookingUrl={settings.bookingUrl} />
      <CookieConsent />
    </>
  );
}
