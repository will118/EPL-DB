class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.text :team
      t.text :form

      t.timestamps
    end
  end
end
