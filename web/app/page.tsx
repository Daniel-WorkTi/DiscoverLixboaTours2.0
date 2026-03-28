import { HomeInteractions } from "@/components/HomeInteractions";
import { HomePage } from "@/components/home/HomePage";
import { SiteClientEffects } from "@/components/SiteClientEffects";

export default function Page() {
  return (
    <>
      <SiteClientEffects />
      <HomeInteractions />
      <HomePage />
    </>
  );
}
