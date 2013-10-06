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

ActiveRecord::Schema.define(version: 20131006120000) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: true do |t|
    t.text     "title"
    t.text     "body"
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

  create_table "bets", force: true do |t|
    t.integer  "homescore"
    t.integer  "awayscore"
    t.decimal  "homeodds"
    t.decimal  "awayodds"
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
  end

  create_table "fixtures", force: true do |t|
    t.string   "hometeam"
    t.string   "awayteam"
    t.datetime "kickoff"
    t.string   "competition"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "fouls", force: true do |t|
    t.integer  "home"
    t.integer  "away"
    t.datetime "created_at"
    t.datetime "updated_at"
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
  end

  create_table "shots", force: true do |t|
    t.integer  "homeshots"
    t.integer  "awayshots"
    t.datetime "created_at"
    t.datetime "updated_at"
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
  end

end
