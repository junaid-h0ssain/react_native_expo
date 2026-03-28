import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect();
        return todos;
    },
});

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
    },
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
    },
});

export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) throw new Error("Todo not found");
        const updated = await ctx.db.patch(args.id, {
            title: args.title,
        });
        return updated;
    },
});

export const deleteTodo = mutation({
    args: {
        id: v.id("todos"),
    },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return args.id;
    },
});

export const clearAllTodos = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        const deletePromises = todos.map((todo) => ctx.db.delete(todo._id));
        await Promise.all(deletePromises);
        return { deletedCount: todos.length };
    },
});

export default { getTodos, addTodo, toggleTodo, updateTodo, deleteTodo, clearAllTodos };
