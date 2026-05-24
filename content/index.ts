import { linearRealm } from "./linear-function";
import { quadraticRealm } from "./quadratic-function";
import type { Realm } from "./types";

export const realms: Realm[] = [linearRealm, quadraticRealm];

export function findRealm(slug: string): Realm | undefined {
  return realms.find((r) => r.slug === slug);
}

export function findLesson(realmSlug: string, lessonSlug: string) {
  const realm = findRealm(realmSlug);
  if (!realm) return null;
  if (lessonSlug === "boss") {
    return { realm, lesson: null, boss: realm.boss };
  }
  const lesson = realm.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { realm, lesson, boss: null };
}
