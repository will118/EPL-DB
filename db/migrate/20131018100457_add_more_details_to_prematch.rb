class AddMoreDetailsToPrematch < ActiveRecord::Migration
  def change
    add_column :prematches, :hometeam, :string
    add_column :prematches, :awayteam, :string
  end
end
