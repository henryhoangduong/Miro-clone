import { currentUser, auth } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.NEXT_LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  const authorizatin = await auth();
  const user = await currentUser();
  console.log("AUTHORZATION", {
    authorizatin,
    user,
  });
  if (!authorizatin || !user) {
    return new Response("Unauthorized", { status: 403 });
  }
  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });
  console.log("AUTHORZATION", {
    room,
    board,
    boardOrgId: board?.orgId,
    authorizationOrgId: authorizatin.orgId,
  });
  if (board?.orgId !== authorizatin.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }
  const userInfo = {
    name: user.firstName || "Teammate",
    picture: user.imageUrl,
  };
  console.log("user info: ", userInfo);
  const session = liveblocks.prepareSession(user.id, { userInfo });
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  const { status, body } = await session.authorize();
  console.log({ status, body }, "ALLOWED");
  return new Response(body, { status });
}
