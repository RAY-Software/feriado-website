import { redirect } from "next/navigation";

export default async function LocationRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/ubicaciones/${slug}`);
}
