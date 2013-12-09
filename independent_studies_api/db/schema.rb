# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131209053109) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "advancements", force: true do |t|
    t.integer  "amount"
    t.integer  "enrollment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "courses", force: true do |t|
    t.string   "author",      default: ""
    t.string   "url",         default: ""
    t.string   "title"
    t.text     "description"
    t.string   "difficulty",  default: ""
    t.string   "publisher",   default: ""
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "language",    default: ""
    t.string   "cost"
    t.string   "format"
    t.string   "environment", default: ""
    t.string   "framework",   default: ""
  end

  create_table "enrollments", force: true do |t|
    t.integer  "percentage"
    t.integer  "user_id"
    t.integer  "course_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "notes", force: true do |t|
    t.string   "title",         default: ""
    t.text     "text"
    t.integer  "enrollment_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tag_associations", force: true do |t|
    t.integer  "tag_id"
    t.integer  "course_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", force: true do |t|
    t.string   "text"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "identifier"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "zipcode"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_admin"
  end

end
