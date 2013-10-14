class AddDetailsToFoul < ActiveRecord::Migration
  def change
    add_column :fouls, :team, :text
  end
end
