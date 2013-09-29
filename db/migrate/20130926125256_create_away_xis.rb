class CreateAwayXis < ActiveRecord::Migration
  def change
    create_table :away_xis do |t|
      t.string :name
      t.integer :number
      t.string :subbed

      t.timestamps
    end
  end
end
