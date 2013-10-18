class AddMoreDetailsToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :starting, :boolean
  end
end
