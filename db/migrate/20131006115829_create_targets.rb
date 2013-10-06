class CreateTargets < ActiveRecord::Migration
  def change
    create_table :targets do |t|
      t.integer :homeshots
      t.integer :awayshots

      t.timestamps
    end
  end
end
