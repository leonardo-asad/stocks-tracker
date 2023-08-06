import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { zfd } from "zod-form-data";
import { createPortfolio } from "@/lib/portfolio";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }

  const authorId = session.user.id;

  const schema = zfd.formData({
    name: zfd.text(),
  });

  const { name } = schema.parse(await request.formData());

  const newPortfolio = await createPortfolio({ name, authorId });

  return NextResponse.json(newPortfolio);
}
