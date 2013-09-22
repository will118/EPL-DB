class CreateBets < ActiveRecord::Migration
  def change
    create_table :bets do |t|
      t.integer :homescore
      t.integer :awayscore
      t.decimal :homeodds
      t.decimal :awayodds

      t.timestamps
    end
  end
end
