class AddMoreDetailsToTarget < ActiveRecord::Migration
  def change
    add_column :targets, :hometeam, :string
    add_column :targets, :awayteam, :string
  end
end
