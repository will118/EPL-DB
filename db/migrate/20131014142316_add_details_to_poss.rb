class AddDetailsToPoss < ActiveRecord::Migration
  def change
    add_column :posses, :team, :text
  end
end
