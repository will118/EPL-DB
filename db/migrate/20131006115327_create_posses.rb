class CreatePosses < ActiveRecord::Migration
  def change
    create_table :posses do |t|
      t.integer :homeposs
      t.integer :awayposs

      t.timestamps
    end
  end
end
