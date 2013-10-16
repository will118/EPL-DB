class AddMoreDetailsToShot < ActiveRecord::Migration
  def change
    add_column :shots, :hometeam, :string
    add_column :shots, :awayteam, :string
  end
end
