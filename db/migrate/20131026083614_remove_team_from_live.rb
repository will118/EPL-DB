class RemoveTeamFromLive < ActiveRecord::Migration
  def change
  	remove_column :posses, :team, :text
  	remove_column :fouls, :team, :text
  	remove_column :shots, :team, :text
  	remove_column :targets, :team, :text
  	remove_column :corners, :team, :text
  end
end
