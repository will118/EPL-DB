class AddLivetoApiScore < ActiveRecord::Migration
  def change
  	add_column :api_scores, :live, :boolean
  end
end
