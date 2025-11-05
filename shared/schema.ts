import { sql } from "drizzle-orm";
import { pgTable, text, varchar, numeric, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  plan: text("plan").notNull(),
  monthlyValue: numeric("monthly_value", { precision: 10, scale: 2 }).notNull(),
  renewalDate: date("renewal_date").notNull(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
});

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;
