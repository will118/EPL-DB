class FixturesController < ApplicationController

  def megajson
    render :json => JasonTheBuilder.new.jason(params[:team])
  end

  def topscorers
    render :json => JasonTheBuilder.new.top_scorers_json(params[:team])
  end

  def livepossbar
    render :json => JasonTheBuilder.new.poss_bar_json(params[:team])
  end

  def formjson
    render :json => Form.where("team" =>(params[:team]).titleize)
  end

  def otherformjson
    render :json => JasonTheBuilder.otherformjson(params[:team])
  end

  def prematchjson
    render :json => JasonTheBuilder.prematchjson(params[:team])
  end

  def scores
    render :json => JasonTheBuilder.scores
  end

  def fixturesjson
    render :json => JasonTheBuilder.new.fixture(params[:team])
  end

  def hometeam
    render :json => JasonTheBuilder.new.home_team(params[:team])
  end

  def awayteam
    render :json => JasonTheBuilder.new.away_team(params[:team])
  end

  def homesubs
    render :json => JasonTheBuilder.new.home_subs(params[:team])
  end

  def awaysubs
    render :json => JasonTheBuilder.new.away_subs(params[:team])
  end

  def tablejson
    render :json => JasonTheBuilder.new.table_json
  end

  def livepossjson
    render :json => JasonTheBuilder.new.poss(params[:team])
  end

  def livetargetjson
    render :json => JasonTheBuilder.new.targets(params[:team])
  end

  def liveshotjson
    render :json => JasonTheBuilder.new.shots(params[:team])
  end

  def livecornerjson
    render :json => JasonTheBuilder.new.corners(params[:team])
  end

  def livefouljson
    render :json => JasonTheBuilder.new.fouls(params[:team])
  end

end