class AddMoreDetailsToFoul < ActiveRecord::Migration
  def change
    add_column :fouls, :hometeam, :string
    add_column :fouls, :awayteam, :string
  end
end
