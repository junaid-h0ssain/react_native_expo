import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect();
        return todos;
    }
})

export const addTodo = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const todo = await ctx.db.insert("todos", {
            title: args.title,
            completed: false,
            createdAt: Date.now(),
        });
        return todo;
    }
});

export const toggleTodo = mutation({
    args: {
        id: v.id("todos"),
    },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) throw new Error("Todo not found");
        const updated = await ctx.db.patch(args.id, {
            completed: !todo.completed,
        });
        return updated;
    }
});

export const deleteTodo = mutation({
    args: {
        id: v.id("todos"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return args.id;
    }
});

export default { getTodos, addTodo, toggleTodo, deleteTodo };