class CreateAwayBenches < ActiveRecord::Migration
  def change
    create_table :away_benches do |t|
      t.string :name
      t.integer :number

      t.timestamps
    end
  end
end
