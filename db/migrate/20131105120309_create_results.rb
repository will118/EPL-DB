class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
    	t.datetime :date
    	t.string :team
      t.string :home
      t.string :away
      t.string :fulltime
      t.text :incidents

      t.timestamps
      t.timestamps
    end
  end
end
