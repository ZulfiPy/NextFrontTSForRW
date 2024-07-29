import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL as string;

export const usersTable = pgTable('users', {
    id: text("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    birth_date: timestamp("birth_date").notNull(),
    personal_id_code: text("personal_id_code").notNull().unique(),
    email: text("email").notNull().unique(),
});

export const sessionsTable = pgTable('sessions', {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at", { withTimezone: true, mode: "date" }).notNull(),
    userId: text("user_id").references(() => usersTable.id).notNull()
});

export const client = postgres(connectionString);

export const db = drizzle(client);

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export type DatabaseUser = {
    id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    birth_date: Date;
    personal_id_code: string;
    email: string;
}