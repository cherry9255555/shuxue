import { notFound } from "next/navigation";
import RealmPage from "./RealmPage";
import { findRealm, realms } from "@/content";

export function generateStaticParams() {
  return realms.map((r) => ({ slug: r.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const realm = findRealm(slug);
  if (!realm) notFound();
  return <RealmPage realm={realm} />;
}
