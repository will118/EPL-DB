class CreatePrematches < ActiveRecord::Migration
  def change
    create_table :prematches do |t|
      t.text :text

      t.timestamps
    end
  end
end
