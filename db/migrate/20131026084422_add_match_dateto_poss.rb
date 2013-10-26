class AddMatchDatetoPoss < ActiveRecord::Migration
  def change
  	add_column :posses, :matchdate, :datetime
  	add_column :fouls, :matchdate, :datetime
  	add_column :shots, :matchdate, :datetime
  	add_column :targets, :matchdate, :datetime
  	add_column :corners, :matchdate, :datetime
  end
end
