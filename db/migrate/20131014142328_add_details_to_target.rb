class AddDetailsToTarget < ActiveRecord::Migration
  def change
    add_column :targets, :team, :text
  end
end
