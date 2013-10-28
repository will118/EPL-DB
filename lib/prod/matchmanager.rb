class MatchManager
  
  def self.match_manager
    Fixture.next_8.each do |fixture|
      match_timer = MatchTime.new(fixture.kickoff)
      if match_timer.halftime? && fixture.got_json?
        puts "Half Time"
      elsif match_timer.pre_match? && fixture.missing_link?
        BBCGetter.new.get(fixture)
      elsif match_timer.match_over?
        fixture.delete
      elsif match_timer.match_on? && fixture.missing_team?
        Form.form_get
      elsif match_timer.live_match? && fixture.missing_json?
        BBCRecorder.scores
        recorder = BBCRecorder.new(fixture)
        recorder.teams_and_stats
        puts "Recording"
        if match_timer.live_match? && fixture.out_of_date_teams?
          recorder.teams
        else puts "Teams still fresh"
        end
      elsif match_timer.match_soon? && fixture.no_team?
        recorder.teams
        puts "Getting Teams"
      else
        puts "Still a while to go"
      end
    end
  end

end