import {
  pgTable, uuid, text, integer, real, boolean, timestamp
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  id:            uuid('id').defaultRandom().primaryKey(),
  name:          text('name').notNull(),
  phone:         text('phone').notNull().unique(),
  age:           integer('age'),
  gender:        text('gender'),
  city:          text('city'),
  diabetesType:  text('diabetes_type'), // type1|type2|prediabetic|gestational
  diagnosedYear: integer('diagnosed_year'),
  latestHba1c:   real('latest_hba1c'),
  plan:          text('plan').default('free'),    // free|pro|premium
  lang:          text('lang').default('en'),       // en|bn
  createdAt:     timestamp('created_at').defaultNow().notNull(),
})

export const glucoseLogs = pgTable('glucose_logs', {
  id:       uuid('id').defaultRandom().primaryKey(),
  userId:   uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  value:    real('value').notNull(),
  type:     text('type').notNull(),              // fasting|post_meal|random
  loggedAt: timestamp('logged_at').defaultNow().notNull(),
})

export const medications = pgTable('medications', {
  id:           uuid('id').defaultRandom().primaryKey(),
  userId:       uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name:         text('name').notNull(),
  dose:         text('dose'),
  frequency:    text('frequency'),
  reminderTime: text('reminder_time'),
  instructions: text('instructions'),
  isActive:     boolean('is_active').default(true),
  stock:        integer('stock').default(30),
  createdAt:    timestamp('created_at').defaultNow().notNull(),
})

export const labBookings = pgTable('lab_bookings', {
  id:          uuid('id').defaultRandom().primaryKey(),
  userId:      uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  testName:    text('test_name').notNull(),
  labName:     text('lab_name').notNull(),
  bookedDate:  text('booked_date'),
  bookedTime:  text('booked_time'),
  status:      text('status').default('pending'), // pending|confirmed|cancelled
  createdAt:   timestamp('created_at').defaultNow().notNull(),
})

export const familyMembers = pgTable('family_members', {
  id:       uuid('id').defaultRandom().primaryKey(),
  ownerId:  uuid('owner_id').references(() => users.id, { onDelete: 'cascade' }),
  memberId: uuid('member_id').references(() => users.id, { onDelete: 'cascade' }),
  relation: text('relation'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  glucoseLogs:   many(glucoseLogs),
  medications:   many(medications),
  labBookings:   many(labBookings),
  familyMembers: many(familyMembers, { relationName: 'owner' }),
}))

export const glucoseLogsRelations = relations(glucoseLogs, ({ one }) => ({
  user: one(users, { fields: [glucoseLogs.userId], references: [users.id] }),
}))
