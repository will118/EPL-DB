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

ActiveRecord::Schema.define(version: 20131103151947) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "api_scores", force: true do |t|
    t.datetime "date"
    t.string   "home"
    t.string   "away"
    t.string   "status"
    t.string   "halftime"
    t.string   "fulltime"
    t.text     "incidents"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "live"
  end

  create_table "articles", force: true do |t|
    t.text     "title"
    t.text     "body"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "authorizations", force: true do |t|
    t.string   "provider"
    t.string   "uid"
    t.integer  "user_id"
    t.string   "token"
    t.string   "secret"
    t.string   "name"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "away_benches", force: true do |t|
    t.string   "name"
    t.integer  "number"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "away_xis", force: true do |t|
    t.string   "name"
    t.integer  "number"
    t.string   "subbed"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "caches", force: true do |t|
    t.text     "json"
    t.string   "kind_of"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cards", force: true do |t|
    t.date     "date"
    t.integer  "yellow"
    t.integer  "red"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "corners", force: true do |t|
    t.integer  "home"
    t.integer  "away"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "hometeam"
    t.string   "awayteam"
    t.datetime "matchdate"
  end

  create_table "fixtures", force: true do |t|
    t.string   "hometeam"
    t.string   "awayteam"
    t.datetime "kickoff"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "rawlink"
    t.string   "jsonurl"
    t.string   "lineup_url"
    t.boolean  "gotteam"
  end

  create_table "forms", force: true do |t|
    t.text     "team"
    t.text     "form"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fouls", force: true do |t|
    t.integer  "home"
    t.integer  "away"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "hometeam"
    t.string   "awayteam"
    t.datetime "matchdate"
  end

  create_table "home_benches", force: true do |t|
    t.string   "name"
    t.integer  "number"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "home_xis", force: true do |t|
    t.string   "name"
    t.integer  "number"
    t.string   "subbed"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "passings", force: true do |t|
    t.date     "date"
    t.integer  "totalpasses"
    t.integer  "keypasses"
    t.integer  "assists"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posses", force: true do |t|
    t.integer  "homeposs"
    t.integer  "awayposs"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "hometeam"
    t.string   "awayteam"
    t.datetime "matchdate"
  end

  create_table "possessions", force: true do |t|
    t.date     "date"
    t.integer  "possession"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "prematches", force: true do |t|
    t.text     "text"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "hometeam"
    t.string   "awayteam"
  end

  create_table "scores", force: true do |t|
    t.string   "teams"
    t.string   "score"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "shots", force: true do |t|
    t.integer  "homeshots"
    t.integer  "awayshots"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "hometeam"
    t.string   "awayteam"
    t.datetime "matchdate"
  end

  create_table "supermodels", force: true do |t|
    t.date     "date"
    t.integer  "matchid"
    t.text     "teamname"
    t.integer  "avgpossession"
    t.integer  "shotaccuracy"
    t.integer  "passaccuracy"
    t.integer  "attackscore"
    t.integer  "defencescore"
    t.integer  "possesionscore"
    t.integer  "optascore"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "targets", force: true do |t|
    t.integer  "homeshots"
    t.integer  "awayshots"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "hometeam"
    t.string   "awayteam"
    t.datetime "matchdate"
  end

  create_table "teams", force: true do |t|
    t.string   "teamname"
    t.text     "player"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "starting"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "settings"
    t.string   "authentication_token"
  end

  add_index "users", ["authentication_token"], name: "index_users_on_authentication_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
