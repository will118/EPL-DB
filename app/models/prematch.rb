class Prematch < ActiveRecord::Base
  validates :text, presence: true, uniqueness: true

  def self.last_10_of(team)
    where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).last(10)
  end

end
