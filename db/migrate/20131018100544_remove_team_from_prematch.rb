class RemoveTeamFromPrematch < ActiveRecord::Migration
  def change
  	remove_column :prematches, :team, :string
  end
end
