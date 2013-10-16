class AddMoreDetailsToCorner < ActiveRecord::Migration
  def change
    add_column :corners, :hometeam, :string
    add_column :corners, :awayteam, :string
  end
end
