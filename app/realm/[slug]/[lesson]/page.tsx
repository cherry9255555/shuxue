import { notFound } from "next/navigation";
import LessonPage from "./LessonPage";
import { findLesson, realms } from "@/content";

export function generateStaticParams() {
  const params: { slug: string; lesson: string }[] = [];
  for (const r of realms) {
    for (const l of r.lessons) {
      params.push({ slug: r.slug, lesson: l.slug });
    }
    params.push({ slug: r.slug, lesson: "boss" });
  }
  return params;
}

type Props = { params: Promise<{ slug: string; lesson: string }> };

export default async function Page({ params }: Props) {
  const { slug, lesson } = await params;
  const result = findLesson(slug, lesson);
  if (!result) notFound();
  return <LessonPage realmSlug={slug} lessonSlug={lesson} data={result} />;
}
