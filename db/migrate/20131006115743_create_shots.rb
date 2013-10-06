class CreateShots < ActiveRecord::Migration
  def change
    create_table :shots do |t|
      t.integer :homeshots
      t.integer :awayshots

      t.timestamps
    end
  end
end
