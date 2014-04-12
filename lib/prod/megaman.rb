class Megaman
  def load_all_for_teams(home_team, away_team, time)
    [Shot.where("hometeam = ? AND awayteam = ? AND created_at > ?", home_team, away_team, time).first,
    Target.where("hometeam = ? AND awayteam = ? AND created_at > ?", home_team, away_team, time).first,
    Foul.where("hometeam = ? AND awayteam = ? AND created_at > ?", home_team, away_team, time).first,
    Corner.where("hometeam = ? AND awayteam = ? AND created_at > ?", home_team, away_team, time).first,
    Poss.where("hometeam = ? AND awayteam = ? AND created_at > ?", home_team, away_team, time).first]
  end

  def runner
    scores = ApiScore.all
    scores.each do |score|
      next if score.status == "Postponed"
      starter = Shot.where(hometeam: score.home, awayteam: score.away).first
      next if starter.nil?
      time = starter.matchdate + 55.minutes
      shots, targets, fouls, corners, poss = load_all_for_teams(score.home, score.away, time)
      mega = Megamodel.where(home: score.home, away: score.away).first_or_create
      mega.home_ht_score, mega.away_ht_score = score.halftime
      mega.home_ft_score, mega.away_ft_score = score.fulltime
      mega.home_shots, mega.away_shots = shots.homeshots, shots.awayshots
      mega.home_targets, mega.away_targets = targets.homeshots, targets.awayshots
      mega.home_corners, mega.away_corners = corners.home, corners.away
      mega.home_fouls, mega.away_fouls = fouls.home, corners.away
      mega.home_possession, mega.away_possession = poss.homeposs, poss.awayposs
      mega.save
    end
  end
end
