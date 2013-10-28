class DataController < ApplicationController

  def hometeam
    render :json => Teams.home_team(params[:team])
  end

  def awayteam
    render :json => Teams.away_team(params[:team])
  end

  def homesubs
    render :json => Teams.home_subs(params[:team])
  end

  def awaysubs
    render :json => Teams.away_subs(params[:team])
  end

  def topscorers
    render :json => RemoteAPI.new.top_scorers(params[:team])
  end

  def livepossbar
    render :json => LiveBars.possession(params[:team])
  end

  def liveshotsbar
    render :json => LiveBars.shots(params[:team])
  end

  def formjson
    render :json => Form.of(params[:team])
  end

  def otherformjson
    render :json => Form.of_other(params[:team])
  end

  def prematchjson
    render :json => Prematch.last_10_of(params[:team])
  end

  def scores
    render :json => Score.live
  end

  def fixturesjson
    render :json => Fixture.by_team(params[:team])
  end

  def nextfixtures
    render :json => RemoteAPI.next_5_fixtures(params[:type])
  end

  def tablejson
    render :json => RemoteAPI.table
  end

  def megajson
    render :json => GraphJSON.new.main(params[:team])
  end

  def livepossjson
    render :json => GraphJSON.new.poss(params[:team])
  end

  def livetargetjson
    render :json => GraphJSON.new.targets(params[:team])
  end

  def liveshotjson
    render :json => GraphJSON.new.shots(params[:team])
  end

  def livecornerjson
    render :json => GraphJSON.new.corners(params[:team])
  end

  def livefouljson
    render :json => GraphJSON.new.fouls(params[:team])
  end

end