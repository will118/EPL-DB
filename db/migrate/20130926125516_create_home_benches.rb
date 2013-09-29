class CreateHomeBenches < ActiveRecord::Migration
  def change
    create_table :home_benches do |t|
      t.string :name
      t.integer :number

      t.timestamps
    end
  end
end
