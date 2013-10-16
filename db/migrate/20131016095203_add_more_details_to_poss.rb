class AddMoreDetailsToPoss < ActiveRecord::Migration
  def change
    add_column :posses, :hometeam, :string
    add_column :posses, :awayteam, :string
  end
end
