class CreateCaches < ActiveRecord::Migration
  def change
    create_table :caches do |t|
      t.text :json, json: true
      t.string :kind_of

      t.timestamps
    end
  end
end
