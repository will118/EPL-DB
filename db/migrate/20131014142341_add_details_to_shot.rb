class AddDetailsToShot < ActiveRecord::Migration
  def change
    add_column :shots, :team, :text
  end
end
