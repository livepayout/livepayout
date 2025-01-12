import { db } from "@/lib/db";
import { sendMoney } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (parseInt(body.credits) < 200) {
      return NextResponse.json(
        {
          success: false,
          message: "Minimum Withdrawal is 200 Credits equivalent to 2$",
        },
        { status: 400 }
      );
    }

    const user = await currentUser();
    console.log(parseFloat(body.credits) / 100);
    await db.withdraw.create({
      data: {
        username: user?.username || "Nan",
        amount: parseFloat(body.credits) / 100,
        address: body.address,
      },
    });
    await db.user.update({
      where: {
        externalUserId: body?.id,
      },
      data: {
        credits: body?.newCreds,
      },
    });
    return NextResponse.json(
      { success: true, message: "Credits Withdrawn Request Sent" },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      {
        status: 400,
      }
    );
  }
}
