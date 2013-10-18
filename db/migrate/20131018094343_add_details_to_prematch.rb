class AddDetailsToPrematch < ActiveRecord::Migration
  def change
    add_column :prematches, :team, :string
  end
end
