class DataController < ApplicationController

  def index
    "angular"
  end

## Teams ##
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

## Live Bars ##
  def livepossbar
    render :json => LiveBars.possession(params[:team])
  end

  def liveshotsbar
    render :json => LiveBars.shots(params[:team])
  end

## Form ##
  def formjson
    render :json => Form.of(params[:team])
  end

  def otherformjson
    render :json => Form.of_other(params[:team])
  end

## Prematch ##
  def prematchjson
    render :json => Prematch.last_10_of(params[:team])
  end

## Scores ##
  def scores
    render :json => ApiScore.results(8)
  end
  def livescores
    render :json => ApiScore.live(8)
  end
  def dashscores
    render :json => ApiScore.results(10)
  end

## Fixtures ##
  def fixturesjson
    render :json => Fixture.by_team(params[:team])
  end

## Remote API ##
  def tablejson
    render :json => ApiScore.league_table
  end

  def topscorers
    render :json => ApiScore.top_scorers(params[:team])
  end

  def nextfixtures
    render :json => ApiScore.next_10_fixtures
  end

  def nextfixtures_countdown
    render :json => ApiScore.fixtures_countdown
  end

  def pastresults
    # render :json => ApiScore.past_results(params[:team])
    render :json => {"api-closed" => true}
  end

## Graph JSONs ##
  def megajson
    render :json => GraphJSON.new.main(params[:team])
  end

  def diffjson
    render :json => GraphJSON.new.diff(params[:teams])
  end

  def livepossjson
    render :json => GraphJSON.new.possession(params[:team])
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
