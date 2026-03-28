import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const schema = defineSchema({
    todos: defineTable({
        title: v.string(),
        completed: v.boolean(),
        createdAt: v.number(),
    }),
});

export default schema;
