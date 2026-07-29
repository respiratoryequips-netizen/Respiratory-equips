import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { secret, paths } = body;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ success: false, message: "Invalid secret" }, { status: 401 });
  }

  if (!Array.isArray(paths) || paths.length === 0) {
    return NextResponse.json({ success: false, message: "No paths provided" }, { status: 400 });
  }

  paths.forEach((path: string) => revalidatePath(path));

  return NextResponse.json({ success: true, revalidated: paths });
}