class CreateFouls < ActiveRecord::Migration
  def change
    create_table :fouls do |t|
      t.integer :home
      t.integer :away

      t.timestamps
    end
  end
end
