class AddDetailsToCorner < ActiveRecord::Migration
  def change
    add_column :corners, :team, :text
  end
end
