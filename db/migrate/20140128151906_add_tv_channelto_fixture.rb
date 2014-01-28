class AddTvChanneltoFixture < ActiveRecord::Migration
  def change
     add_column :fixtures, :channel, :string
  end
end
