class AddDetailToFixtures < ActiveRecord::Migration
  def change
    add_column :fixtures, :gotteam, :boolean
  end
end
