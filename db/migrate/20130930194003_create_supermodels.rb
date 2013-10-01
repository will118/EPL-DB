class CreateSupermodels < ActiveRecord::Migration
  def change
    create_table :supermodels do |t|
      t.date :date
      t.integer :matchid
      t.text :teamname
      t.integer :avgpossession
      t.integer :shotaccuracy
      t.integer :passaccuracy
      t.integer :attackscore
      t.integer :defencescore
      t.integer :possesionscore
      t.integer :optascore


      t.timestamps
    end
  end
end
