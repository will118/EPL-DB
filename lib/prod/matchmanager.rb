class MatchManager
  
  def self.run
    Fixture.next_8.each do |fixture|
      match_timer = MatchTime.new(fixture.kickoff)
      rec = TeamFactory.new(fixture)
      if match_timer.halftime? && fixture.got_json?
        puts "Half Time"
      elsif match_timer.pre_match? && fixture.missing_link?
        BBCGetter.new.get(fixture)
      elsif match_timer.match_over?
        fixture.delete
      elsif match_timer.live_match? && fixture.have_json_link?
        rec.recorder
        RemoteAPI.api_save
        if match_timer.live_match? && fixture.out_of_date_teams?
          rec.teams
          fixture.update_timestamp
        else puts "Teams still fresh"
        end
      elsif match_timer.match_soon? && fixture.no_team?
        rec.teams
      elsif match_timer.match_on_soon_or_just_ended?
        Form.form_get
      else
        puts "Still a while to go"
      end
    end
  end

end