require_relative 'namenormaliser'

class GraphJSON
  include NameNormaliser

  def valid_team?(team)
    Fixture.exists?(:hometeam => team)
  end

  def main(team)
    unless valid_team?(team) == true
      avg_poss = Supermodel.of_possession_where(team)
      shot_acc = Supermodel.of_shots_where(team)
      pass_acc = Supermodel.of_passes_where(team)
      att_score = Supermodel.of_attackscore_where(team)
      def_score = Supermodel.of_defencescore_where(team)
      poss_score = Supermodel.of_possessionscore_where(team)
      opta_score = Supermodel.of_optascore_where(team)

      [
        {"key" => "Possession", "values" => ray(avg_poss)}, 
        {"key" => "Shot Accuracy", "values" => ray(shot_acc)}, 
        {"key" => "Pass Accuracy", "values" => ray(pass_acc)}, 
        {"key" => "Attack Score", "values" => ray(att_score)}, 
        {"key" => "Defence Score", "values" => ray(def_score)}, 
        {"key" => "Possession Score", "values" => ray(poss_score)}, 
        {"key" => "Opta Score", "values" => ray(opta_score)}
      ]
    end
  end

  def ray(input_array)
    array = []
    (input_array.length).times do |i|
      array << [ i+1, input_array[i]]
    end
    array
  end

  def poss(team)
    normalized_team = team.titleize
    unless valid_team?(normalized_team) == true
      poss_arr = []
      Poss.where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).each do |x|
        if x.hometeam = team
          poss_arr << x.homeposs
        else
          poss_arr << x.awayposs
        end
      end

      live = poss_arr.drop_while {|i| i == 100 }
      x_axis_array = * 1..(live.length)

      array = [x_axis_array, live].transpose.map do |x, y|
        [ x, y ]
      end
      return [{"key" => "Possession", "values" => array}]
    end
  end

  def targets(team)
    normalized_team = team.titleize
    unless valid_team?(normalized_team) == true
      home = []
      away = []
      most_recent = Target.where(["awayteam = ? or hometeam = ?", normalized_team, normalized_team]).order(:matchdate).first.matchdate

      Target.where(["awayteam = ? and matchdate = ? or hometeam = ? and matchdate = ?", normalized_team, most_recent, normalized_team, most_recent]).each do |x|
        home << x.homeshots
        away << x.awayshots
        @hometeam = x.hometeam
        @awayteam = x.awayteam
      end
      nv_builder(home, away)
    end
  end

  def corners(team)
    normalized_team = team.titleize
    unless valid_team?(normalized_team) == true
      home = []
      away = []
      most_recent = Corner.where(["awayteam = ? or hometeam = ?", normalized_team, normalized_team]).order(:matchdate).first.matchdate

      Corner.where(["awayteam = ? and matchdate = ? or hometeam = ? and matchdate = ?", normalized_team, most_recent, normalized_team, most_recent]).each do |x|
        home << x.home
        away << x.away
        @hometeam = x.hometeam
        @awayteam = x.awayteam
      end
      nv_builder(home, away)
    end
  end

  def fouls(team)
    normalized_team = team.titleize
    unless valid_team?(normalized_team) == true
      home = []
      away = []

      most_recent = Foul.where(["awayteam = ? or hometeam = ?", normalized_team, normalized_team]).order(:matchdate).first.matchdate

      Foul.where(["awayteam = ? and matchdate = ? or hometeam = ? and matchdate = ?", normalized_team, most_recent, normalized_team, most_recent]).each do |x|
        home << x.home
        away << x.away
        @hometeam = x.hometeam
        @awayteam = x.awayteam
      end
      nv_builder(home, away)
    end
  end

  def shots(team)
    normalized_team = team.titleize
    unless valid_team?(normalized_team) == true
      home = []
      away = []
      most_recent = Shot.where(["awayteam = ? or hometeam = ?", normalized_team, normalized_team]).order(:matchdate).first.matchdate

      Shot.where(["awayteam = ? and matchdate = ? or hometeam = ? and matchdate = ?", normalized_team, most_recent, normalized_team, most_recent]).each do |x|
        home << x.homeshots
        away << x.awayshots
        @hometeam = x.hometeam
        @awayteam = x.awayteam
      end
      nv_builder(home, away)
    end
  end

  def nv_builder(home, away)
    x_axis_array = * 1..(away.length)

    home_array = [x_axis_array, home].transpose.map do |x_axis_array, home|
      [x_axis_array, home]
    end

    away_array = [x_axis_array, away].transpose.map do |x_axis_array, away|
      [x_axis_array, away]
    end

    return [{"key"=>@hometeam, "values"=> home_array}, {"key"=>@awayteam, "values"=> away_array}]
  end

end