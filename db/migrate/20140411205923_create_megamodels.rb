class CreateMegamodels < ActiveRecord::Migration
  def change
    create_table :megamodels do |t|
      t.string :home
      t.string :away
      t.integer :home_ht_score
      t.integer :away_ht_score
      t.integer :home_ft_score
      t.integer :away_ft_score
      t.integer :home_shots
      t.integer :away_shots
      t.integer :home_targets
      t.integer :away_targets
      t.integer :home_corners
      t.integer :away_corners
      t.integer :home_fouls
      t.integer :away_fouls
      t.float :home_possession
      t.float :away_possession
      t.timestamps
    end
  end
end
