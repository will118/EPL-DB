class RemoveSubbedFromTeam < ActiveRecord::Migration
  def change
  	remove_column :teams, :subbed, :text
  	remove_column :teams, :number, :integer
  end
end
