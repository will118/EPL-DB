class RemoveCompetitionFromFixtures < ActiveRecord::Migration
  def change
    remove_column :fixtures, :competition, :string
  end
end
