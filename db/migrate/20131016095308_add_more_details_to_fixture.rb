class AddMoreDetailsToFixture < ActiveRecord::Migration
  def change
    add_column :fixtures, :rawlink, :string
    add_column :fixtures, :jsonurl, :string
    add_column :fixtures, :lineup_url, :string
  end
end
