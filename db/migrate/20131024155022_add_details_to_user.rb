class AddDetailsToUser < ActiveRecord::Migration
  def change
    add_column :users, :settings, :string
  end
end
