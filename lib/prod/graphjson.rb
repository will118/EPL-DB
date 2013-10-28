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
        {"key" => "Possession", "values" => x_axis_maker(avg_poss)},
        {"key" => "Shot Accuracy", "values" => x_axis_maker(shot_acc)},
        {"key" => "Pass Accuracy", "values" => x_axis_maker(pass_acc)},
        {"key" => "Attack Score", "values" => x_axis_maker(att_score)},
        {"key" => "Defence Score", "values" => x_axis_maker(def_score)},
        {"key" => "Possession Score", "values" => x_axis_maker(poss_score)},
        {"key" => "Opta Score", "values" => x_axis_maker(opta_score)}
      ]
    end
  end

  def x_axis_maker(input_array)
    array = []
    (input_array.length).times do |i|
      array << [ i+1, input_array[i]]
    end
    array
  end

  def possession(team)
    unless valid_team?(team.titleize) == true
      poss_arr = []
      Poss.involving(team).each do |x|
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
    unless valid_team?(team.titleize) == true
      home = []
      away = []
      date = Target.most_recent_1(team).matchdate

      Target.most_recent_data(date,team).each do |x|
        home << x.homeshots
        away << x.awayshots
        @hometeam = x.hometeam
        @awayteam = x.awayteam
      end
      d3_data_builder(home, away)
    end
  end

  def corners(team)
    unless valid_team?(team.titleize) == true
      home = []
      away = []
      date = Corner.most_recent_1(team).matchdate

      Corner.most_recent_data(date,team).each do |x|
        home << x.home
        away << x.away
        @hometeam = x.hometeam
        @awayteam = x.awayteam
      end
      d3_data_builder(home, away)
    end
  end

  def fouls(team)
    unless valid_team?(team.titleize) == true
      home = []
      away = []
      date = Foul.most_recent_1(team).matchdate

      Foul.most_recent_data(date,team).each do |x|
        home << x.home
        away << x.away
        @hometeam = x.hometeam
        @awayteam = x.awayteam
      end
      d3_data_builder(home, away)
    end
  end

  def shots(team)
    unless valid_team?(team.titleize) == true
      home = []
      away = []
      date = Shot.most_recent_1(team).matchdate

      Shot.most_recent_data(date,team).each do |x|
        home << x.homeshots
        away << x.awayshots
        @hometeam = x.hometeam
        @awayteam = x.awayteam
      end
      d3_data_builder(home, away)
    end
  end

  def d3_data_builder(home, away)
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