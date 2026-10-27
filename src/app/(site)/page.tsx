import { getHomeData } from "@/lib/home-data";
import { HomePage } from "@/components/home/HomePage";

export default async function Page() {
  return <HomePage data={await getHomeData()} />;
}
