import { v } from "convex/values";
import { mutation } from "./_generated/server";

const images = ["/placeholder/1.svg"];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const randomImage = images[0];
    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });
    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const userId = identity.subject;
    const exisitingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", args.id),
      )
      .unique();
    if (exisitingFavorite) {
      await ctx.db.delete(exisitingFavorite._id);
    }
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    if (!args.title) {
      throw new Error("Title is required");
    }
    if (args.title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters");
    }
    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });
    return board;
  },
});

export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found");
    }
    const userId = identity.subject;
    const exisitingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId),
      )
      .unique();
    if (exisitingFavorite) {
      throw new Error("Board already favortied");
    }
    await ctx.db.insert("userFavorites", {
      userId,
      orgId: args.orgId,
      boardId: args.id,
    });
    return board;
  },
});

export const unFavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("Board not found");
    }
    const userId = identity.subject;
    const exisitingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id),
      )
      .unique();
    if (!exisitingFavorite) {
      throw new Error("Board not found");
    }
    await ctx.db.delete(exisitingFavorite._id);
    return board;
  },
});
